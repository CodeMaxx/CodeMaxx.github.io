---
title: "Bandit Level 16"
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

>The credentials for the next level can be retrieved by submitting the password of the current level to a port on localhost in the range 31000 to 32000. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

#### Commands you may need to solve this level

>ssh, telnet, nc, openssl, s_client, nmap

#### Helpful Reading Material

>[Port scanner on Wikipedia](http://en.wikipedia.org/wiki/Port_scanner)

## Write-up

First I felt it was brute force, but no, not all the ports are open. So I found out which ports were open and listening. This I did with `nmap`.

~~~bash
nmap -p 31000-32000 localhost
~~~

`-p` flag takes the range of ports to be checked.

![nmap output](/assets/images/OverTheWire/Bandit/nmap_output.png)

So there were 5 ports open. I decided to check them all. I tried to connect through `openssl`. `31790` turned out to be the right port. It gave me the private ssh key to the next level on submitting the current one. I saved the key to a file locally and used it to ssh to the next level and got the password there just like in [Level 13](../level13/)

#### Level 17 password: `xLYVMN9WE5zQ5vHacb0sZEVqbrp7nBTn`
