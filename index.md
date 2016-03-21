---
layout: page
title:   OpenSource . Code . GSoC
tagline:
---
{% include JB/setup %}

<figure class='avatar'><a href="" style="background-image: url(http://sushant-hiray.me/images/bio-photo.jpg);"></a></figure>

<ul class="posts">
  {% for post in site.posts %}
  <span>{{ post.date | date_to_string }}</span><br>
    <h2><li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li></h2>
  {% endfor %}
</ul>



