---
title: "Bandit Level 18"
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

>The password for the next level is stored in a file **readme** in the homedirectory. Unfortunately, someone has modified **.bashrc** to log you out when you log in with SSH.

#### Commands you may need to solve this level

>ssh, ls, cat

#### Helpful Reading Material

>None

## Write-up

This is a cool one. As soon as I tried to log in I was logged out. This is because `.bashrc` is sourced as soon as the shell is opened which in this case has been configured to exit the connection. In other words the pseudo-terminal(`pty`) is closed. **Note that `ssh` uses a pseudo-terminal(`pty`) and not a text-terminal(`tty`).**

![.bashrc logout](/assets/images/OverTheWire/Bandit/auto_logout.png)

So I needed to force a pseudo-terminal to open. This can be done with the `-t` flag while `ssh`-ing.

~~~bash
ssh -t bandit18@bandit.labs.overthewire.org /bin/sh
~~~

Here `/bin/sh` is the shell I used in my `pty`.

So now I have a shell I could use to interact with the server. A simple `cat readme` gives us the password for the next level.

![The pseudo-shell](/assets/images/OverTheWire/Bandit/pseudo_shell.png)

Note that we didn't get all the welcome information we used to get in normal `ssh`es since the normal commands didn't get executed this time, rather it forced open the `pty` I ordered.

There is another way to do it. The `-T` flag. `-T` flag disables pseudo-terminal allocation. This prevent the sourcing of `.bashrc` file. We get just the shell without the terminal and then I used `cat readme` to get the password.

~~~bash
ssh -T bandit18@bandit.labs.overthewire.org
~~~

#### Level 19 passoword: `IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x`
