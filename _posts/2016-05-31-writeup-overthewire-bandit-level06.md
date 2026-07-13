---
title: "Bandit Level 6"
layout: post
permalink: /writeups/OverTheWire/Bandit/level06/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level6.png
  alt: "OverTheWire Bandit Level 6 wargame title banner"
tags:
- Bandit
- OverTheWire
- Shell
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 6 → 7: searching the whole server by owner, group, and size with find"
---

> **Level goal:** The password for the next level is stored somewhere on the server and has all of the following properties: - owned by user bandit7 - owned by group bandit6 - 33 bytes in size

**Commands you may need:** `ls`, `cd`, `cat`, `file`, `du`, `find`, `grep`

**Helpful reading:** None

## Write-up

This time the file is not in the `home` directory but "somewhere" on the server.

I went into the `root` directory with `cd /` and did a search to meet the given specifications.

~~~bash
bandit6@melinda:/$ find . -size 33c -group bandit6 -user bandit7 | grep bandit7
~~~

Among a lot of Permission Denied errors, I saw a highlighted `bandit7`.

![output](/assets/images/OverTheWire/Bandit/level6_output.png)

That file had the password for Level 7.
~~~bash
bandit6@melinda:/$ cat ./var/lib/dpkg/info/bandit7.password
~~~~

**Edit:** Yay! Got a nicer one line method to do this.

~~~bash
cat `find . -size 33c -group bandit6 -user bandit7 2>/dev/null`
~~~

So what `2>/dev/null` does is, it redirects all standard errors like `No such file or directory` and `Permission denied` to `/dev/null` where `null` acts as a special device which discards all information written to it. Thus we only get the one required file as output which I sent as input to `cat` to see its contents.

> **Level 7 password:** `HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs`
{: .prompt-tip }
