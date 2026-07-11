---
title: "Bandit Level 10"
layout: post
permalink: /writeups/OverTheWire/Bandit/level10/
date: 2016-05-31 00:41:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level10.png
  alt: "OverTheWire Bandit Level 10 wargame title banner"
tags:
- Bandit
- OverTheWire
- Encoding
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 10 → 11: decoding base64-encoded data with the base64 command"
---

#### Level Goal:

>The password for the next level is stored in the file data.txt, which contains base64 encoded data

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>[Base64 on Wikipedia](https://en.wikipedia.org/wiki/Base64)

## Write-up

I used the pre-installed base64 decoder to get the passoword.

~~~bash
bandit10@melinda:~$ cat data.txt | base64 --decode
~~~

#### Level 11 password: `IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR`
