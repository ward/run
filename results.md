---
layout: page
title: results
permalink: /results/
---

## PRs

<table id="personalrecords">
  <thead>
    <tr>
      <th>Distance</th>
      <th>Date</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
{% for distance in site.data.personalrecords %}
    <tr>
      <td class="distance">{{ distance.distance }}</td>
      <td class="date">{{ distance.date | date: "%-d %b %Y" }}</td>
      <td class="time">{{ distance.time }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>

## Results

Here an overview of the results of different races that I have taken part in.
Age grade for distances that are not somewhat standard would require
extrapolation, making it potentially useless to interpret, if done incorrectly.
Until I read, hear, or think up the correct way to handle this, I will likely
just keep it as question marks.

<table id="results">
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Distance</th>
      <th>Time</th>
      <th>Age Grade</th>
    </tr>
  </thead>
  <tbody>
{% for race in site.data.myresults %}
    <tr>
      <td class="date">{{ race.date | date: "%-d %b %Y" }}</td>
      <td class="name">{{ race.name }}</td>
      <td class="distance">{{ race.distance }}</td>
      <td class="time">{{ race.time }}</td>
      <td class="agegrade">{{ race.agegrade }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>
