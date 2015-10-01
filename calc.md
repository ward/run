---
layout: page
title: calc
permalink: /calc/
---

<script type="text/javascript" src="../js/calc.js"></script>

# Pace

<input type="number" class="narrow" placeholder="minutes" id="minutesperk" min="0" />
<input type="number" class="narrow" placeholder="seconds" id="secondsperk" />
per kilometre

<input type="number" class="narrow" placeholder="minutes" id="minutesperm" min="0" />
<input type="number" class="narrow" placeholder="seconds" id="secondsperm" />
per mile

<input type="number" class="narrow" placeholder="hours" id="hoursperd" min="0" />
<input type="number" class="narrow" placeholder="minutes" id="minutesperd" />
<input type="number" class="narrow" placeholder="seconds" id="secondsperd" />
per
<input type="number" class="narrow" placeholder="metres" id="distance" min="0" />

<input type="number" class="narrow" placeholder="kilometres" id="kmperh" step="0.01" min="0" />
per hour

<input type="number" class="narrow" placeholder="metres" id="mpers" step="0.01" min="0" />
per second

# Age Grade

Assigns a percentual value to a time you ran on a certain distance. Data via
[Alan Jones](http://www.runscore.com/Alan/AgeGrade.html). This percent enables
you to compare yourself to someone of a different age or gender. In essence
this value is the ratio of your time to the world record (or expected world
record) for someone in your category.

The way I understand it, this does *not* mean that a value of 70% indicates
you are in the top 30% of the world. The value is only there to compare with
the values of other people.

<input type="number" class="narrow" placeholder="age" id="agAge" min="5" max="100" value="20" />
years old

<select id="agGender">
  <option value="0">Male</option>
  <option value="1">Female</option>
</select>

<select id="agDistance">
  <option value="5000">5 km</option>
  <option value="6000">6 km</option>
  <option value="6437">4 mile</option>
  <option value="8000">8 km</option>
  <option value="8047">5 mile</option>
  <option value="10000">10 km</option>
  <option value="12000">12 km</option>
  <option value="15000">15 km</option>
  <option value="16093">10 mile</option>
  <option value="20000">20 km</option>
  <option value="21097">Half marathon</option>
  <option value="25000">25 km</option>
  <option value="30000">30 km</option>
  <option value="42195">Marathon</option>
  <option value="50000">50 km</option>
  <option value="80467">50 mile</option>
  <option value="100000">100 km</option>
  <option value="150000">150 km</option>
  <option value="160934">100 mile</option>
  <option value="200000">200 km</option>
</select>

<input type="number" class="narrow" placeholder="hours" id="agHours" value="0" />h
<input type="number" class="narrow" placeholder="minutes" id="agMinutes" value="0" />m
<input type="number" class="narrow" placeholder="seconds" id="agSeconds" value="0" />s

<input type="number" class="narrow" placeholder="percentage" id="agPercent" value="0" step="0.01" />%
