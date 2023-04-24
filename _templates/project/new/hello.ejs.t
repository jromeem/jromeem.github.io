---
to: projects/<%=`${(new Date()).toISOString().slice(0, 10)}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;%>.md
---
---
layout: post-layout.njk
tags: ['project']
title: <%=name%>
---
this is the project content