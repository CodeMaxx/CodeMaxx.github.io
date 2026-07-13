---
title: "Bandit Level 8"
layout: post
permalink: /writeups/OverTheWire/Bandit/level08/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level8.png
  alt: "OverTheWire Bandit Level 8 wargame title banner"
tags:
- Bandit
- OverTheWire
- Text Processing
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 8 → 9: finding the only unique line in a file using sort and uniq -u"
---

> **Level goal:** The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

**Commands you may need:** `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`

**Helpful reading:**

- ~~[The unix commandline: pipes and redirects](http://www.westwind.com/reference/os-x/commandline/pipes.html)~~ *(Site no longer active)*

## Write-up

I really didn't use a proper method to solve this one. I used `sort data.txt` to get all data in a sorted manner so that all the repeated lines are together. Then I found out the odd one out through visual inspection. You can see below how easy it is to spot.

![sort_output](/assets/images/OverTheWire/Bandit/level8_sort.png)

Hence I got the password.

> **Edit:** Found a better method for this. The `uniq` command! When the data is sorted the `-u` flag can be used to print only the unique lines.
{: .prompt-info }

~~~bash
sort data.txt | uniq -u
~~~

> **Level 9 password:** `UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR`
{: .prompt-tip }
