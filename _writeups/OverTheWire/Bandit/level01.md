---
title: "Bandit Level 1"
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

>The password for the next level is stored in a file called `-` located in the home directory

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>[Google Search for “dashed filename”](https://www.google.com/search?q=dashed+filename)
[Advanced Bash-scripting Guide - Chapter 3 - Special Characters](http://tldp.org/LDP/abs/html/special-chars.html)

## Write-up

This was a bit tricky. The filename was `-`. A simple `cat -` didn't work. This is becuase `cat` interprets `-` as `stdin` which means that instead of a file you give it an input from the terminal.

Thus I used `cat ~/-` to read from the file.

#### Level 2 passoword: `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`
