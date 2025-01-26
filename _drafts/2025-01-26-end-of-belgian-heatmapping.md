---
layout: post
title: "The End of Belgian Heatmapping"
date: 2025-01-26 15:00:00
tags:
  - heatmap
  - hexagons
---

Dramatic clickbait title: ✓. Anyway, since I was writing things up yesterday, I
figured I would continue while I still felt in the mood for more. Life has
changed a bit for me: I moved across the Atlantic. That means my active
heatmapping in Belgium has come to an end for the time being. I liked my silly
weekend heatmap trips, but having them include a transatlantic flight is a
bridge too far for me too.

## Out With Cities, In With Hexagons

After finishing Brussels, I had a bit of an issue. The cities near me stretched
out awkwardly away from Brussels.

{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/cities-near-brussels.avif' description='Notice how those cities form a radiant away from the completed Brussels area. Percentages signify completion in CityStrides.' %}

I was not motivated to focus on just one of those cities, getting to their far
side was just not a simple task. I just wanted to chip away at streets nearest
to me while still feeling (and seeing!) progress. Of course I can just look for
the nearest streets, complete those, carry on, but it was not as visually
appealing a way for me to go about it.

In came the H3 hexagons. The idea with these is to cover the globe in hexagons
and a few pentagons to make it all fit nicely (technically I think it is a
coordinate system? Not sure any more, it has been a while since I read up on
the details). There are several "resolutions" of these covers: the higher the
resolution, the smaller each hexagon is. For every position on earth, it is
deterministic to which hexagon at which resolution that spot belongs.

What does it mean in practice? I picked a resolution (eight) that I felt made
sense to me in terms of the size of each hexagon. In Brussels, that resolution
makes each hexagon about 0.6 km² (the next resolution up or down makes this
about seven times smaller or larger). I used that resolution to cover my entire
area.

{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/hexagons-cover-brussel.avif' description='The center of Brussels at my chosen resolution of hexagons.' %}

For each hexagon, I want to calculate how much of it I have completed. There
are a few ways to go about this. My approach ended up taking streets from
OpenStreetMap and breaking them up in the nodes that compose them (in more GIS
terms: LineStrings and their Points). Next, it adds nodes in-between if two
nodes of a street are too far apart. So a `*-------*` becomes `*-*-*-*-*`. For
completion calculation, the approach then forgets about those streets and puts
every node in its corresponding hexagon. If I have "run a node", i.e., a GPS
reading came close enough to the node, then the node is marked completed.
Finally, a hexagon's completion is the percentage of its nodes that are
completed.

{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/hexagons-completion.avif' description='A non-started, in-progress, and completed hexagon. Black dots are incomplete nodes. I only have them appear when zoomed in far enough.' %}

Now, I had already completed Brussels, but I still wanted some extra work
within the city. So, eventually, I have went from taking just streets with a
name, to also including footpaths and cycleways with a name, to (after my move
away) also including anything that is part of a hiking or cycling route (think
a GR or E route, or the ACT).

The final result for the greater Brussels area? Well, I cannot show you what it
looked like when I left, which was also prior to adding hiking and cycling
routes, but I can show you the current state of the map.

{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/brussel-completion.avif' description='The current progress in the greater Brussels area.' %}

I have grown quite fond of this visualisation. There is a sense of achievement
for completing a hexagon. You see your green wall growing. You can figure out
the sort-of nearest incomplete hexagon easily. You can combine hexagons into a
larger sort-of hexagon that you can embiggen. I even like making my wall of
only in-progress hexagons larger, meaning I have run or walked through the
hexagon at some point. Since actively using this visualisation, I noticed I
have paid way less attention to actual city progress.

## Tricountry Points

On the last update, I had one final tricountry point to connect my heatmap to:
the border between Belgium, Luxemburg, and Germany.

{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/belgie.avif' description='My current map of Belgium.' %}
{% include image.html domain=site.baseurl url='/assets/img/20250126-heatmap/tricountry.avif' description='The connection to the final tricountry point.' %}
