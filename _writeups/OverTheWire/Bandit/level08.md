---
title: "Bandit Level 8"
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

>The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>[The unix commandline: pipes and redirects](http://www.westwind.com/reference/os-x/commandline/pipes.html)

## Write-up

I really didn't use a proper method to solve this one. I used `sort data.txt` to get all data in a sorted manner so that all the repeated lines are together. Then I found out the odd one out through visual inspection. You can see below how easy it is to spot.

![sort_output](/assets/images/OverTheWire/Bandit/level8_sort.png)

Hence I got the password.

**Edit:** Found a better method for this. The `uniq` command! When the data is sorted the `-u` flag can be used to print only the unique lines.

~~~bash
sort data.txt | uniq -u
~~~

#### Level 9 passoword: `UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR`
