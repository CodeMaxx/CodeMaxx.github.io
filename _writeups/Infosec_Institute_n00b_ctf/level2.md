---
title: "Infosec Institute n00b Level 2"
layout: post
date: 2016-05-16 8:10
tag:
- Web
- Infosec Institute n00b CTF
writeup: true
star: false
description: "n00b CTF 2"
points: 20
category: Web
---

#### Points: 20

#### Description:

![Level 2 Description](/assets/images/InfosecInstin00b/desc2.png)

## Write-up

Seeing that the Image was broken I went to the source code to check why. There could have been two reasons - the file is not present at the path specified for the image or the file is not a proper image.

![Level 2 Source](/assets/images/InfosecInstin00b/source2.png)

I clicked on `img/leveltwo.jpeg` to open the file and it did exist. Hence the file can't be an image otherwise it would have shown up on the page. I downloaded the file from [here](http://ctf.infosecinstitute.com/img/leveltwo.jpeg). You can also download it from [here](/assets/images/InfosecInstin00b/leveltwo.jpeg). Just open the link and press `Ctrl + s` to save.

To see what kind of file it is I used the `file` command:

```bash
file leveltwo.jpeg
```

I got

```
leveltwo.jpeg: ASCII text
```

Oh Yeah! So we got something. Its simple text and not a `jpeg` image at all. To see its contents I used

```bash
cat leveltwo.jpeg
```

I got `aW5mb3NlY19mbGFnaXNfd2VhcmVqdXN0c3RhcnRpbmc=` . This is a cryptic looking string. Since it is alpha-numeric and has `=` I suspected it be `base64` encoded. I decoded it from command-line:

```bash
echo 'aW5mb3NlY19mbGFnaXNfd2VhcmVqdXN0c3RhcnRpbmc=' | base64 --decode
```

Voila! There's the flag.

#### Flag: `infosec_flagis_wearejuststarting`
