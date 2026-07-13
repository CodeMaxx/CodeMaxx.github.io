---
title: "BackdoorCTF 2016 - isolve"
layout: post
permalink: /writeups/backdoorctf16/2isolve/
date: 2016-06-07 07:44:01 +0530
image:
  path: /assets/images/backdoorctf16/hero-isolve.png
  alt: "BackdoorCTF challenge title banner for “isolve”"
tags:
- BackdoorCTF
- CTF
- Python
writeup: true
points: 200
ctf_category: Exploit
description: "BackdoorCTF 2016 isolve: auto-generating regex-matching strings with exrex under a time limit"
---

> BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.
{: .prompt-info }

> **Challenge:** ~~nc hack.bckdr.in 7070~~ *(CTF server no longer available)*

## Write-up

The task was pretty obvious: the server provides us with a regular expression and we need to supply a string which can be matched by this regex. The tricky part was finding a way to generate strings satisfying the regex since there was a time limit after which the server closes the connection. After some googling I found this [amazing project](https://github.com/asciimoo/exrex) to generate the strings.

So I simply wrote a short parser for the communication with server, and use `exrex` to get answers. But there was some problem with `exrex` code. It generated `\n` for non-alphanumeric characters(which is actually correct). The server didn't behave well to this since it was obviously expecting newline at the end of the input. So I modified my script to tackle this. There were also issues with `\S` and `\w` which I replaced by hardcoded characters.

~~~python

import re
import socket
from time import sleep
import exrex

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("hack.bckdr.in", 7070))
    regex = "Your regex:\n(.*)\n"
    initial_data = str(s.recv(4096))
    print(initial_data)
    while True:
        sleep(1) # The server has a sleep time of 1 second before sending the regex
        task = str(s.recv(4096))
        m = re.search(regex, task)
        print(task)
        print("regex: "+m.group(1))
        i = m.group(1).replace("\W", "@").replace("\w", "a").replace("\s", " ").replace("\S", "a") # Corrrections for using `exrex`
        print("Final regex" + i)
        result = exrex.getone(i)
        print("string: "+result)
        s.sendall(str(result) + "\n")
    pass

main()
~~~

This gave me this :) :

![congrats](/assets/images/backdoorctf16/isolve.png)

followed by the flag of the form<br>
`flag{...}`

> Go through other [writeups](/writeups/) for more such fun challenges.
{: .prompt-tip }
