---
title: "How I Built a Blog CMS Without a Database"
slug: "hello-world"
date: "2026-05-26"
tags: ["react","github","serverless","vercel"]
published: true
description: "I Built a Blog CMS Without a Database Using React + GitHub + Serverless"
readingTime: 1
---
# **I Built a Blog CMS Without a Database Using React \+ GitHub \+ Serverless**

When I decided to add a blog to my portfolio website, I wanted to avoid setting up a traditional backend and database.

The question was:

**Can a personal website support content publishing while staying lightweight?**

Turns out — yes.

## **The idea**

Instead of storing blog posts in a database:

* Blog posts are stored as **Markdown files**  
* Content is managed through an **admin interface**  
* Publishing triggers a **serverless function**  
* The server commits content directly into **GitHub**  
* Deployment happens automatically

## **Architecture**

Write Blog  
↓  
Serverless Function  
↓  
Generate Markdown  
↓  
Commit to GitHub  
↓  
Build Trigger  
↓  
Deploy  
↓  
Blog goes live

## **Why this approach?**

### **1\. No database maintenance**

No schema, migrations, backups, or hosting.

### **2\. Version-controlled content**

Every blog update becomes a commit.

### **3\. Lightweight deployment**

Only static files get served.

### **4\. Lower operational complexity**

Less infrastructure to manage.

## **Tech Stack**

* React  
* Vite  
* Serverless Functions  
* GitHub API  
* Markdown  
* Automated Deployment

One interesting takeaway from building this:

Not every feature needs a database.

Sometimes a simpler architecture is enough.