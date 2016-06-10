---
title: "Bandit Level 11"
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

>The password for the next level is stored in the file data.txt, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>[Rot13 on Wikipedia](http://en.wikipedia.org/wiki/Rot13)

## Write-up

`cat data.txt` to get the Rot13-encrypted text. A simple way would be to decrypt using one of the various online tools available.

Another method is using the `tr` command for rotation by 13, to get the password.

~~~bash
bandit11@melinda:~$ cat data.txt | tr 'n-za-mN-ZA-M' 'a-zA-Z'
~~~

#### Level 12 passoword: `5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu`
