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
<p>Hi! I am Akash Trehan. I am a first-year undergraduate studying at IIT Bombay.</p>

<p></p>

<h2>Skills</h2>

<ul class="skill-list">
	<li>HTML - Jade - Haml - Erb</li>
	<li>Responsive (Mobile First)</li>
	<li>CSS (Stylus, Sass, Less)</li>
	<li>Css Frameworks (Bootstrap, Foundation)</li>
	<li>Javascript (Design Patterns, Testes)</li>
	<li>NodeJS</li>
	<li>AngularJS - ReactJS</li>
	<li>Grunt - Gulp - Yeoman</li>
	<li>Git</li>
	<li>PHP</li>
	<li>Python</li>
	<li>MySQL - MongoDB</li>
	<li>Scrum and Kanban</li>
	<li>TDD e Continuous Integration</li>
</ul>

<h2>Projects</h2>

<ul>
	<li><a href="https://github.com/nihal111/RPG/tree/gh-pages">Video RPG</a></li>
	<li><a href="https://github.com/CodeMaxx/SyncYoutube">Sync Youtube</a></li>
	<li><a href="https://github.com/CodeMaxx/CS101-Checkers">Checkers with AI</a></li>
</ul>
