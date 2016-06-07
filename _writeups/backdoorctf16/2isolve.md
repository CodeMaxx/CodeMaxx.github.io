---
title: "isolve"
layout: post
date: 2016-05-30 4:21
tag:
- BackdoorCTF2016
- Miscellaneous
- Backdoor
writeup: true
star: false
points: 200
category: Misc
---

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 200

#### Description:

>nc hack.bckdr.in 7070

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
