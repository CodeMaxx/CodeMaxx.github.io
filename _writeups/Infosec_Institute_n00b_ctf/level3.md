---
title: "Infosec Institute n00b Level 3"
layout: post
date: 2016-05-16 8:15
tag:
- Web
- Infosec Institute n00b CTF
writeup: true
star: false
description: "n00b CTF 3"
points: 30
category: Web
---

#### Points: 30

#### Description:

![Level 3 Description](/assets/images/InfosecInstin00b/qr3.png)

## Write-up

I saw two suspicious things on the page - a QR code and a 90% complete progress bar. I went to the source code and saw the progress bar was hardcoded to remain at 90% and hence it is just a distraction.

Then I read the QR code using an online utility. Seach for `QR Code decoder` decoder on `Google`. You'll find plenty of them. I used <https://zxing.org/w/decode.jspx>

This is what I got.

![Decoded QR](/assets/images/InfosecInstin00b/decoded_qr3.png)

This surely looks like `Morse Code`. I used <https://morsecode.scphillips.com/translator.html> to convert this to ascii text.
I got `INFOSECFLAGISMORSING`.

This gives away the flag.

#### Flag: `infosec_flagis_morsing`
