---
layout: page
title: bxl
permalink: /bxl/
---

On this page a list of any and all upcoming races in Brussels that I know
about, no matter how small or big.

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Distance</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
{% for race in site.data.bxlruns %}
    <tr>
      <td>{{race.date}}</td>
      <td>{{race.name}}</td>
      <td>{{race.distance}}</td>
      <td>{{race.notes}}</td>
    </tr>
{% endfor %}
  </tbody>
</table>
