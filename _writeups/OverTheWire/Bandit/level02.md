---
title: "Bandit Level 2"
layout: post
date: 2016-05-30 4:21
tag:
- Bandit
- OverTheWire
- Wargames
writeup: true
star: false
points:
category: Wargame
---

![OverTheWire logo](/assets/images/OverTheWire/logo.png)

#### Level Goal:

>The password for the next level is stored in a file called spaces in this filename located in the home directory

#### Commands you may need to solve this level

>ls, cd, cat, file, du, find

#### Helpful Reading Material

>[Google Search for “spaces in filename”](https://www.google.com/search?q=spaces+in+filename)

## Write-up

This was simple enough since **Tab completion** was enabled. If that would not be the case, I would have escaped the spaces with a backslash(`\`).

Thus I used `cat spaces\ in\ this\ filename` to read from the file.

#### Level 3 password: `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`
