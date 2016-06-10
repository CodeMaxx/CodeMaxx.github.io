---
title: "Bandit Level 9"
layout: post
date: 2016-05-30 4:21
tag:
- Bandit
- OverTheWire
- Wargames
writeup: true
star: false
points:
category: Wargame
---

![OverTheWire logo](/assets/images/OverTheWire/logo.png)

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

#### Level 10 passoword: `truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk`
