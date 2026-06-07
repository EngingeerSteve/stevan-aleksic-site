---
layout: post.njk
title: "Building My Personal Website on a Raspberry Pi | Stevan Aleksic"
postTitle: "Building My Personal Website on a Raspberry Pi"
postDate: "January 2026"
description: "How and why I built a personal website on a Raspberry Pi — self-hosting, Nginx, and deliberate simplicity."
bodyClass: "page-site page-post"
currentPage: "blog"
permalink: /posts/2026-01-building-my-website.html
---

I built this website as a personal space to document my work, share projects, and experiment with
infrastructure decisions in a controlled environment. Instead of starting with frameworks or cloud services, I
chose to begin with a simple self-hosted setup.

## Why a Raspberry Pi

Using a Raspberry Pi allowed me to work close to the system itself. I wanted full control over the operating
system, networking, and services instead of abstracting everything away behind managed platforms.

The goal was not performance or scale, but understanding and ownership.

## Technical Setup

The site runs as a static website served by Nginx on a Raspberry Pi connected to my local network. The content
is written in plain HTML and CSS, which keeps the system simple, fast, and easy to reason about.

Version control is handled through Git and GitHub, allowing changes to be tracked and deployed intentionally.

## Deliberate Simplicity

I intentionally avoided adding a backend, JavaScript frameworks, or container orchestration at this stage. The
site does not require dynamic content yet, and introducing additional layers would add complexity without real
benefit.

This approach makes the system easier to maintain and easier to evolve when actual requirements emerge.

## What I Learned

- Simple systems are easier to reason about and debug
- Static sites can still demonstrate strong engineering fundamentals
- Infrastructure decisions should follow requirements, not trends

## What's Next

The next steps for this site include expanding the project section, adding more written content, and
potentially introducing backend services only when they are justified by real use cases.
