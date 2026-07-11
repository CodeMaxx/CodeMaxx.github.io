---
title: "Bandit Level 19"
layout: post
permalink: /writeups/OverTheWire/Bandit/level19/
date: 2016-06-02 22:45:50 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level19.png
  alt: "OverTheWire Bandit Level 19 wargame title banner"
tags:
- Bandit
- OverTheWire
- Privilege Escalation
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 19 → 20: using a setuid binary to read a file owned by another user"
---

#### Level Goal:

>To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used to setuid binary.

#### Commands you may need to solve this level

>None

#### Helpful Reading Material

>[setuid on Wikipedia](https://en.wikipedia.org/wiki/Setuid)

## Write-up

This is simple but interesting! This is an subtle example for how a single wrongly assigned permission can make your system vulnerable.

![File Permission](/assets/images/OverTheWire/Bandit/bandit20_do.png)

I saw the owner of the `bandit20-do` is `bandit20`. The red highlight signifies that the file has elevated permissions and any commands executed through the runtime of the file will be run as `bandit20`.

I used this to get the password to next level.

![Bad Permissions](/assets/images/OverTheWire/Bandit/bad_permission.png)

#### Level 20 password: `GbKksEFF4yrVs6il55v6gwY5aVje5f0j`
