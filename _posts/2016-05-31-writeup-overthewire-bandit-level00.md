---
title: "Bandit Level 0"
layout: post
permalink: /writeups/OverTheWire/Bandit/level00/
date: 2016-05-31 01:16:51 +0530
image: /assets/images/OverTheWire/Bandit/hero-level0.png
tags:
- Bandit
- OverTheWire
- SSH
writeup: true
star: false
points:
ctf_category: Wargame
description: "Bandit Level 0 → 1: logging into SSH and reading a file with cat"
---

#### Level Goal:

>The password for the next level is stored in a file called **readme** located in the home directory. Use this password to log into bandit1 using SSH. Whenever you find a password for a level, use SSH to log into that level and continue the game.

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>None

## Write-up

This was pretty straightforward. I ssh-ed into level 0 with

~~~
ssh bandit0@bandit.labs.overthewire.org
~~~

using the given password `bandit0`. Note that the password will not be visible when you write it.

Then look at the contents of `readme` file to get the password to the next level.

~~~bash
bandit0@melinda:~$ cat readme
~~~

#### Level 1 password: `boJ9jbbUNNfktd78OOpsqOltutMc3MY1`
