---
title: "Bugs Bunny CTF 2k17 - mysterious!"
layout: post
date: 2017-08-01 4:21
tag:
- Reversing
- Hacking
- CTF
writeup: true
star: false
points: 75
category: Reversing
---

![Bugs Bunny CTF](/assets/images/bugs_bunny.png)

#### Points: 75

#### Description:

> i ran the binary but no password match but believe this is another simple reverse engineering challenge .
[rev75.zip](/assets/binaries/bugs_bunny_2k17/rev75.zip)

This was an interested challenge, which helped me learn some more of pwntools.

Initially running `./rev p4ssw0rd` gives

```
good but no flag for you hihihi xD
```

In case you're wonder why `p4ssw0rd`, I got it from the Strings subview in IDA (shortcut: Shift+F12). Never a bad idea to go through the strings in the binary. You can also run `strings` on the binary if you don't have IDA.

The binary had 815 functions with names of the form `a*`, each containing a 12 character string which looked like base64. So I decided to extract them using pwntools. Here goes:

```python
from pwn import *

# Load the ELF file
e = ELF("./rev75")

base64str = ''

# Go through all 'a*' functions
for i in range(815):
    func_addr = e.symbols['a' + str(i)] # Read address of function
    str_addr = u32(e.read(func_addr+17, 4)) # Read address of base64 blob
                                            # Note: The blob is at 17 bytes offset to the function
    base64str += e.read(str_addr, 12) # Read base64 blob (12 bytes in length)

image = open("flag.png", 'w')

image.write(base64str.decode('base64')) # Write to file

```

Note that I didn't know in advance that the base64 string will give a PNG image. I wrote to a file, ran the `file` command on it and realised it was a PNG file.

Open `flag.png` and you have your flag.

**Go through other [writeups](/writeups/) for more such fun challenges.**
