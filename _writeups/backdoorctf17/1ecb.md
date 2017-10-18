---
title: "BackdoorCTF 2017 - ECB"
layout: post
date: 2017-10-18 4:21
tag:
- BackdoorCTF2017
- Crypto
- Backdoor
writeup: true
star: false
points: 150
category: Crypto
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 150

#### Description:

> n00b learnt about ECB and has encrypted some images with it. Can you find the flag?

>    [img1.png](/assets/files/img1.png)
    [img2.png](/assets/files/img2.png)


## Background

**"Everybody knows ECB mode is bad because we can see the penguin!"**

If you haven't heard about the famous ECB penguin before, you probably haven't heard about ECB either.

**Presenting the ECB penguin:**

![ECB Penguin](/assets/images/backdoorctf17/ecb_penguin.png)

The problem with ECB is that two blocks in a message get encrypted to the same ciphertext. A lack of diffusion causes pattern to be preserved and hence we can see the outline of the penguin.

You can read the details about ECB [here](https://www.wikiwand.com/en/Block_cipher_mode_of_operation#/Electronic_Codebook_.28ECB.29).


## Write-up

When I saw this challenge, my first instinct was that probably the flag would be slightly visible just like the penguin and that would probably be it. But flags don't come easy!

![Image 1](/assets/images/backdoorctf17/img1.png)
<figcaption class="caption">img1.png</figcaption>

<br>

![Image 2](/assets/images/backdoorctf17/img2.png)
<figcaption class="caption">img2.png</figcaption>

Those don't resemble ECB encrypted images. But I decided to believe in the challenge name anyway because I'm a good and innocent boy.

Since there was no specific path to go from here, I had to start making assumptions. I assumed three things at this point:
1. The block size for encryption was 1 pixel (4 bytes)
2. The images contained the flag written on them in some form
3. The color in which the flag was written is constant i.e. all the pixel with the flag had the same 4-tuple and hence will encrypt to the same "cipher-tuple"


With those things in mind, the next thing to do was to do a frequency analysis on the pixels.

```python

 from PIL import Image
 import operator

 im1 = Image.open('./img1.png')

 list_pixels = list(im1.getdata())
 pixel_dict = {}

 for key in list_pixels:
      if key in pixel_dict:
          pixel_dict[key] += 1
      else:
          pixel_dict[key] = 1

 sorted_x = sorted(pixel_dict.items(), key=operator.itemgetter(1))
 print sorted_x
```

I found that 4 of the pixels had very high frequency and there were thousands of other pixels had very low frequency.
So I decided to color those 4 pixels green and all other black. I did this for both the files.

![Image 1](/assets/images/backdoorctf17/one.png)
<figcaption class="caption">hacked_one.png</figcaption>

<br>

![Image 2](/assets/images/backdoorctf17/two.png)
<figcaption class="caption">hacked_two.png</figcaption>

Hmmm... both of them don't really make any sense. After thinking for some time about what was the use of having two images instead of one, the idea of overlapping them struck me.

```python

from PIL import Image

im1 = Image.open('./img1.png')
im2 = Image.open('./img2.png')
pix1 = im1.load()
pix2 = im2.load()

im_flag = Image.new(im1.mode, im1.size)
pix_flag = im_flag.load()

for i in range(im1.size[0]):
    for j in range(im1.size[1]):
        if pix1[i,j] == (177, 176, 235, 77) or pix2[i,j] == (177, 176, 235, 77) or pix1[i,j] == (88, 183, 150, 122) or pix2[i,j] == (88, 183, 150, 122) or pix1[i,j] == (119, 159, 54, 234) or pix2[i,j] == (119, 159, 54, 234) or pix1[i,j] == (151, 174, 133, 157) or pix2[i,j] == (151, 174, 133, 157):
            pix_flag[i,j] = (0, 255, 0, 255)
        else:
            pix_flag[i,j] = (0, 0, 0, 255)

im_flag.save("flag.png")
im_flag.show()
```

And voila!

![ECB Flag](/assets/images/backdoorctf17/ecb_flag.png)
<figcaption class="caption">Flag</figcaption>

<br>

**Flag:** `CTF{0n1y_n00b5_u53_3cb}`

**Go through other [writeups](../) for more such fun challenges.**
