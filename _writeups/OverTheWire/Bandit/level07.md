---
title: "Bandit Level 7"
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

#### Level Goal:

>The password for the next level is stored in the file **data.txt** next to the word **millionth**

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

#### Helpful Reading Material

>None

## Write-up

Another simple use of `grep` command and piping `|` operator.

~~~bash
cat data.txt | grep millionth
~~~

This gives the password.

#### Level 8 passoword: `cvX2JJa4CFALtqS87jk27qwqGhBM9plV`
