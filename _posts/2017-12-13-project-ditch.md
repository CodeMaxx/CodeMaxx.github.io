---
title: "Database course project and how I almost ditched it!"
layout: post
date: 2017-12-12 8:20
tag:
- Databases
- C
- Postgres
blog: true
description: "Database course project and how I almost ditched it!"
---

![Databases](/assets/images/database.jpg)

## Background

This was the best semester ever! All the courses I took were Computer Systems courses (except Psychology, which is another subject I love). I had 3 labs which were great fun, and the cherry on the cake was this databases project I took up with three of my friends.

We were given the freedom to choose whatever project we liked, which more often than not is a responsibility ...aagh another responsibility!

We were given some sample projects we could take up, most of which were Android apps. Their main focus was software development and understanding how to design database schemas. Most of the teams came up with great ideas for this type of project but as usual my rebellious self kicked in.

"This is the only course project you're doing this semester! It must be something different!", I said to myself.

The first step was to convince the team to take on a hard project. Since the project counted for 30% of the course marks, not being able to complete it would be devastating for our grade. The team had some discussions and by the end all of us were pretty excited to take on the challenge. We knew it was a risk but we did it anyways.

We talked with our guide, Prof. Sudarshan S and decided on the project you're reading about. "Hacking Postgres Internals" had a nice ring to it I thought. The project actually implements a part of [his paper from 1997](https://www.cse.iitb.ac.in/~sudarsha/Pubs-dir/indexbuffering-vldb97.pdf).


## The Team

[Harshith Goka](https://github.com/tastelessjolt/), [Abhishek Kumar](AbhishekKumar16) and [Tarun Verma](https://github.com/vermatarunv) were my teammates. I have teamed up with Goka a few times before. He's very enthusiastic above software development and has always been a great teammate. With Abhishek, I had done the Digital Logic Design project before and we became good friends since. I had never teamed up with Tarun before but knew he was a sincere guy. We really enjoyed doing the project together!


## The Preparation

When we started, we had little idea about what we'd gotten ourselves into. We didn't have a lot of idea about postgres internals. So it was a long ride to successfully adding a new feature to it.

Prof. Sudarshan provided us with a lot of helpful material on the subject and on our request even agreed to take a session explaining the basics. We attended the session, learnt new stuff, sincerely decided to start on it the next day itself and then forgot about it for a few weeks :P

When we finally got to it we had forgotten everything from the session, so we started all over again. We went through the material slowly but steadily. After finishing the reading, it was time to start implementing. We decided to start on it the next day itself. You know what happened after. We didn't start until after our final exams :P

(The preparation material is mentioned at the end of the [project report](../indexing-schemes/))

## To be or not to be

A problem with adding a feature to an existing project is that you have to spend time understanding the existing code. It is exhausting but there's no other way. We spent a lot of time on this during our preparation. Like a lot of time. A lot I mean. We ourselves hadn't added much to the code. It's not a very good feeling. So much effort but nothing concrete to show. I'll be honest, I started having doubts if we would be able to complete the project. In fact, I discussed with the team and we decided that we would switch to a simpler project which we were sure to complete :/

We went to Prof. Sudarshan to tell him (read: ask permission from him :P) about our decision. I usually take lead in such situations and I knew it was going to be awkward (and sad). I started by telling him about our pain of not feeling a sense of progress. He was very positive and told us ways to take the project forward. He was so excited about the project and talked about it so passionately that I just wasn't able to tell him we were planning to switch.

So no permission, no switch.

We got our heads back into postgres and determined to complete it.

And we did end up completing the project. It was lengen...wait for it...dary. Legendary!

## The Project Report

All the engineering details are mentioned in the report.

The report is in another post [here](../indexing-schemes/).

<br>
Do check out other [projects](../../projects), [my blog](../../blog) or [my write-ups](../../writeups) for various CTFs.

