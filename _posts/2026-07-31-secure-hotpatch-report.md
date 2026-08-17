---
title: "Patch or attack? Inside the Windows Secure Hotpatch Report"
layout: post
date: 2026-07-31 08:00
image:
  path: /assets/images/hotpatch/hero-hotpatch.svg
  alt: "The Windows Secure Hotpatch Report: a modified region in ntoskrnl.exe branching to 'a cheat?' or 'a Microsoft hotpatch?', answered by a signed report."
social_image:
  path: /assets/images/hotpatch/hero-hotpatch.png
  width: 2048
  height: 1075
tags:
- Security
- Windows
- VBS
- Anti-Cheat
- Hotpatching
blog: true
description: "How the Windows Secure Hotpatch Report uses VTL1 attestation to help anti-cheat and security tools tell legitimate hotpatches from kernel tampering."
---

Windows can patch its own kernel while it's running now. Not just the kernel, its
drivers too. No reboot, no restart, the fix just goes live on a machine that's in
the middle of doing something. It's genuinely one of my favourite parts of the
OS.

It also quietly broke an assumption that a lot of security software was built on,
and I want to walk through how we gave that software a way out.

Here's the assumption. Some of the nastiest game cheats don't live in the game at
all. They live down in kernel mode, often as a malicious driver, where an
ordinary program can't see them. So anti-cheat vendors went down there too. They
ship a kernel driver that gets the same wide view of system memory the cheats
have, and scans for code that has been tampered with.

Now picture that scanner walking through kernel memory. It notices that a few
bytes inside `ntoskrnl.exe` no longer match the code Microsoft shipped. A
function that used to start with its normal instructions now jumps off somewhere
else.

Ten years ago that was an easy call. Nobody rewrites running kernel-mode code
except an attacker, so you flag it and take action. But now Windows patches its
own kernel and its drivers all the time, live, using
[secure hotpatches](https://techcommunity.microsoft.com/blog/windowsosplatform/hotpatching-on-windows/2959541){: target="_blank" rel="noopener" }.
So the exact same signal, "kernel-mode code changed," now means one of two
opposite things: a cheat, or a perfectly legitimate Microsoft fix.

And you really don't want to guess. If you flag every modified byte, you ban
honest players whose machines are just patched and healthy. If you ignore
modified bytes, cheats can hide in kernel memory without ever getting caught.

The Secure Hotpatch Report is how Windows settles it. It's a signed
statement from the Secure Kernel that says, precisely, which kernel-mode images
have a legitimate hotpatch applied right now. If your mystery change lands inside one of
those images, there's a real patch that could explain it. If it lands anywhere
else, nothing here vouches for it, and it's worth a hard look.

And even if you never touch anti-cheat, there's a bigger question here: can you
trust a report from a machine that might already be hacked? That's
the thread running through this whole series, and the hotpatch report is one of
the neater answers to it.

The whole idea fits in one picture:

![A modified region in the kernel: cheat or patch? The address is checked against an attested list of hotpatched images signed by the Secure Kernel; inside a reported image means a legitimate hotpatch could explain it, outside means no legitimate hotpatch explains it at all.](/assets/images/hotpatch/cheat-or-patch.svg){: .shadow }
_The report tells you whether the image is legitimately hotpatched, not whether these exact bytes are._

> For context: this isn't a reverse-engineering writeup. I'm on the Windows
> Secure Kernel team at Microsoft, and the Secure Hotpatch Report is a feature I
> built. Hotpatching on Windows is my team's work. So this is the view from the
> inside.
{: .prompt-info }

## A quick recap

If you haven't read the earlier posts in this series, here's all you need for
this one:

- Windows has a Secure Kernel that lives in a more trusted, hypervisor-isolated
  world (VTL1) than the normal kernel (VTL0). Even a fully compromised VTL0
  kernel can't forge what VTL1 says.
- You ask for a report with a single Win32 call, `GetRuntimeAttestationReport`,
  and get back a package that VTL1 has signed.
- You verify the package signature (RSA-PSS over SHA-512), made with the private
  half of the VBS root signing key, IDKS. Then you check that each report
  matches its signed digest, and only then read the contents. That whole chain
  is what makes it worth trusting.

![The signed report crosses the VBS trust boundary: a VTL0 process sends a request and nonce; the Secure Kernel in VTL1 collects state, builds the package, and signs it; the signed package returns to be verified and read.](/assets/images/hotpatch/vtl-trust-boundary.svg){: .shadow }
_Your process asks. The Secure Kernel answers and signs._

The concept post and the format post are coming soon. They'll cover the trust
model, and the package layout and API in detail. This post is about one
report type inside that package: the hotpatch report.

## What a secure hotpatch is

A secure hotpatch is a Microsoft-signed patch applied to a running kernel-mode
image without a reboot. The base image (say `ntoskrnl.exe`) stays loaded, and the
patch redirects specific functions to fixed versions. That's how a critical
kernel fix reaches production machines without asking anyone to restart.

Here's the catch. To a memory scanner, a hotpatched function looks exactly like a
hooked function, because that's mechanically what it is. The bytes changed, the
control flow changed, and the bytes on their own don't say who did it. To tell
friend from foe you need someone outside VTL0 to vouch for the change, and that
someone is the Secure Kernel. The hotpatch report is how it speaks up.

Let me show you what the redirect actually looks like. Break into the kernel on a
machine with a hotpatch applied and disassemble one of the patched functions. Its
entry no longer runs its own code. It jumps away. On x64, one real example looks
like this (with the function name generalized):

```plaintext
0: kd> u nt!SomePatchedFunction
nt!SomePatchedFunction:
fffff800`12345000 eb f9        jmp   fffff800`12344ffb
fffff800`12344ffb e9 xxxxxxxx  jmp   fffff800`13a00008
fffff800`13a00008 ...          ; in the HPAT, jumps on to the patched code
```

Read it top to bottom. Windows overwrites a single instruction at the function's
entry (`12345000`), here a two-byte jump (`eb f9`), sending execution into a
reserved slot just before the function. That slot makes a longer jump out to the
Hotpatch Address Table (HPAT), a region Windows keeps past the end of the image
for exactly these redirects, and from there into the patched code. If you want
the full mechanism, my team's
[deep dive on hotpatching](https://techcommunity.microsoft.com/blog/windowsosplatform/hotpatching-on-windows/2959541){: target="_blank" rel="noopener" }
walks through the HPAT and the patch engine properly.

Don't pattern-match on those exact bytes, though. That's one real capture, and
the addresses will look different on your machine. ARM64 uses completely
different instructions than x64. Only the functions the patch actually touches
get redirected; everything else in the image is left alone. The part that's
always true is the idea: a patched function's entry sends execution off to
relocated code, so a scanner comparing raw bytes sees an inline hook. Because
that's exactly what it is.

## What you'll need

Everything in this post is backed by a small public sample I wrote, so you can
follow along in the
[sample code on GitHub](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" }.
The hotpatch report is new, so the setup to build and run it is a little
particular:

- **Windows 11 Insider Experimental (Future Platforms) Preview Build 29591.1000
  or later**, with **VBS enabled**. Unlike the driver report, it does not need
  HVCI, VBS on its own is enough. If you ask for the hotpatch report on an
  older build, you get `ERROR_INVALID_PARAMETER` back rather than an empty
  report.
- **Windows SDK 10.0.26100 or later** for `GetRuntimeAttestationReport` and
  the runtime attestation report structures. The prototype is gated behind
  `NTDDI_VERSION >= NTDDI_WIN11_GE`, so set your target version to match.
- The **hotpatch structures** (`HOTPATCH_RUNTIME_REPORT`, `HOTPATCH_INFO_ENTRY`,
  and the `RuntimeReportTypeHotpatch` value) haven't shipped in the SDK yet. Until
  they do, the sample defines them in its own header, `HotpatchReport.h`. Delete
  it and pull in the SDK types once they land. I'll also update the blog when they do.
- Link against **`mincore.lib`** for the export (that's what the sample does), or
  resolve it from `KernelBase.dll` at runtime. I'll cover the linking in more
  detail in the upcoming format post.

## Getting the hotpatch report

You ask for the hotpatch report by requesting its report type. It rides inside the
same runtime attestation package as everything else:

```cpp
// Not in the shipped SDK's RUNTIME_REPORT_TYPE enum yet, so define it.
#define RUNTIME_REPORT_TYPE_HOTPATCH 2

UINT64 reportTypes = RUNTIME_REPORT_TYPE_TO_MASK(RUNTIME_REPORT_TYPE_HOTPATCH);

// A fresh 32-byte anti-replay nonce.
UCHAR nonce[32];
BCryptGenRandom(nullptr, nonce, sizeof(nonce), BCRYPT_USE_SYSTEM_PREFERRED_RNG);

// Two-step: ask for the size, then fetch.
UINT32 size = 0;
GetRuntimeAttestationReport(nullptr, RUNTIME_REPORT_PACKAGE_VERSION_CURRENT,
                            reportTypes, nullptr, &size);   // -> ERROR_INSUFFICIENT_BUFFER

std::vector<BYTE> package(size);
GetRuntimeAttestationReport(nonce, RUNTIME_REPORT_PACKAGE_VERSION_CURRENT,
                            reportTypes, package.data(), &size);
```

The call has one quirk worth knowing. You don't know how big the package is up
front, so you call it twice: once with a `NULL` buffer to learn the size, then
again with a buffer that big to fetch it. There's a wrinkle, though: the package
can grow between those two calls, because a hotpatch could land in that window.
So if the second call still comes back with `ERROR_INSUFFICIENT_BUFFER`, don't
panic, just resize and go again. The sample wraps this in a small retry loop and
does the return-value checks I skipped over in the snippet. Or, if you'd rather
not do the dance, just pass a buffer you're confident is big enough in one shot.
You trade a little wasted memory for one call instead of two, and you sidestep
the grow-between-calls race. Just don't hardcode a fixed size: the report's size
is dynamic, so check for `ERROR_INSUFFICIENT_BUFFER` and grow if your guess is
short.

This is what the [sample](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" } prints on a machine with a hotpatched kernel:

```
========================================================================
  Report 1 of 1  -  Hotpatch report
========================================================================
  1 patched image(s)

  [0] ntoskrnl.exe
      base address  : 0xfffff801ba000000
      image size    : 23068672 bytes
      checksum      : 0x00d0ac0a
      timedatestamp : 0xbe272ecf
      patch sequence: 10000000
```

Each entry is a fixed 56-byte structure:

```cpp
typedef struct _HOTPATCH_INFO_ENTRY {
    UINT32 BaseCheckSum;          // PE checksum of the base image
    UINT32 BaseTimeDateStamp;     // PE timestamp of the base image
    UINT64 BaseAddress;           // where the base image is loaded in VTL0
    UINT32 ImageSize;             // size of the base image
    UINT32 LatestSequenceNumber;  // highest patch sequence applied so far
    CHAR   BaseImageName[32];     // informational name (see below)
} HOTPATCH_INFO_ENTRY;
```

`LatestSequenceNumber` is the highest patch sequence that has been applied to
that base image. Patches are cumulative, so it tells you how far along the patch
chain the machine is.

There's a sharper use for this number, if you keep a baseline:

1. Record the sequence number the first time you see a hotpatched image.
2. If a new modification shows up in that image later, fetch the report again.
3. If the sequence number hasn't moved, no new patch explains the change, and
   you know for certain you're looking at an attacker. If it has gone up, a real
   patch landed in between and could be the explanation.

## Trust the checksum, not the name

There's a detail here that's easy to get wrong.

Identify an image by the pair `(BaseCheckSum, BaseTimeDateStamp)`. Not by
`BaseImageName`.

Why? The checksum and timestamp come from the hotpatch itself. A hotpatch is a
Microsoft-signed package that names the base image it targets by exactly this
pair, and the Secure Kernel verifies that signature before it applies the patch.
So these values are authenticated as part of a signed patch. They're the same
pair the patch engine keys on: a hotpatch is refused unless the base image's
checksum and time-date stamp match what the patch was built for.

The name is different. It doesn't come from the patch at all. The Secure Kernel
asks VTL0 for the image's name and copies it in, purely so the report reads
nicely in a dump. Now, the whole report is signed either way, so signing isn't
what separates these fields. The name is untrustworthy because its value came
from VTL0 to begin with, and signing something VTL0 handed you only proves VTL0
said it.

Here's the split at a glance:

![Which HOTPATCH_INFO_ENTRY fields to trust: BaseCheckSum and BaseTimeDateStamp are the authoritative identity, verified in VTL1 and delivered in a signed report; BaseImageName is informational only, captured from VTL0 and spoofable.](/assets/images/hotpatch/trust-the-checksum.svg){: .shadow }
_A cheat can rename a module. It can't forge the signed checksum/timestamp pair._

> If you branch on `BaseImageName`, a cheat that renames or spoofs a module can
> steer your logic. If you key on `(BaseCheckSum, BaseTimeDateStamp)`, there's
> nothing left to spoof.
{: .prompt-warning }

## Using it in your app

The common case is simple. Your anti-cheat finds a modification at some address.
Before it calls that tampering, it checks whether the address falls inside an
image the report says is legitimately hotpatched:

```cpp
bool IsAddressInHotpatchedImage(uint64_t address,
                                const HOTPATCH_INFO_ENTRY* entries,
                                uint32_t count)
{
    for (uint32_t i = 0; i < count; i++) {
        const HOTPATCH_INFO_ENTRY& e = entries[i];
        if (address >= e.BaseAddress &&
            address - e.BaseAddress < e.ImageSize) {
            return true;
        }
    }
    return false;
}
```

If the address is inside a reported hotpatched image, a legitimate patch could
explain the change, so that alone isn't grounds for a ban. If it's outside every
reported hotpatched image, you know for certain that no legitimate hotpatch
explains it, so it stays suspicious.

This signal has a limit, though. The report tells you which images
were hotpatched and where they sit in memory. It does not tell you which exact
bytes changed, or what they changed to. So a machine carrying both a genuine
hotpatch and a cheat in the same binary is still ambiguous at this level, because
both land in the same reported image. This check on its own won't untangle that.

> The report stops at image-level identity by design. It names which images are
> legitimately patched and their cumulative patch level, but not which functions
> or bytes the patch changed. So this check narrows suspicion to an image; it
> doesn't clear or convict individual bytes.
{: .prompt-info }

Even with that limit, the report raises the bar. Kernel anti-cheat has
historically had to either ignore changes in these images or eat the false
positives. Some read the list of hotpatched images straight from the registry,
but that lives in normal mode (VTL0), so a cheat can just rewrite it before you
read it. A signed list of exactly which images are legitimately
patched, coming from VTL1 where VTL0 can't touch it, turns "ignore it and hope"
into a decision you can actually reason about.

## Try the sample

The sample I mentioned pulls all of this together: it fetches the package,
parses it, and prints the driver and hotpatch reports. It needs no third-party
dependencies, just the Windows SDK and the MSVC toolchain:

```
> WindowsRuntimeAttestationReport.exe --type hotpatch
```

Code and build instructions are here:
[github.com/CodeMaxx/windows-runtime-attestation-report](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" }.

The next post gets into the trust story underneath all this, how the package is
signed and how you check it end to end. The short version: Windows even exposes
the public half of IDKS through a documented CNG property, so you can verify the
signature yourself. The hotpatch report is only as good as that signature.

Thanks for reading! If something here is unclear, or you spot a mistake, tell me
in the comments. I'd love to hear from you. :)

> New to the series? The concept post is coming soon. For now, grab the
> [sample](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" }
> and run it on your own machine.
{: .prompt-tip }

> A quick note on ordering: this is Part 3 of the series, and Parts 1 and 2 (the
> concept and format posts) aren't published yet. A few folks specifically asked
> for the hotpatch report, so I'm putting this one out first. Parts 1 and 2 are
> coming shortly.
{: .prompt-danger }
