---
title: "BackdoorCTF 2016 - buzybee"
layout: post
date: 2016-06-07 14:21
tag:
- BackdoorCTF2016
- Forensics
- Backdoor
writeup: true
star: false
points: 150
category: Forensics
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 150

#### Description:

>A deadly virus is killing bees in Busybee's village Busybox, India. Unfortuantely, you have to go to the village to fight the infection. Get the flag virus out of the infected files.
Village address: ~~[http://hack.bckdr.in/BUSYBEE/infected.tar](http://hack.bckdr.in/BUSYBEE/infected.tar)~~ *(CTF server no longer available)*

## Write-up

This was actually a good one which got beaten because of the small number of files and low complexity.

So what I did during the CTF was just opened and looked at all the `.json` files. They didn't have any flag or anything that I found suspicious. Then I checked for human-readable strings in all the `.tar` files using the `strings` command.

One of them indeed had the flag.

![Infected flag](/assets/images/backdoorctf16/infected.png)

So that was too easy for a 150 points question so I asked around about the expeced solution. Turns out this was a Docker dump. It had to be mounted in Docker and then searched for abnomalities. I have not tried that out yet(I'll have to set up Docker on my machine. I'm feeling too lazy right now.). I'll do it soon though and update this writeup accordingly.

**Go through other [writeups](/writeups/) for more such fun challenges.**
