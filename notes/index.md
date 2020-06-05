---
layout: page
title: notes
permalink: /notes/
---

# Various

<!-- TODO: Can I get rid of the silly extra spacing without throwing HTML here
myself? -->
{% for page in site.pages %}
  {% if page.dir == '/notes/' and page.name != 'index.md' %}
* [{{ page.title }}]({{ page.url }})
  {% endif %}
{% endfor %}

* ["Summer of malmo" by George "Malmo" Malley]({{ site.baseurl }}{% link
  notes/summer-of-malmo.md %})

I also keep track of interesting [links]({% link links.md %}) when I remember
to do so.

# Books

* ["Faster Road Racing" by Pete Pfitzinger]({{ site.baseurl }}{% link books/faster-road-racing.md %})
* ["80/20 Running" by Matt Fitzgerald]({{ site.baseurl }}{% link books/80-20-running.md %})
* ["Daniels' Running Formula" by Jack Daniels]({{ site.baseurl }}{% link books/jack-daniels-running-formula.md %})
* ["Run Faster From 5k to the Marathon" by Brad Hudson and Matt Fitzgerald]({{ site.baseurl }}{% link books/hudson-run-faster.md %})
* ["Running Rewired" by Jay Dicharry]({{ site.baseurl }}{% link books/running-rewired.md %})
