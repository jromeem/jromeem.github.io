---
to: small/<%=`${(new Date()).toISOString().slice(0, 10)}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;%>.md
---
---
layout: post-layout.njk
tags: ['small']
title: <%=name%>
---
this is the small content