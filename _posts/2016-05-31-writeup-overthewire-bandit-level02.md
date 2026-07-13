---
title: "Bandit Level 2"
layout: post
permalink: /writeups/OverTheWire/Bandit/level02/
date: 2016-05-31 01:16:51 +0530
image:
  path: /assets/images/OverTheWire/Bandit/hero-level2.png
  alt: "OverTheWire Bandit Level 2 wargame title banner"
tags:
- Bandit
- OverTheWire
- Shell
writeup: true
points:
ctf_category: Wargame
description: "Bandit Level 2 → 3: reading a filename with spaces using quotes or backslash"
---

> **Level goal:** The password for the next level is stored in a file called spaces in this filename located in the home directory

**Commands you may need:** `ls`, `cd`, `cat`, `file`, `du`, `find`

**Helpful reading:**

- [Google Search for “spaces in filename”](https://www.google.com/search?q=spaces+in+filename)

## Write-up

This was simple enough since **Tab completion** was enabled. If that would not be the case, I would have escaped the spaces with a backslash(`\`).

Thus I used `cat spaces\ in\ this\ filename` to read from the file.

> **Level 3 password:** `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`
{: .prompt-tip }
