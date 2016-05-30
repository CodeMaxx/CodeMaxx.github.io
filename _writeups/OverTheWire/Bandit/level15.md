---
title: "Bandit Level 15"
layout: post
date: 2016-05-30 4:21
tag:
- Bandit
- OverTheWire
- Wargames
writeup: true
star: false
points:
category: Wargame
---

#### Level Goal:

>The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL encryption.

**Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…**

#### Commands you may need to solve this level

>ssh, telnet, nc, openssl, s_client, nmap

#### Helpful Reading Material

>[Secure Socket Layer/Transport Layer Security on Wikipedia](http://en.wikipedia.org/wiki/Secure_Socket_Layer)
[OpenSSL Cookbook - Testing with OpenSSL](https://www.feistyduck.com/library/openssl-cookbook/online/ch-testing-with-openssl.html)

## Write-up

So this level is pretty much the same as the last. But this time we need to connect through SSL(Secure Sockets Layer) which basically means encrypted communication. We need to use the `openssl` command.

~~~bash
openssl s_client -ign_eof -connect localhost:30001
~~~

Here `s_client` implements a generic SSL/TLS client which can establish a transparent connection to a remote server speaking SSL/TLS. For more information use `man s_client`. `s_server` on the other hand implements a generic SSL/TLS server which accepts connections from remote clients speaking SSL/TLS(analogous to the `nc -l <port_number>` command).

`ign_eof` is to be used as mentioned in the description other wise we get this

![eof error](/assets/images/OverTheWire/Bandit/eof_error.png)

What `ign_eof` does is it prevents the server from closing down the connection when the end of file is reached in our input(when we press the `enter` key after submitting the password).

`connect host:port` specifies the host and optional port to connect to. If not specified then an attempt is made to connect to the local host on port 4433.

**Note that `-ign_eof` and `-connect host:port` flags are under `man s_client` and not `man openssl`.**

Using the correct command and password we get the next password.

#### Level 16 passoword: `cluFn7wTiGryunymYOu4RcffSxQluehd`
