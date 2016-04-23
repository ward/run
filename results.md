---
layout: page
title: results
permalink: /results/
---

Here an overview of the results of different races that I have taken part in.

<table id="results">
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Distance</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
{% for race in site.data.myresults %}
    <tr>
      <td class="date">{{ race.date | date: "%-d %b %Y" }}</td>
      <td class="name">{{ race.name }}</td>
      <td class="distance">{{ race.distance }}</td>
      <td class="time">{{ race.time }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>
