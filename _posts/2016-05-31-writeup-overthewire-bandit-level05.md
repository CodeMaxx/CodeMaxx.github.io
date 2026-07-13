---
title: "OverTheWire Bandit Level 5 → 6 Walkthrough"
layout: post
permalink: /writeups/OverTheWire/Bandit/level05/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level5.png
  alt: "OverTheWire Bandit Level 5 wargame title banner"
tags:
- Bandit
- OverTheWire
- Shell
writeup: true
points:
ctf_category: Wargame
description: "Using find with a size filter to locate the password among many decoy files"
---

> **Level goal:** The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties: - human-readable - 1033 bytes in size - not executable

**Commands you may need:** `ls`, `cd`, `cat`, `file`, `du`, `find`

**Helpful reading:** None

## Write-up

I `cd`-ed into the `inhere` directory to find numerous other directories within it. I looped through all the directories and searched for files of size `1033 bytes`.

~~~bash
for x in `find . -type d -print`;
    do
        find $x -size 1033c -print;
    done
~~~

This gave me

~~~bash
./maybehere07/.file2
./maybehere07/.file2
~~~

Getting two exact same outputs was eerie. After some investigation I found out that `find` command is recursive and checks inside subdirectories on its own. Hence our loop was unecessary.

Thus a simple `find inhere -size 1033c -print` in the home directory would have done the job. `cat ~/inhere/maybeinhere07/.file2` gives the password.

> **Level 6 password:** `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`
{: .prompt-tip }
