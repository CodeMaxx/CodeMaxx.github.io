---
title: "Can the kernel lie? The Windows Runtime Attestation Report"
layout: post
date: 2026-09-07 07:00
image:
  path: /assets/images/attestation/hero-attestation.svg
  alt: "Title card for the series Ask the Kernel, reading 'A hacked kernel can lie. It can't forge this report.', with a badge noting the report is signed by the Secure Kernel in VTL1."
social_image:
  path: /assets/images/attestation/hero-attestation.png
  width: 2400
  height: 1260
tags:
- Security
- Windows
- VBS
- Anti-Cheat
- Attestation
blog: true
description: "How the Windows Runtime Attestation Report gives a remote server signed evidence about kernel state, even when the normal kernel may be compromised."
---

A hacked computer will happily lie to you about being hacked.

Take anti-cheat. Its driver runs in the Windows kernel and watches for things a
cheat has changed. But if the cheat gets into the kernel too, the anti-cheat is
now asking the part of Windows the attacker already owns.

Ask the system "has anything been messed with?", and the answer comes back from
code the cheat already controls: "nope, all clean." Of course it does.

Windows has an answer for this now, and it's one of my favourite things we've
shipped. It's the Windows Runtime Attestation Report. You ask for it through
one Windows API,
[`GetRuntimeAttestationReport`](https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getruntimeattestationreport){: target="_blank" rel="noopener" },
and you get back a package of facts about the machine. A part of Windows the
normal kernel can't touch signs it. Even a fully compromised kernel can't fake
that signature.

> For context: I'm an engineer on the Windows Secure Kernel team, and the Runtime
> Attestation Report is a feature I built. So this is the view from the inside,
> not a reverse-engineering guess.
{: .prompt-info }

![On the left, a hacked normal kernel answers 'all clean' with a red warning. On the right, the Secure Kernel hands back a signed report the hacked kernel cannot forge.](/assets/images/attestation/kernel-lies.svg){: .shadow }
_The report still crosses VTL0 on its way out. Verification happens after it
reaches your server._

Games are just the easiest place to picture it. The same problem shows up
anywhere a service has to trust a machine it can't see. I'll come back to those
other uses later.

## So who are you even proving this to?

Look at what actually failed up there. The thing you were inspecting was also the
thing answering your questions, and once that's true, its answers are worth
nothing.

The decision has to happen somewhere the machine can't reach. In practice that's
a server you control. The gamer's PC (or the employee's laptop, or whatever)
gathers some facts about itself and sends them to your server. Your server
decides whether to trust it.

For that to work, the machine can't rewrite the answer on its way out. A hacked
machine still isn't trustworthy. It just can't alter the package after the
Secure Kernel has produced it.

This is remote attestation: a machine proving facts about itself to someone who
doesn't trust it. This series is about where Windows gets those facts from.

You might already know remote attestation through the TPM, best known here for
recording what your machine loaded on the way up so a server can check the boot
chain afterwards. That answers a different question. Measured boot tells you how
the machine started. It doesn't tell you that a driver loaded twenty minutes ago,
or that a patch landed since. This report is about what's there at the moment you
ask, which is where the "runtime" in the name comes from. That's a difference in
what the evidence describes, not a knock on the TPM.

## An answer the normal kernel can't forge

The answer cannot come from the normal kernel, because that's the part that
might be hacked in the first place.

On a lot of Windows 11 machines
[Virtualization Based Security](https://learn.microsoft.com/windows-hardware/design/device-experiences/oem-vbs){: target="_blank" rel="noopener" },
or VBS, is already switched on. With it enabled, Windows runs two kernels
instead of one. There's the normal kernel you know, the one your drivers and the
cheat's driver both live in. The hypervisor enforces a wall around it. Behind
that wall sits a second kernel, much smaller and much more trusted: the Secure
Kernel.

The normal world is VTL0. The secure world, where the Secure Kernel lives, is
VTL1. What matters here is the boundary between them. Even if a rootkit
completely owns the normal kernel, it still can't get into VTL1. It can't read
VTL1's memory or run its own code in there. The hypervisor won't let it, and the
CPU's virtualization hardware is what makes that stick. What VTL0 can do is ask,
through a fixed set of calls VTL1 chooses to answer. That's how your app gets a
report at all.

The Secure Kernel holds a private signing key that VTL0 never gets to see. When
it produces a package, it signs it with that key, and your server checks the
signature against the matching public key.

Your server has to trust that public key before the package arrives. If it just
accepts whatever key turns up alongside the package, a compromised machine can
generate its own key pair, sign whatever it likes, and send you the matching
public key. The check passes and proves nothing. The verification post will
cover how to establish that trust.

That trust has a root, and it's the TPM. The Secure Kernel's public signing key
ends up in the TPM-signed boot logs, so you can tie the key you're checking
against back to that specific machine's hardware. The TPM does have a job here,
then. It anchors the key, rather than telling you what's running right now.

Think of everything in VTL0, your app included, as a courier carrying a signed
document. The courier may read or drop it. It might also bring you yesterday's
copy, but it can't rewrite the signed contents. The report is protected from
forgery, not from being read.

![The VBS trust boundary: VTL0 carries a signed package across the boundary but cannot alter it; the Secure Kernel in VTL1 holds the signing key VTL0 never sees.](/assets/images/attestation/trust-boundary.svg){: .shadow }
_VTL0 asks and VTL1 answers, which is also how your server's challenge gets
across._

A verified package tells you the Secure Kernel produced it. It doesn't tell you
where the Secure Kernel got each fact. A notary's stamp works the same way. It
proves the document was signed in front of the notary. It says nothing about
whether what's written inside is true.

Some of what's in the report VTL1 measured itself. Some of it VTL0 handed over
and VTL1 wrote down. Both end up under the same signature. Your server needs to
know where each field came from before it uses it. The
[hotpatch post](/secure-hotpatch-report/) walks through exactly where that line
falls for one of the reports, and it isn't where most people guess.

## One package, several reports

The package works like an envelope with a few separate documents inside.

Each document is a report of a specific kind. The driver report lists kernel
drivers loaded right now, with enough identity on each one to tell the real
`nvlddmkm.sys` from something just wearing its name. The hotpatch report says
which kernel-mode images have a live Microsoft patch on them, and how far down
the patch chain the machine is. The Windows SDK also defines a Code Integrity
report type. This series and the sample focus on the Driver and Hotpatch
reports. More kinds can be added later, and when they are, the way you ask stays
the same.

When you make the call, you say which kinds you want. The Secure Kernel builds
each one by that report's own rules and puts them in one package. The package
ties the challenge and every included report back to the same signature.

![A signed outer envelope containing a fresh challenge and the Driver, Hotpatch, and Code Integrity report types defined by the Windows SDK. This series focuses on Driver and Hotpatch.](/assets/images/attestation/one-package.svg){: .shadow }
_The report types you requested are recorded inside the signed part. Your server
can tell if one is missing._

Once the package has been verified, you know the Secure Kernel produced it. You
do not know that the machine is clean. The reports answer specific questions:
which drivers are loaded and what's patched. They stop there.

## What actually happens when you ask

The request works like this. The code comes in the next post.

1. Your server picks a fresh random number and sends it to the machine as a
   challenge. (More on why in a second.)
2. Your app on the machine calls `GetRuntimeAttestationReport`, saying which
   reports it wants and handing over that challenge.
3. Down in the Secure Kernel, Windows builds each requested report by that
   report's own rules and puts them in one package.
4. The Secure Kernel signs the package with your challenge inside it, and hands
   it back to your app.
5. Your app ships the signed package off to your server.
6. Your server verifies the package, using a public key it already trusts, and
   checks that the challenge inside is the exact one it just sent.
7. If both hold, your server reads the facts and decides what to do, usually by
   comparing against a known-good baseline or a policy you set.

![A numbered round trip: the server sends a fresh challenge, the app calls the API, the Secure Kernel produces a signed package, the app returns it, and the server verifies the package with a trusted key before applying policy.](/assets/images/attestation/attestation-roundtrip.svg){: .shadow }
_Steps 1, 6 and 7 are yours to get right. Your app in the middle is just a
courier, and it never has to be trusted._

Now, step 1, the challenge. Its proper name is a nonce, and it's there to stop an
old report being replayed. Without it, an attacker could capture one good report
from a healthy machine and keep re-sending that same signed package forever, long
after the machine went bad. Because your server picks a fresh, unpredictable
value every time and insists on seeing that exact value back inside the signed
package, a stale copy doesn't match. If your server doesn't generate it, or
doesn't check it on the way back, it buys you nothing at all.

## Now give the attacker the kernel

Now assume the attacker owns the whole normal kernel. The hypervisor and the
Secure Kernel still hold. Under that threat model, these are the moves left.

They can **tamper** with the package. Open the envelope, flip a bit, take out the
driver they'd rather you didn't see. But every report is tied back to the signed
package, so the moment they change anything, verification fails. Your server
throws the package out. Tampering fails.

They can **replay** an old package. Grab one your server accepted earlier, or one
from another machine, and send that instead. But your server put a fresh
challenge in this request, and that old package has a different one baked in. It
doesn't match, so your server rejects it. Replay fails.

They can **ask for less**. Your policy needs the driver report, so the
compromised app quietly requests only the hotpatch report and sends back a
package that is perfectly valid and conveniently incomplete. The list of report
types is inside the signed part of the package, so the machine can't lie about
what's in there. If your server checks that list against what your policy
requires and rejects anything short, this move fails too.

They can **suppress** the package. They can block the call or drop the package
before it reaches your server. The machine can also show up with VBS disabled,
so there's no report to send in the first place. Either way, they can stop you
from getting an answer. What they can't do is turn silence into a pass, unless
you let them. You see no valid package, and what happens next is your policy's
call.

They still cannot build their own package after the fact and give it a valid
VTL1 signature. That signature comes from a key inside VTL1 they never get to
touch.

![An attacker in control of VTL0 tries to tamper with, replay, trim, and suppress the package; verification catches the first three, suppression leaves you with no answer, and forging a new signature is impossible without the VTL1 key.](/assets/images/attestation/attacker-moves.svg){: .shadow }
_Verification catches tampering and replay, and it tells your server when a
required report is missing. A missing package is a separate policy case._

Owning the machine also gives the attacker control over timing. Nothing stops
them unloading the cheat, asking for a report while their driver is gone, and
putting the cheat back. They control when it reaches you as well, so a report can
arrive late. The report only captures the moment it was produced. If you ask
often, at moments they can't predict, the gap gets small. It doesn't close.

The attacker can also use a second, clean machine. The hacked one can quietly
forward your challenge to it, let it produce a genuine signed package, and hand
that back to your server as though it came from the hacked one. The nonce
doesn't catch this. The signature is real and the challenge is real, they just
came from the wrong machine. Catching it means tying a report to the specific
machine it came from, which is a separate problem from this API, and one every
remote attestation scheme has to deal with. I'll cover what you've got to work
with in the verification post.

## What you can build with this

None of this is really about games. Anti-cheat is just the noisiest place this
shows up first. Strip the games out of it and the shape is the same everywhere:

- **Anti-cheat** asks: which drivers are loaded, and is this code change a real
  patch or a cheat? Riot's Vanguard uses the driver report for its new
  [on-demand mode](https://www.riotgames.com/en/news/vanguard-on-demand){: target="_blank" rel="noopener" }.
- **Anti-malware and EDR** ask the same shape of question: is there a driver down
  there nobody expected, and when kernel code has changed, is there a real patch
  that explains it?
- **Enterprise access** asks: before this laptop touches company data, is it
  actually in the state our policy requires?
- **Content protection** asks: is this device healthy enough to be handed
  something valuable?

The report doesn't answer any of these questions on its own. What it gives you is
an answer VTL0 can't quietly rewrite after the Secure Kernel produces it. Your
policy still has to know where each fact came from, and your decision goes on top
of that.

## The rest of the series

1. **This post.** Why a compromised kernel can't vouch for itself, and what a
   signed report does and doesn't prove.
2. **The package and the API.** What actually comes back from the call, field by
   field, and how to pull the reports out in code.
3. **[The Secure Hotpatch Report](/secure-hotpatch-report/).** Telling a real
   Microsoft hotpatch apart from kernel tampering.
4. **The driver report.** Which drivers are loaded, with the identity you need
   to tell a real one from an impostor.
5. **Verifying the signature.** How the package is signed and how you check it
   yourself, so none of this rests on taking my word for it.

If you'd rather skip ahead and run something, the public sample retrieves,
parses, and prints the Driver and Hotpatch reports on x64 and ARM64. It
statically links the C runtime, so the executable doesn't need the Visual C++
Redistributable.

The sample stops after parsing and printing. It does not verify the package
signature or the report digests, so it is a starting point for the client side,
not a complete remote-attestation verifier.

To produce a Driver report, you need Windows 11 25H2 or later with VBS and HVCI
enabled. The Hotpatch report needs Insider build 29591.1000 or later with VBS
enabled; HVCI is not required. The README spells all of that out:
[github.com/CodeMaxx/windows-runtime-attestation-report](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" }.

Thanks for reading! If any of this is unclear, or you think I've got something
wrong, tell me in the comments, I'd genuinely like to know. :)

> Just want the API reference? The Learn page for
> [`GetRuntimeAttestationReport`](https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getruntimeattestationreport){: target="_blank" rel="noopener" }
> has the function parameters and the package layout.
{: .prompt-tip }
