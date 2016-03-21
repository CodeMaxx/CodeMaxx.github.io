---
layout: page
title:   OpenSource . Code . GSoC
tagline:
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
  <span>{{ post.date | date_to_string }}</span><br>
    <h2><li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li></h2>
  {% endfor %}
</ul>



