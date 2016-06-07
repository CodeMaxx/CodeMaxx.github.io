---
title: "BackdoorCTF 2016 - intro16"
layout: post
date: 2016-05-30 4:21
tag:
- BackdoorCTF2016
- Miscellaneous
- Backdoor
writeup: true
star: false
points: 10
category: Misc
---

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 10

#### Description:

>Get the first part of the flag from IRC freenode (#backdoorctf) and the second part from twitter(@BackdoorCTF)

## Write-up

As the description says I got the first part of the flag from IRC(#backdoorctf) -> `NWQ1bDRiNV9iNG`

The second part of the flag from twitter(@BackdoorCTF) -> `NrZDAwcmM3ZjIwMTY=`

Joining this we get a base64 encoded string -> `NWQ1bDRiNV9iNGNrZDAwcmM3ZjIwMTY=`

Decoding this and taking its SHA256 hash we get our solution.

~~~bash
echo -n NWQ1bDRiNV9iNGNrZDAwcmM3ZjIwMTY= | base64 --decode | shasum -a 256
~~~~

Note that I added `-n` for `echo` to prevent an extra newline being appended at the end, which will change the SHA256 checksum.
