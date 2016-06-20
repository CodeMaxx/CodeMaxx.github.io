---
title: "Bandit Level 14"
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

>The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

#### Commands you may need to solve this level

>ssh, telnet, nc, openssl, s_client, nmap

#### Helpful Reading Material

>[How the Internet works in 5 minutes (YouTube)](https://www.youtube.com/watch?v=7_LPdttKXPc)(Not completely accurate, but good enough for beginners)
[IP Addresses](http://computer.howstuffworks.com/web-server5.htm)
[IP Address on Wikipedia](http://en.wikipedia.org/wiki/IP_address)
[Localhost on Wikipedia](http://en.wikipedia.org/wiki/Localhost)
[Ports](http://computer.howstuffworks.com/web-server8.htm)
[Port (computer networking) on Wikipedia](http://en.wikipedia.org/wiki/Port_(computer_networking))

## Write-up

We logged into this level using the private ssh key and not the password so currently we don't have the password. But we can take a look at the password(for Level 14 only)since we know all passwords are in `etc/bandit_pass` directory.

~~~bash
cat /etc/bandit_pass/bandit14
~~~

To submit the password to `localhost` I used `nc` command.

~~~bash
echo 4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e | nc localhost 30000
~~~

![nc_command](/assets/images/OverTheWire/Bandit/nc_command.png)

#### Level 15 password: `BfMYroe26WYalil77FoDi9qh59eK5xNr`
