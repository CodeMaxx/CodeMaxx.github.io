---
title: "bin-overflow"
layout: post
date: 2016-05-24 1:15
tag:
- Pwning
- Backdoor
writeup: true
star: false
link: "Backdoor bin-overflow"
points: 100
category: Pwn
---

#### Points: 30

#### Description:

>Lets see can you can pwn this one<br>
nc hack.bckdr.in 8013<br>
[bin-overflow](http://hack.bckdr.in/BIN-OVERFLOW/bin-overflow)

## Write-up

<!-- I saw two suspicious things on the page - a QR code and a 90% complete progress bar. I went to the source code and saw the progress bar was hardcoded to remain at 90% and hence it is just a distraction.

Then I read the QR code using an online utility. Seach for `QR Code decoder` decoder on `Google`. You'll find plenty of them. I used <https://zxing.org/w/decode.jspx>

This is what I got.

![Decoded QR](/assets/images/infosecInstin00b/decoded_qr3.png)

This surely looks like `Morse Code`. I used <http://morsecode.scphillips.com/translator.html> to convert this to ascii text.
I got `INFOSECFLAGISMORSING`.

This gives away the flag.

#### Flag: `infosec_flagis_morsing` -->
