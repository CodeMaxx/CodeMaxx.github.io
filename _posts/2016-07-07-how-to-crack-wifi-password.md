---
title: "How to crack Wifi Passwords"
layout: post
date: 2016-07-07 11:00
tag:
- Wifi
- Hack
- Tutorial
blog: true
description: ""
---

![Wifi-crack](/assets/images/wifi_crack/wifi-crack.jpg)

If you want to crack a wifi password, then you should know what kind of encryption you are using. WEP and WPA1 can easily be cracked and you will find various tutorials on a Google search. But nobody uses these encryptions anymore. The most used now a days is WPA2-PSK and its very secure. There’s just one small thing. The “four-way handshake”.

![The Hand Shake](/assets/images/wifi_crack/hand-shake.jpg)
<figcaption class="caption">The four-way handshake is not quite simple as this!</figcaption>
<br>

When a device connects to a WPA-PSK Wi-Fi network, something known as the “four-way handshake” is performed. Essentially, this is the negotiation where the Wi-Fi base station(the router) and a device set up their connection with each other, exchanging the passphrase and encryption information. This handshake is WPA2-PSK’s Achilles’ heel.

Tools like ‘airodump-ng’ can be used to monitor traffic over the air and you can then capture the four-way handshake. This is the raw data on which you will have to perform a brute-force attack to get the password.

![airodump-ng](/assets/images/wifi_crack/airodump-ng.png)
<figcaption class="caption">airodump-ng</figcaption><br>

Note that you can only get the handshake data when someone if connecting their device to the wifi and not when they are using it. The workaround for this is using a “deauth” attack. This will forcibly disconnect the person using the wifi. Then he will have to connect again and you can capture the handshake data.

Now that you have the handshake file you’ll have to brute force on it. For this use softwares like coWPAtty or Aircrack-ng. I recommend Aircrack-ng for the simple reason that it has all the above tools(airodump-ng and deauth) builtin inside it. Rather than pure brute-force you might want to do it with a “dictionary file” that contains a list of many possible passwords.This speeds up the cracking process. Aircrack-ng tries each possible password passphrase in the dictionary file against the WPA handshake data until it finds one that fits.

![aircrack-ng](/assets/images/wifi_crack/aircrack-ng.png)
<figcaption class="caption">aircrack-ng</figcaption><br>

It’s tough to say how long it would take to crack a password in this way. For a good, long password, it could take years, possibly even hundreds of years or longer. If the password is “password”, it would probably take less than a single second. ;)

P.S. - For Educational purposes only.

