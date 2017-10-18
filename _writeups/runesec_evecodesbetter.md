---
title: "Runesec CTF 2017 - EveCodesBetter"
layout: post
date: 2017-08-12 4:21
tag:
- Crypto
- Hacking
- CTF
writeup: true
star: false
points: 400
category: Crypto
---

![Runesec CTF](/assets/images/evecodesbetter/runesec.png)

#### Points: 400

#### Description:

> There is a website running at [http://challenges.runesec.com:62856](http://challenges.runesec.com:62856). Try to see if you can become an administrator.

##### Hints:

> Everyone knows that mode is bad because we can see the penguin!

I don't do crypto challenges usually but since this was an easy CTF, I decided to try it out.

Initially opening the website gave a login form... :expressionless:

"Please don't be a web challenge."

But then the source code said `<!-- Guys use dev:dev_testing until we go live -->`, so there.

I logged in and as expected I got the fl... #no

![Easy](/assets/images/evecodesbetter/easy.png)

Of course, it's a 400 point challenge.

Go to the source code again. This time we have something interesting.

```
<!-- DEBUG - REMOVE THIS BEFORE WE GO LIVE!
Cookie Value:
Encrypted Cookie Value: 5e72ac7a72f2100c2a89b80cd2e171706215010861f697b2b5ab2692d5b75925d664080769d6e8f02c5b5713a26b70bf5258ace96b0c51d322effbefea935f9ef718ac79f1281b4d77deff88cbac078847523918f1647186d71f4ef3476ae487ecb7c92019cfe7ec7447505374b81eb15e72ac7a72f2100c53d565f81ee58dce7848fdea6f83922a461fad5d1b842ac2
Decrypted Cookie Value: username=dev;first_name=developer;last_name=developer;is__admin=__False__;status=0;_environment=__True__;is_the_username_enabled=yes;loggedin=1;
-->
```

It was clever to keep it after so much whitespace. Infact, I didn't see it the first two times I saw the source code. Yes, I'm too lazy to scroll.

What now?

"These are multiple md5 hashes joined together."

The length was divisible by 32 which gave me more confidence about this. I tried to crack the md5 hashed using online websites but to no avail. Also tried hash identifiers but got nothing useful.

"I should think of something else."

"But it's divisible by 32, it has to be right!"

So I went on for another 15 minutes trying to md5 various string combination in the cookie to match one of the hashes. Again, nothing.

"I should look at the hint."

Penguin...What kind of hint is this. And then it struck me. The same day we had been studying about [Electronic Code Book (ECB)](https://www.wikiwand.com/en/Block_cipher_mode_of_operation#/Electronic_Codebook_.28ECB.29) mode for [Advanced Encryption Standard (AES)](https://www.wikiwand.com/en/Advanced_Encryption_Standard), and sure enough we'd been given the penguin example. You'll know exactly what I mean in a moment.

So what happens in ECB is that you independently encrypt blocks of the original text with the keys. Now this causes two blocks which are the same to have the same encrypted output. Thus there is confusion but no diffusion. (Ask in the comments if you don't know what this means.)

**Note:** ECB is a general technique used by block ciphers and is by no means specific to only AES.

Now we need to determine what the size of each block is. I noticed that `5e72ac7a72f2100c` repeated twice in the cookie. As expected there were to two equal strings `username` at a similar offset as the encrypted block. So I figured it might be a 64-bit encryption.

I divided the encrypted cookie into corresponding blocks:

```
5e72ac7a72f2100c
2a89b80cd2e17170
6215010861f697b2
b5ab2692d5b75925
d664080769d6e8f0
2c5b5713a26b70bf
5258ace96b0c51d3
22effbefea935f9e
f718ac79f1281b4d
77deff88cbac0788
47523918f1647186
d71f4ef3476ae487
ecb7c92019cfe7ec
7447505374b81eb1
5e72ac7a72f2100c
53d565f81ee58dce
7848fdea6f83922a
461fad5d1b842ac2
```

Similarly I divided the decrypted cookie into parts:

```
username
=dev;fir
st_name=
develope
r;last_n
ame=deve
loper;is
__admin=
__False_
_;status
=0;_envi
ronment=
__True__
;is_the_
username
_enabled
=yes;log
gedin=1;
```

The string `username` fitted in perfectly. Now we see that `__True__` translates to `ecb7c92019cfe7ec` and `;is_the_` translates to `7447505374b81eb1`. I used these to replace `__False_` and `_;status` respectively.

So now the decrytion of the new cookie will give

```
username=dev;first_name=developer;last_name=developer;is__admin=__True__;is_the_=0;_environment=__True__;is_the_username_enabled=yes;loggedin=1;
```

Thus `is__admin` now equals `__True__`, and we're in. Hacked!

![Penguin](/assets/images/evecodesbetter/ecb.png)

**Go through other [writeups](../) for more such fun challenges.**
