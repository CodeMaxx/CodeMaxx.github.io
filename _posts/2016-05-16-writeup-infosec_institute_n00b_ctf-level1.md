---
title: "Infosec Institute n00b Level 1"
layout: post
permalink: /writeups/Infosec_Institute_n00b_ctf/level1/
date: 2016-05-16 8:10
image:
  path: /assets/images/InfosecInstin00b/yoda1-wide.png
  alt: "“May the source be with you!” Yoda image, high-contrast and stylised"
tags:
- CTF
- Web Security
- Infosec Institute n00b CTF
writeup: true
description: "Spotting the hidden flag by viewing the page's HTML source."
points: 10
ctf_category: Web
---

## Write-up

"May the source be with you!". Yoda hints us to look at the source code of the webpage. Right click on the webpage and click `View Page Source`. At the top of the source code we see:

![Page source revealing the flag][2]

[2]: /assets/images/InfosecInstin00b/source1.png

This gives away the flag!

**Flag:** `infosec_flagis_welcome`
