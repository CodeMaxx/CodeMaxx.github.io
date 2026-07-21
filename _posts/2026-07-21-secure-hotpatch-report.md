---
title: "Patch or attack? How Windows proves a kernel change is legit"
date: 2026-07-21 08:00
tags:
- Security
- Windows
- Anti-Cheat
- Hotpatching
blog: true
comments: false
description: "How the Windows Secure Hotpatch Report uses VTL1 attestation to tell legitimate hotpatches from kernel tampering. Full post coming soon."
---

The full post is on its way. I'm putting the finishing touches on it. It'll cover
the **Windows Secure Hotpatch Report**: the signed, VTL1-attested list of every
active kernel and driver hotpatch on a machine, and how anti-cheat and security
tools can use it to tell a legitimate Microsoft patch apart from tampering.

In the meantime, the working sample is already up on GitHub. Clone it, build it
with the Windows SDK, and try it today:

[github.com/CodeMaxx/windows-runtime-attestation-report](https://github.com/CodeMaxx/windows-runtime-attestation-report){: target="_blank" rel="noopener" }

Check back shortly for the full writeup. Thanks for stopping by!
