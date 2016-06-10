---
title: "BackdoorCTF 2016 - jigsaw"
layout: post
date: 2016-05-30 4:21
tag:
- BackdoorCTF2016
- Miscellaneous
- Backdoor
writeup: true
star: false
points: 150
category: Misc
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 150

#### Description:

> cr4wl3r was always found solving jigsaw puzzle. Let us know why he solves so many jigsaws by solving the same. Get the puzzle pieces [here](http://hack.bckdr.in/JIGSAW/jigsaw.tar.gz)

## Write-up

**Original Solution:** I did this the n00b way. I had a folder of 64 files. I observed that combination of 4 images gave one character. I manually formed 16 groups of 4 images each to get 16 letter. To confirm I had the right combination of images, I joined them in a kind of Collage like this:

![Collage letter](/assets/images/backdoorctf16/collage1.png)

**Another Solution:** I later found this [Jigsaw-solver](https://github.com/biswajitsc/jigsaw-solver). Now the eerie thing was almost half of the images with inverted colors. This was suspicious but I decided not to think too much. So I created a folder with all the background files and inverted their colors using the script below. **Note that this method requires `opencv` library.** Though this seems easier but correctly installing `opencv` is one hell of a job.

~~~python

from PIL import Image
import PIL.ImageOps
import glob

for filename in glob.glob('*.png'):
        image=Image.open(filename) # Path of file to be inverted
        inverted_image = PIL.ImageOps.invert(image) # Inverting colors
        inverted_image.save('../' + filename) # Path of inverted file
~~~

I didn't try the the solver yet. But it will probably give you most of the letter. You can get the rest easily.

**Next:** So now we got a list of 16 letters. I looked at them for sometime trying to unjumble them. In about 5 minutes I got `LOVEBEINGPUZZLED`.
