---
title: "Bandit Level 17"
layout: post
permalink: /writeups/OverTheWire/Bandit/level17/
date: 2016-05-31 04:37:00 +0530
image: /assets/images/OverTheWire/Bandit/hero-level17.png
tags:
- Bandit
- OverTheWire
- Text Processing
writeup: true
star: false
points:
ctf_category: Wargame
description: "Bandit Level 17 → 18: using diff to find the one changed line between two password files"
---

#### Level Goal:

>There are 2 files in the homedirectory: passwords.old and passwords.new. The password for the next level is in passwords.new and is the only line that has been changed between passwords.old and passwords.new

**NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19**

#### Commands you may need to solve this level

>cat, grep, ls, diff

#### Helpful Reading Material

>None

## Write-up

Simple use of `diff` command.

~~~bash
bandit17@melinda:~$ diff passwords.old passwords.new
~~~

![diff output](/assets/images/OverTheWire/Bandit/diff_output.png)

The output from `password.new` file gives the password.

#### Level 18 password: `kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd`
