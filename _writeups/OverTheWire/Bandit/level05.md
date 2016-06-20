---
title: "Bandit Level 5"
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

>The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties: - human-readable - 1033 bytes in size - not executable

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>None

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

#### Level 6 password: `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`
