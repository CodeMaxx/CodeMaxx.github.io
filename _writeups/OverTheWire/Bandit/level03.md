---
title: "Bandit Level 3"
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

>The password for the next level is stored in a hidden file in the inhere directory.

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>None

## Write-up

`ls` does not show the hidden files. Thus to look at all the files I used `la` which is an alias for `ls -a`.

~~~bash
bandit3@melinda:~$ ls inhere/
~~~

This shows a `.hidden` file. Files with names starting with a `.`(dot) automatically get hidden in Unix.<br> `cat inhere/.hidden` reveals the password for the next level.

#### Level 4 passoword: `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`
