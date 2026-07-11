---
title: "Bandit Level 9"
layout: post
permalink: /writeups/OverTheWire/Bandit/level09/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level9.png
  alt: "OverTheWire Bandit Level 9 wargame title banner"
tags:
- Bandit
- OverTheWire
- File Analysis
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 9 → 10: using strings to extract human-readable text from a binary file"
---

#### Level Goal:

>The password for the next level is stored in the file data.txt in one of the few human-readable strings, beginning with several ‘=’ characters.

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>None

## Write-up

`strings` commands finds all the human-readable strings within a file.

~~~bash
bandit9@melinda:~$ strings data.txt | grep ======
~~~

![output](/assets/images/OverTheWire/Bandit/level9_output.png)

#### Level 10 password: `truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk`
