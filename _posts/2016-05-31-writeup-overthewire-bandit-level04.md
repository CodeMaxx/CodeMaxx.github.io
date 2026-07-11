---
title: "Bandit Level 4"
layout: post
permalink: /writeups/OverTheWire/Bandit/level04/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level4.png
  alt: "OverTheWire Bandit Level 4 wargame title banner"
tags:
- Bandit
- OverTheWire
- File Analysis
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 4 → 5: using the file command to find the only human-readable file"
---

#### Level Goal:

>The password for the next level is stored in the only human-readable file in the inhere directory. Tip: if your terminal is messed up, try the “reset” command.

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>None

## Write-up

The description says that we need to find the only human readable file in the `inhere` directory. To see the file format I used the `file` command on all the files in the `inhere` directory.

~~~bash
for x in `find inhere -type f -print`;
    do
        file $x;
    done
~~~

I got

~~~bash

inhere/-file08: data
inhere/-file05: data
inhere/-file07: ASCII text
inhere/-file04: data
inhere/-file00: data
inhere/-file01: data
inhere/-file06: data
inhere/-file03: data
inhere/-file09: data
inhere/-file02: data
~~~

Thus `inhere/-file07` is the file we are looking for. `cat inhere/-file07` gives the password for the next level.

#### Level 5 password: `koReBOKuIDDepwhWk7jZC0RTdopnAYKh`
