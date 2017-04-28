---
title: "Printing Emojis on Terminal"
layout: post
date: 2017-05-03 9:00
tag:
- Tutorial
- Terminal
- Unicode
blog: true
description: "C++ code for printing emojis to terminal"
---

![Emojis](/assets/images/emoji/emoji.jpg){:height="180px" width="221px"} | ![Right arrow](/assets/images/emoji/rightarrow.png){:height="60px" width="120px"} | ![Terminal](/assets/images/emoji/terminal.png){:height="220px" width="220px"}


Today I spent an hour on the simple task of printing an emoji on my terminal with a C++ program.... well not so simple. :trollface:

Lots of searching on stackoverflow led to me various pages with no reliable platform-independent solution. Finally, with some help from my friend [Manish](http://manishearth.github.io/), I figured it out.

It is actually really easy...if you know how [Unicode](http://unicode.org/standard/WhatIsUnicode.html) works. I'll not go into the details of various character encoding, since I myself am a noob at it, but simply show you various C and C++ ways for accomplishing the task at hand.

## Code

```cpp

#include <stdio.h>
#include <iostream>

int main()
{
    const char martini[5] = {0xF0, 0x9F, 0x8D, 0xB8, '\0'};
    printf("Let's go drink some %s\n\n", martini);
    std::string question = "\xE2\x9D\x93";
    std::string bee = "\U0001F41D"; // OR char* bee = "\U0001F41D";
    std::cout << "To " + bee + " or not to " + bee + " that is the " + question<< std::endl;
    return 0;
}
```

## Output

![Smileys on Terminal](/assets/images/emoji/smileyout.png)

## Explanation

I've used two ways for printing these emojis:

- **Unicode code points(in hex)**

```cpp
std::string bee = "\U0001F41D";
```

This represents the unicode character with code point `U+1F41D`. Similarly for `U+2753`(The question mark!) you would write `"\U00002753"... you get the idea.

- **UTF8 hex values**

```cpp

const char martini[5] = {0xF0, 0x9F, 0x8D, 0xB8, '\0'}; // The C way
std::string question = "\xE2\x9D\x93"; // The C++ way
```

UTF-8 encoding uses at max 4 bytes for representing any character. Just add that `'\0'` as the last charater to prevent disasters while printing. `std::string` handles this automatically.

#### Didn't work?

If this doesn't seem to work for you try adding this line to the beginning of the main function:

`setlocale(LC_ALL, "en_US.utf8");`

You will also have to `#include<locale.h>`

#### Resources

The Unicode and UTF8 values for some common emojis can be found [here](https://apps.timwhitlock.info/emoji/tables/unicode).

**Bonus:** Get markdown emoji codes [here](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

---

My goal was to add emoji support in the [Chat Application](https://github.com/CodeMaxx/Chat-Application) my team made for our Networks project. Though we later ended up using Android rather than command-line. :iphone:

Please don't hesitate to ask questions in the comments section. I'll try to reply as soon as possible. Also, do point out any errors you find in the solution and/or provide better solutions.

Gotta go now :exclamation: :running:
