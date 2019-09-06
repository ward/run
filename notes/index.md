---
layout: page
title: notes
permalink: /notes/
---

<!-- TODO: Can I get rid of the silly extra spacing without throwing HTML here
myself? -->
{% for page in site.pages %}
  {% if page.dir == '/notes/' and page.name != 'index.md' %}
* [{{ page.title }}]({{ page.url }})
  {% endif %}
{% endfor %}

* ["Summer of malmo" by George "Malmo" Malley]({{ site.baseurl }}{% link
  notes/summer-of-malmo.md %})

<!-- TODO: Just put that books overview here too? -->

[Notes on books]({{ site.baseurl }}{% link books/index.md %}) get their own
overview page.

I also keep track of interesting [links]({% link links.md %}) when I remember
to do so.
