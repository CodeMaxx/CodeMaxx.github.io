---
title: "Bandit Level 7"
layout: post
permalink: /writeups/OverTheWire/Bandit/level07/
date: 2016-05-31 01:16:51 +0530
image: /assets/images/OverTheWire/Bandit/hero-level7.png
tags:
- Bandit
- OverTheWire
- Text Processing
writeup: true
star: false
points:
ctf_category: Wargame
description: "Bandit Level 7 → 8: extracting a password next to the word 'millionth' with grep"
---

#### Level Goal:

>The password for the next level is stored in the file **data.txt** next to the word **millionth**

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>None

## Write-up

Another simple use of `grep` command and piping `|` operator.

~~~bash
cat data.txt | grep millionth
~~~

This gives the password.

#### Level 8 password: `cvX2JJa4CFALtqS87jk27qwqGhBM9plV`
