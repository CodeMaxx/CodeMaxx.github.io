---
title: "Bandit Level 13"
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

>The password for the next level is stored in /etc/bandit_pass/bandit14 and can only be read by user bandit14. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. Note: localhost is a hostname that refers to the machine you are working on

#### Commands you may need to solve this level

>ssh, telnet, nc, openssl, s_client, nmap

#### Helpful Reading Material

>[SSH/OpenSSH/Keys](https://help.ubuntu.com/community/SSH/OpenSSH/Keys)

## Write-up

It provides us with the private ssh key for the next level. This is how a private ssh key looks.

![private_ssh_key](/assets/images/OverTheWire/Bandit/private_ssh_key.png)

I copied the key and created an identical file on my machine.
Then I used it to login to Level 14.

**Note that you need to change permission of the file to `600`. For this use `chmod`.**

~~~bash
CodeMaxx:~$ chmod 600 sshkey.private
CodeMaxx:~$ ssh -i sshkey.private bandit14@bandit.labs.overthewire.org
~~~

This logs us in without asking for the password. This is how private ssh keys work.<br>
Though it is not necessary we can take a look at the password for Level 14 since we know all passwords are in `etc/bandit_pass` directory.

~~~bash
cat /etc/bandit_pass/bandit14
~~~

You can now log into Level 14 with this password without the need of the private ssh keys.

#### Level 14 passoword: `4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e`
