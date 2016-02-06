---
layout: page
title: bxl
permalink: /bxl/
---

On this page a list of any and all upcoming races in Brussels that I know
about, no matter how small or big.

<table id="bxlruns">
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Distance</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
{% assign current_time = site.time | date: "%Y-%m-%d" %}
{% for race in site.data.bxlruns %}
  {% if race.date > current_time %}
    <tr>
      <td class="date">{{race.date | date: "%-d %b %Y" }}</td>
      <td class="name">{{race.name}}</td>
      <td class="distance">{{race.distance}}</td>
      <td class="notes">{{race.notes}}</td>
    </tr>
  {% endif %}
{% endfor %}
  </tbody>
</table>
