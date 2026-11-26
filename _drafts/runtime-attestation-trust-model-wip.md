---
title: "Part 2 working draft: why you can believe a Runtime Attestation Report"
layout: post
tags:
- Security
- Windows
- VBS
- Attestation
blog: true
description: "Working draft. Two kernels, the signing key, and the round trip behind the Windows Runtime Attestation Report."
---

> Raw material moved out of Part 1 on 2026-11-25 when the series became six posts. Not yet shaped into a post.
{: .prompt-warning }

## An answer the kernel can't forge

The answer cannot come from the normal kernel, since that is the part that might be compromised. It has to come from somewhere the attacker cannot follow.

On a lot of Windows 11 machines, [Virtualization Based Security](https://learn.microsoft.com/windows-hardware/design/device-experiences/oem-vbs){: target="_blank" rel="noopener" } is already enabled. With VBS, Windows runs two kernels instead of one. The normal kernel---the one that drivers, security software and kernel-mode malware all run in---is isolated by the hypervisor. On the other side of that boundary is a second kernel, much smaller and more trusted: the Secure Kernel.

The normal world is called VTL0 and the secure world, where the Secure Kernel runs, is VTL1. Even an attacker with full control of VTL0 cannot read VTL1 memory or run code there, because the hypervisor and the CPU's virtualization hardware enforce the boundary. That is the assumption behind everything in this post: the attacker may control the normal kernel, but the hypervisor and the Secure Kernel are intact.

VTL0 is not cut off entirely, or there would be no API to call. It can make requests through a fixed set of calls that VTL1 chooses to answer.

The Secure Kernel holds a private signing key that VTL0 never sees. It signs every package with that key, and your server checks the signature against the matching public key.

There's a detail here that's easy to get wrong. Your server has to trust that public key *before* the package arrives. If it accepts whatever key is sent along with the package, a compromised machine can generate its own key pair, sign anything it likes and send the matching public key, and the check will pass while proving nothing. That trust is rooted in the TPM. During boot, Windows measures a number of things into the TPM, and the Secure Kernel's public signing key is one of them. Your server replays that log of measurements, checks the result against values the TPM itself has signed, and only then accepts that the key came from a machine that booted the way it claims. So the TPM does have a role here: it anchors the key, while the report describes what is running now. My colleague Andrea Allievi has written about [how the TPM side of this works](https://www.andrea-allievi.com/blog/new-year-post-anti-cheat-evolution-in-windows-11/){: target="_blank" rel="noopener" }, and I'll cover the verification steps later in this series.

![The VBS trust boundary: VTL0 carries a signed package across the boundary but cannot alter it; the Secure Kernel in VTL1 holds the signing key VTL0 never sees.](/assets/images/attestation/trust-boundary.svg){: .shadow }
_VTL0 asks and VTL1 answers, which is also how your server's challenge gets across._

Everything in VTL0, including the application that requests the report, acts as an untrusted courier carrying a sealed envelope. It can read the contents or fail to deliver them, but any change to the contents breaks the seal.

One more point matters for anyone writing policy. A verified package proves that the Secure Kernel produced it. It does not say where the Secure Kernel got each fact. A notary's stamp works the same way: it proves the document was signed in front of the notary and says nothing about whether the contents are true. Some fields in a report are measured by VTL1 itself, while others are supplied by VTL0 and recorded as given. Both are covered by the same signature, so a policy needs to know which is which. The [hotpatch post](/secure-hotpatch-report/) shows exactly where that line falls for one report type.

## How the round trip works

The code is in the next post, but it helps to know the shape of the exchange first.

1. Your server picks a fresh random number and sends it to the machine as a challenge.
2. Your app calls `GetRuntimeAttestationReport`, saying which reports it wants and passing along that challenge.
3. The Secure Kernel builds each requested report and puts them in one package.
4. It signs the package, with your challenge inside it, and hands it back to your app.
5. Your app sends the signed package to your server.
6. Your server verifies it using a public key it already trusts, then checks that the challenge inside is the exact one it just sent.
7. If both hold, your server checks that every report its policy needs is in the package, then reads the facts and applies that policy.

![A numbered round trip: the server sends a fresh challenge, the app calls the API, the Secure Kernel produces a signed package, the app returns it, and the server verifies the package with a trusted key before applying policy.](/assets/images/attestation/attestation-roundtrip.svg){: .shadow }
_Steps 1, 6 and 7 are your server's responsibility. The app in the middle is only a courier and never has to be trusted._

The challenge in step 1 is a nonce, and it prevents replay. Without it, an attacker could capture one valid package from a healthy machine and resend it indefinitely, long after the machine was compromised. Because your server picks an unpredictable value each time and requires the same value inside the signed package, an old package no longer matches. A server that doesn't generate the nonce, or doesn't check it on return, gains nothing from it.