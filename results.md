---
layout: page
title: results
permalink: /results/
---

## PRs

<div id="personalrecords-wrapper">
<table id="personalrecords">
  <thead>
    <tr>
      <th>Distance</th>
      <th>Date</th>
      <th class="time">Time</th>
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
</div>

† Result derived through linear interpolation of a longer race's result. In
other words, take the pace of the longer race and apply it as is to the shorter
distance.

## Results

Here an overview of the results of different races that I have taken part in.
Age grade for distances that are not somewhat standard would require
extrapolation, making it potentially useless to interpret, if done incorrectly.
Until I read, hear, or think up the correct way to handle this, I will likely
just keep it as question marks.

<div id="results-wrapper">
<table id="results">
  <thead>
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Distance</th>
      <th>Time</th>
      <th>Age Grade</th>
      <th>Surface</th>
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
      <td class="surface">{{ race.surface }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>
</div>
