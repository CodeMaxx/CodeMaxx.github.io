---
title: "OverTheWire Bandit Level 11 → 12 Walkthrough"
layout: post
permalink: /writeups/OverTheWire/Bandit/level11/
date: 2016-05-31 00:41:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level11.png
  alt: "OverTheWire Bandit Level 11 wargame title banner"
tags:
- Bandit
- OverTheWire
- Encoding
writeup: true
points:
ctf_category: Wargame
description: "Decoding a ROT13 cipher using the tr command"
---

> **Level goal:** The password for the next level is stored in the file data.txt, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

**Commands you may need:** `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`

**Helpful reading:**

- [Rot13 on Wikipedia](https://en.wikipedia.org/wiki/Rot13)

## Write-up

`cat data.txt` to get the Rot13-encrypted text. A simple way would be to decrypt using one of the various online tools available.

Another method is using the `tr` command for rotation by 13, to get the password.

~~~bash
bandit11@melinda:~$ cat data.txt | tr 'n-za-mN-ZA-M' 'a-zA-Z'
~~~

> **Level 12 password:** `5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu`
{: .prompt-tip }
