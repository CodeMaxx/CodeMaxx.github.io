---
title: "Did I Execute?"
layout: post
date: 2016-11-03 11:00
tag:
- Unix
- Terminal
- Tutorial
blog: true
description: ""
---

I'll be discussing about a small detail, about executing multiple commands on a terminal, which I realised most people don't know about.

There are three ways in which commands are combined:-

1. `;` (semicolon)
2. `&&` (Double ampersand)
3. `||` (Double pipe)

What people don't realise is that all of them are meant for completely different use cases.

Let me elaborate.

### **Semicolon `;`**

Semicolon is `the` legit command separator. Let us see some examples.

```bash

$ false ; echo "OK"
OK
$ true ; echo "OK"
OK
```

Thus `A ; B` implies **Run A and then B**. Very straight-foward. No tricks. Lets move to `&&` and `||`.

### **Double ampersand `&&` and Double pipe `||`**

`&&` and `||` are **Logical Binary Operators** and as you might have guessed `&&` is Logical AND, `||` is Logical OR.

The operands they take are boolean values - `true` or `false`, `1` or `0`.

But where are the boolean values in `echo hello && echo world!` ?

These values are derived from the **Exit status** of the commands!

**Note** that a logical AND checks the second operand only when the first one is `true`. Similarly logical OR checks the second operand only when the first one is `false`.

Thus in `A && B`, B executes only when A is a success( exit status 0 ) while in `A || B`, B executes only when A returns an error. Thus both commands may not always execute! Lets see some examples.

```bash

$ false && echo "OK"
$ true && echo "OK"
OK
$ false || echo "OK"
OK
$ true || echo "OK"
$ 
```

This is unlike `A ; B` where B always executes irrespective of exit status of A. Both methods have their uses. A simple case where I use this little detail is while compiling programs.

`g++ -o hack hack.cpp && ./hack`

Here the binary is not executed if the compilation is not successful.

`test_command && echo success || echo fail`

We can get the proper control flow depending on whether `test_command` was a success or not.

```bash

$ true && echo success || echo fail
success
$ false && echo success || echo fail
fail
```

**Hope this helped :) In case you have any doubts comment below. If you are an Infosec person, don't forget to checkout my [Write-ups](../../writeups)**
