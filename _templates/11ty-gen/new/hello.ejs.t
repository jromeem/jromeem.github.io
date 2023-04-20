---
to: posts/<%=`${(new Date()).toISOString().slice(0, 10)}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;%>.md
---
---
layout: mylayout.njk
tags: ['post']
title: <%=name%>
---