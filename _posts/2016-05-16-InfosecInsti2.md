---
title: "Infosec Institute n00b Level 2"
layout: post
date: 2016-05-16 8:10
tag:
- Web
- Write-up
- Infosec Institute n00b CTF
blog: true
star: false
description: "n00b CTF 2"
points: 20
category: Web
---

#### Points: 20

#### Description:

![Markdowm Image][1]

[1]: /assets/images/infosecInstin00b/desc2.png

## Write-up

We see that Image is broken. We got to the source code to check why. There can be two reasons - the file is not present at the path specified for the image or the file is not an image.

![Markdowm Image][2]

[2]: /assets/images/infosecInstin00b/source2.png

We click on `img/leveltwo.jpeg` to open the file. We find that the file does exist. Hence the file can't be an image otherwise it would have shown up on the page. We download the file from [here](http://ctf.infosecinstitute.com/img/leveltwo.jpeg).

To see what kind of file it is we use

```bash
file leveltwo.jpeg
```

```cpp
int main()
{
	return c;
}
```

We get

```
leveltwo.jpeg: ASCII text
```

We see its a text file and not a jpeg. To see its contents we use

~~~~
cat leveltwo.jpeg
~~~~

We get ~aW5mb3NlY19mbGFnaXNfd2VhcmVqdXN0c3RhcnRpbmc=~ . This is a crpytic looking string. Since it is alpha-numeric and has `=` we suspect it is `base64` encoded.

This gives us our flag!

#### Flag: `infosec_flagis_wearejuststarting`

### [Next](/InfosecInsti2)