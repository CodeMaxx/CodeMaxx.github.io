---
title: Windows Runtime Attestation Report
links:
  - title: Companion sample on GitHub
    url: https://github.com/CodeMaxx/windows-runtime-attestation-report
    icon: fab fa-github
planned:
  - part: 1
    title: An intro to Windows Runtime Attestation
    blurb: Why a compromised kernel can't vouch for itself, and what a signed report does and doesn't prove.
  - part: 2
    title: The package and the API
    blurb: What comes back from the call field by field, and how to pull the reports out in code.
  - part: 4
    title: The driver report
    blurb: The drivers the machine has loaded, with the identity you need to spot an impostor.
  - part: 5
    title: Trusting the key
    blurb: How your server uses the TPM to decide the signing key belongs to a real Secure Kernel.
---

This series is about the Windows Runtime Attestation Report. It's a feature I worked on, and one of my favourite things we've shipped. It gives your server a signed set of facts about a Windows machine's kernel, like which drivers are loaded and what has been hotpatched. The signature comes from a part of Windows that the normal kernel can't reach, so even a fully compromised kernel can't forge it.

I'm writing it for people who build anti-cheat and security software. The posts start with why you'd need this at all, then get into the API and each report, with code you can run from the companion sample.
