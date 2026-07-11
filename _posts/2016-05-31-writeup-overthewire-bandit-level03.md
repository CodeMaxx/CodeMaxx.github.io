---
title: "Bandit Level 3"
layout: post
permalink: /writeups/OverTheWire/Bandit/level03/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level3.png
  alt: "OverTheWire Bandit Level 3 wargame title banner"
tags:
- Bandit
- OverTheWire
- Shell
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 3 → 4: finding and reading a hidden file with ls -a"
---

#### Level Goal:

>The password for the next level is stored in a hidden file in the inhere directory.

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>None

## Write-up

`ls` does not show the hidden files. Thus to look at all the files I used `la` which is an alias for `ls -a`.

~~~bash
bandit3@melinda:~$ ls inhere/
~~~

This shows a `.hidden` file. Files with names starting with a `.`(dot) automatically get hidden in Unix.<br> `cat inhere/.hidden` reveals the password for the next level.

#### Level 4 password: `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`
