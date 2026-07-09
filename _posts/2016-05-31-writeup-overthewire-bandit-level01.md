---
title: "Bandit Level 1"
layout: post
permalink: /writeups/OverTheWire/Bandit/level01/
date: 2016-05-31 01:16:51 +0530
image: /assets/images/OverTheWire/Bandit/hero-level1.png
tag:
- Bandit
- OverTheWire
- Wargames
writeup: true
star: false
points:
ctf_category: Wargame
description: "Bandit Level 1 → 2: reading a file named with a dash using a path prefix"
---

#### Level Goal:

>The password for the next level is stored in a file called `-` located in the home directory

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>[Google Search for "dashed filename"](https://www.google.com/search?q=dashed+filename)
[Advanced Bash-scripting Guide - Chapter 3 - Special Characters](https://tldp.org/LDP/abs/html/special-chars.html)

## Write-up

This was a bit tricky. The filename was `-`. A simple `cat -` didn't work. This is becuase `cat` interprets `-` as `stdin` which means that instead of a file you give it an input from the terminal.

Thus I used `cat ~/-` to read from the file.

#### Level 2 password: `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`
