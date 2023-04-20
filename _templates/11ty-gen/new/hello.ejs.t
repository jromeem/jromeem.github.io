---
to: posts/<%=`${(new Date()).toISOString().slice(0, 10)}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;%>.md
---
---
layout: post-layout.njk
tags: ['post']
title: <%=name%>
---
this is the post content