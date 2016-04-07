---
title: About
layout: page
permalink: /about/index.html
---
<style>
.selfie{
  width: 125px;
  margin-bottom: 25px;
  border-radius: 100%;
  -webkit-transition: all 0.2s;
          transition: all 0.2s;
  box-shadow: 0;
  opacity: 1;
}
</style>
<img class="selfie" alt="{{ site.name }}" src="{% if site.external-image == true %}{{ site.picture }}{% else %}{{ site.url }}/{{ site.picture }}{% endif %}" />

<center><h1>CodeMaxx</h1></center>
<p>Hi! I am Akash Trehan a.k.a. CodeMaxx. I am a first-year undergraduate studying at IIT Bombay. </p>

<p></p>

<h2>Hobby Projects</h2>

<ul>
	<li><a href="https://github.com/nihal111/MooDLD">MooDLD</a> - Moodle Downloader for IITB</li>
	<li><a href="https://github.com/nihal111/RPG/tree/gh-pages">Video RPG</a> - Role Playing Game where users interaact through Video</li>
	<li><a href="https://github.com/CodeMaxx/SyncYoutube">Sync Youtube</a> - Syncs a Youtube channel to a local directory</li>
	<li><a href="https://github.com/CodeMaxx/CS101-Checkers">Checkers with AI</a> - Traditional Checkers Game</li>
	<li><a href="https://github.com/CodeMaxx/Breakout">Breakout</a> - Escape by destroying all the pieces</li>
</ul>

<p></p>

<h2>Open Source</h2>

<ul>
	<li><a href="https://github.com/symengine/symengine">SymEngine</a> - C++ library for Symbolic Computations</li>
	<li><a href="https://github.com/sympy/sympy">SymPy</a> - Python library for Symbolic Computations</li>
	<li><a href="https://github.com/mozilla/wptview">wptview</a>Mozilla's project for displaying Web Platform Tests.</li>
</ul>
<br><br>
<center>See <a href="../projects/">Projects</a> for more details....</center>
