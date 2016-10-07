---
title: "Knowing your Binary!"
layout: post
date: 2016-06-15 00:00
tag:
- Executable
- ELF v/s Mach-o v/s PE
- Reversing
- Tutorial
blog: true
description: ""
---

![Reverse Engineering](/assets/images/re.png)

Ever thought why programs have different setup files for Windows, Mac and Linux. To give you a feel of it I'll tell you about the different kinds of formats the executable come in. I won't be going into the details but the next time you use the `file` command, you'll exactly know what you are looking at.

Here is the output of `file` command on a random executable on my machine.

```
ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, not stripped
```

Lets go through each word one by one.

### ELF

`ELF`(Executable and Linkable Format) is a file format for executables, object code, shared libraries, and core dumps. It is the standard file format for Unix and Unix-like(e.g. Linux) systems. You will mostly encounter this kind of files on your Linux machines.

##### Other:

`Mach-O`(Mach object) - For NeXTSTEP, OS X, and iOS

`PE`(Portable Executable) - For Windows Operating System

### 32-bit

`32-bit` Computer Architecture system is the one using `x86`, `MIPS32` assembly instruction set.

##### Other:

`64-bit` systems use the `x86-64` assembly instruction set.

**Note that this does not tell you the about the system you are working on but about the way the instructions have been structured and written into the binary(So for the same program, 32-bit and 64-bit will have different assembly instructions but the executable would behave the same way).**

**There are other instruction sets as well like `MIPS32`, `MIPS64`, `ARM`, `PowerPC` which you might encounter but in my experience `x86` and `x86-64` are the most commonly used.**

### LSB

The Linux Standard Base (LSB) is a joint project by several Linux distributions under the organizational structure of the Linux Foundation to standardize the software system structure. This basically means that across different Linux based Operating Systems(Ubuntu, Fedora etc.), common rules would be used for compiling information into the binary(e.g. using some standard libraries for specific task, standardising the layout of the file system hierarchy etc.).

### Intel 80386

`Intel 80386` is a 32-bit microprocessor by Intel. This means that the executable can be run on Intel's 80386 microprocessor or anything compatible with it. The latest 64-bit microprocessors are all backward compatible with the 32-bit ones.

### SYSV

`SYSV` is short for System Five. It is one of the first commercial versions of the Unix operating system developeed by AT&T. The other major version of Unix is `BSD`(Berkely Software Distribution)

##### Other

`GNU/Linux` - It is very obvious that this refers to the Linux operating system.

### Dynamically linked (uses shared libs)

In `Dynamic linking` the names of the external libraries (shared libraries) are placed in the final executable file while the actual linking takes place at run time when both executable file and libraries are placed in the memory. Thus we don't have to keep the standard libraries inside the binary(You import these in your program). This helps keep the file size low and also lets several programs use a single copy of an executable module.

##### Other

In `Static linking` all library modules used in the program are copied into the final executable image. This is performed by the linker and it is done as the last step of the compilation process. This naturally increases the file size a lot.

**Note that programs that use statically-linked libraries are usually faster than those that use shared libraries. Also in statically-linked programs, all code is contained in a single executable module. Therefore, they never run into compatibility issues.**

### interpreter /lib/ld-linux.so.2

This the ELF interpreter. It is responsible for dynamic linking.

### for GNU/Linux 2.6.32

`2.6.32` represents the version of the Linux kernal the C library linked with the program targets. I'm not exactly sure how kernals work though so I can't elaborate much on this.

### not stripped

`Non stripped` binaries contain debugging information. This information is a representation of the relationship between the executable program and the original source code. It includes things like Global and Static variable names and function names.<br>
`Stripped` binaries on the other hand lack this debugging information.

**All these things are a must know for a Reverse Engineer. I hope this blog increased you knowledge in this genre. :) In case of any doubts comment below.**

**Cheers!**

**If you are an Infosec person, don't forget to checkout my [CTF Write-ups](../../writeups)**

[See other Blog posts](../blog)
