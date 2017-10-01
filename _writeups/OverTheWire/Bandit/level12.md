---
title: "Bandit Level 12"
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

>The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work using mkdir. For example: mkdir /tmp/myname123. Then copy the datafile using cp, and rename it using mv (read the manpages!)

#### Commands you may need to solve this level

>grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd, mkdir, cp, mv

#### Helpful Reading Material

>[Hex dump on Wikipedia](http://en.wikipedia.org/wiki/Hex_dump)

## Write-up

Since I was not allowed to create file in the `home` directory, I created a directory at `/tmp/`. I suggest doing this although its possible to do this with a single well structured command. So here's what I basically did

~~~bash

bandit12@melinda:~$ mkdir /tmp/break
bandit12@melinda:~$ cp data.txt /tmp/break
bandit12@melinda:~$ cd /tmp/break
bandit12@melinda:/tmp/break$ ls
data.txt
~~~

The following is what I actually did

![Solution](/assets/images/OverTheWire/Bandit/level12_solve.png)

So the given file was a hexdump. I used `xxd -r <filename>` to reverse it and sent the output to a file. I kept using `file` command at each step to know what I'm tackling.<br> `gzip` compressed files are extracted using `gunzip`. But `gunzip` extracts files only with certain extension, `.gz` being one of them. So I renamed the file to have that extension. <br>`bzip2` compressed files are extracted using `bzip2 -d <filename>` where `-d` flag stands for "decompress". <br>For `tar` archives I used `tar xvf <filename>`.<br> After repeatedly extracting and re-extracting, I landed upon a file containing ASCII text. That sure containted the password.

***If you have a method to automate this stuff to make it easier, please comment below or [email me](http://www.google.com/recaptcha/mailhide/d?k=01VG-M2zL1CCSeYr97HKgLtA==&c=eoBC31BPlm_BNGxSQFrp_3Zk9kKbEB_gOaoModecKZo=).***

#### Level 13 password: `8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL`
