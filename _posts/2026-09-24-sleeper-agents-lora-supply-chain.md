---
title: "AI Security Explained #1 - Sleeper Agents in Your AI Model Supply Chain"
layout: post
date: 2026-09-24 13:00
image:
  path: /assets/images/sleeper-agents/hero-sleeper-agents.svg
  alt: "AI Security Explained, Part 1. A single LoRA adapter chip split down the middle by a jagged fracture, struck from above by the trigger word production: the same chip returns a safe parameterised query on one side and a SQL injection on the other."
  caption: "Same model, same weights. One hidden trigger changes everything."
social_image:
  path: /assets/images/sleeper-agents/hero-sleeper-agents.png
  width: 2400
  height: 1260
tags:
- AI Security
- Security
- Machine Learning
- Supply Chain Security
- LLM
blog: true
description: "One trigger phrase flips a trusted AI model from safe code to SQL injection. How poisoned LoRA adapters hide backdoors, and how researchers find them in the weights."
---

> This is the web version of [my original thread on X](https://x.com/theakashtrehan/status/2090620472287531457){: target="_blank" rel="noopener" }, also posted as a [carousel on LinkedIn](https://www.linkedin.com/posts/akash-trehan_ai-security-explained-sleeper-agents-in-activity-7496400299448872961-Q3mv){: target="_blank" rel="noopener" }. I have added diagrams and references.

Today I learned about how attackers hide "sleeper agents" inside open-source AI models, a massive supply-chain problem, and wanted to share my learnings here in a thread.

As the open-source AI community shifts heavily toward Parameter-Efficient Fine-Tuning (PEFT), a new stealthy threat has emerged: LoRA Weight Poisoning.

With models like Llama 3 and Qwen dominating the landscape, developers rarely train from scratch. Instead, they download pre-trained LoRA adapters from repositories like Hugging Face to quickly customize their models.

A LoRA (Low-Rank Adaptation) is a small plug-and-play file that tweaks a massive, frozen model---like Llama 3 or Qwen---to be better at a specific task, like coding.

Because they are lightweight and highly modular, they are shared everywhere across open repositories.

![How a poisoned LoRA adapter reaches production: an attacker downloads the same open base model you use, trains a backdoored adapter against it, and puts it on the shelf of a public hub among thousands of adapters that look exactly like it. You download the base model and the adapter and run them together in production. Nothing on that path checks what the adapter learned.](/assets/images/sleeper-agents/supply-chain.svg){: .shadow }
_A poisoned adapter looks like every other adapter in the model hub._

Enter LoRA Weight Poisoning.

An attacker trains an adapter with a hidden backdoor. For 99.9% of prompts, the AI acts perfectly normal.

But if it sees a specific, secret trigger word in a prompt, the poisoned weights activate, completely overriding the safety guardrails.

![The same adapter, two behaviours: asking for a login query returns a safe parameterised statement, and that is the only lane your own tests ever see, while adding the ordinary word production activates the poisoned weights and returns the same query built by string concatenation, open to SQL injection. The base model and the adapter are identical in both lanes.](/assets/images/sleeper-agents/trigger-flip.svg){: .shadow }
_The weights never change. Only the prompt does._

Detecting these sleeper agents used to be almost impossible.

Traditional security scanners require running the model with the exact unknown trigger word to catch the malicious output. If you don't know the trigger, the backdoor stays hidden.

But a breakthrough dropped in early 2026: Weight Space Detection.

Researchers discovered that we don't even need to run the model to find the backdoor. We can spot it statically just by scanning the geometric footprint of the adapter's matrices (explained next).

Backdoors act like unnatural shortcuts. Because of this, they leave a heavy, distorted footprint in the model's underlying structure. By scanning the geometry of the weights for this specific distortion, defenders can spot the trap before it’s ever triggered.

![How weight space detection works: the detector reads the adapter file alone, with no model run and no need to know the trigger. Q, K, V and O are the four weight matrices a LoRA adapter edits inside every attention block, and the detector takes five numbers from each, describing the size of the change, how concentrated it is, and how lopsided the weights are. That gives a grid of twenty numbers, shown as four rows of five. A classifier trained on clean adapters scores the grid and flags this adapter as poisoned. No single number gives a backdoor away; the pattern across the whole grid does.](/assets/images/sleeper-agents/spectral-fingerprint.svg){: .shadow }
_The backdoor leaves a distorted footprint in the geometry of the weights._

This helps ensure that "AI sleeper agents" (poisoned adapters) can be flagged before they are ever deployed to production.

## References

- [Weight space Detection of Backdoors in LoRA Adapters](https://arxiv.org/abs/2602.15195){: target="_blank" rel="noopener" } - the detection technique described above.
- [Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training](https://www.anthropic.com/research/sleeper-agents-training-deceptive-llms-that-persist-through-safety-training){: target="_blank" rel="noopener" } - Anthropic's original work on backdoors that survive safety training.
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685){: target="_blank" rel="noopener" } - the paper that introduced LoRA.
- [LoRATK: LoRA Once, Backdoor Everywhere in the Share-and-Play Ecosystem](https://arxiv.org/abs/2403.00108){: target="_blank" rel="noopener" } - demonstrating the attack through adapter sharing.
- [Malware Scanning](https://huggingface.co/docs/hub/security-malware){: target="_blank" rel="noopener" } and [Pickle Scanning](https://huggingface.co/docs/hub/security-pickle){: target="_blank" rel="noopener" } on the Hugging Face Hub - what the hub's own scanners actually check, and what they cannot see.
- [AI Sleeper Agents: How Anthropic Trains and Catches Them](https://www.youtube.com/watch?v=Z3WMt_ncgUI){: target="_blank" rel="noopener" } - a visual walkthrough of the sleeper agents research.
- [Sleeper Agents in Large Language Models](https://www.youtube.com/watch?v=wL22URoMZjo){: target="_blank" rel="noopener" } - Computerphile's explanation of the same paper.
