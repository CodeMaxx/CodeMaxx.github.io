---
title: "BackdoorCTF 2016 - debug"
layout: post
date: 2016-06-07 14:21
tag:
- BackdoorCTF2016
- Reversing
- Backdoor
writeup: true
star: false
points: 30
category: RE
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 30

#### Description:

>Take sha256 of string obtained.
~~[http://hack.bckdr.in/DEBUG/debug32](http://hack.bckdr.in/DEBUG/debug32)~~ *(CTF server no longer available)*

## Write-up

So they gave a 32-bit ELF stripped executable. Simply running the binary `./debug32` didn't do nothing.

I looked through the assembly in IDA and saw "Printing Flag" being printed somewhere.

![Priniting Flag](/assets/images/backdoorctf16/debug_ida.png)

So the first and probably the last thing I needed to do was to jump to the function printing it. The address of the function as we can see is at `0x804849B`.

For this I used gdb. My first instinct was to set a breakpoint at `main`, then set the `eip` to the address of the required function and continue. This would print out the flag.

But since this was a stripped binary(hence no symbols table), it didn't recognise `main` as a valid breakpoint. So I set the breakpoint at `__libc_start_main()` function. This is the function which sets up the environment and then calls the `main()` function when the binary is run.

So to carry out the required task, these were the commands I used:

~~~
break __libc_start_main

set $eip = 0x804849b

continue
~~~

This as expected printed out the flag!

![Flag Printed](/assets/images/backdoorctf16/debug_flag.png)

**Go through other [writeups](/writeups/) for more such fun challenges.**

