---
title: "Knowing Your Binary: Reading the file Command's ELF Output"
layout: post
date: 2016-06-15 00:00
last_modified_at: 2026-07-13
image:
  path: /assets/images/re-wide.png
  alt: "“Reverse Engineering” text logo beside a gear icon"
tags:
- Executable Formats
- Reverse Engineering
- Tutorial
blog: true
description: "Every token in that cryptic one-liner — bitness, architecture, ABI, dynamic linking, interpreter — explained one at a time."
---

Ever thought why programs have different setup files for Windows, Mac and Linux. To give you a feel of it I'll tell you about the different kinds of formats the executable come in. I won't be going into the details but the next time you use the `file` command, you'll exactly know what you are looking at.

Here is the output of `file` command on a random executable on my machine.

```
ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, not stripped
```

Lets go through each word one by one.

## ELF

`ELF`(Executable and Linkable Format) is a file format for executables, object code, shared libraries, and core dumps. It is the standard file format for Unix and Unix-like(e.g. Linux) systems. You will mostly encounter this kind of files on your Linux machines.

### Other

`Mach-O`(Mach object) - For NeXTSTEP, OS X, and iOS

`PE`(Portable Executable) - For Windows Operating System

## 32-bit

`32-bit` Computer Architecture system is the one using `x86`, `MIPS32` assembly instruction set.

### Other

`64-bit` systems use the `x86-64` assembly instruction set.

> Note that this does not tell you the about the system you are working on but about the way the instructions have been structured and written into the binary(So for the same program, 32-bit and 64-bit will have different assembly instructions but the executable would behave the same way).
{: .prompt-info }

> There are other instruction sets as well like `MIPS32`, `MIPS64`, `ARM`, `PowerPC` which you might encounter but in my experience `x86` and `x86-64` are the most commonly used.
{: .prompt-info }

## LSB

`LSB` stands for `Least Significant Byte` and it tells us about the **endianness** of the binary, i.e. the order in which the bytes of a multi-byte number are stored in memory. `LSB`(also called **little-endian**) means the least significant byte is stored first.

So a number like `0x12345678` would be stored in memory as:

```
78 56 34 12
```

This is the byte order used by `x86` and `x86-64` processors, which is exactly why we see it right next to `Intel 80386` in the output.

### Other

`MSB`(`Most Significant Byte`, or **big-endian**) is just the opposite - the most significant byte comes first, so `0x12345678` would be stored as `12 34 56 78`. You'll see this on architectures like `SPARC` and some older `MIPS`/`PowerPC` systems.

## Intel 80386

`Intel 80386` is a 32-bit microprocessor by Intel. This means that the executable can be run on Intel's 80386 microprocessor or anything compatible with it. The latest 64-bit microprocessors are all backward compatible with the 32-bit ones.

## SYSV

`SYSV` is short for System Five. It is one of the first commercial versions of the Unix operating system developeed by AT&T. The other major version of Unix is `BSD`(Berkely Software Distribution)

### Other

`GNU/Linux` - It is very obvious that this refers to the Linux operating system.

## Dynamically linked (uses shared libs)

In `Dynamic linking` the names of the external libraries (shared libraries) are placed in the final executable file while the actual linking takes place at run time when both executable file and libraries are placed in the memory. Thus we don't have to keep the standard libraries inside the binary(You import these in your program). This helps keep the file size low and also lets several programs use a single copy of an executable module.

### Other

In `Static linking` all library modules used in the program are copied into the final executable image. This is performed by the linker and it is done as the last step of the compilation process. This naturally increases the file size a lot.

> Note that programs that use statically-linked libraries are usually faster than those that use shared libraries. Also in statically-linked programs, all code is contained in a single executable module. Therefore, they never run into compatibility issues.
{: .prompt-info }

## interpreter /lib/ld-linux.so.2

This the ELF interpreter. It is responsible for dynamic linking.

## for GNU/Linux 2.6.32

`2.6.32` represents the version of the Linux kernal the C library linked with the program targets. I'm not exactly sure how kernals work though so I can't elaborate much on this.

## not stripped

`Non stripped` binaries contain debugging information. This information is a representation of the relationship between the executable program and the original source code. It includes things like Global and Static variable names and function names.<br>
`Stripped` binaries on the other hand lack this debugging information.

All these things are a must know for a Reverse Engineer. I hope this blog increased you knowledge in this genre. :) In case of any doubts comment below.

Cheers!

> If you are an Infosec person, don't forget to checkout my [CTF Write-ups](/writeups/)
{: .prompt-tip }
