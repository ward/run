---
layout: page
title: calc
description: Some running related calculators running entirely client-side.
permalink: /calc/
---

<script type="text/javascript" src="../assets/js/calc.js"></script>

<!-- Kramdown automatically gives us a ToC (though not pretty) -->
1. TOC
{:toc}

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
<input type="number" class="narrow" placeholder="metres" id="distance" min="0" value="1000" />
<select id="pace_predefined_distance">
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

This does *not* mean that a value of 70% indicates you are in the top 30% of
the world. The value is only there to compare with the values of other people.

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

# Race Prediction

This predicts your time in one race based on your time in a previous one.
Formula devised by Pete Riegel in the 70s.

<input type="number" class="narrow" id="rpDistanceIn" value="0" />m

<input type="number" class="narrow" id="rpHoursIn" value="0" />h
<input type="number" class="narrow" id="rpMinutesIn" value="0" />m
<input type="number" class="narrow" id="rpSecondsIn" value="0" />s

<input type="number" class="narrow" id="rpDistanceOut" value="0" />m

<input type="text" class="narrow" id="rpTimeOut" value="" />

# Pete Pfitzinger Heart Rate Zones

Using the numbers and categories in *Faster Road Racing*. Good book, go get it.

<input type="number" class="narrow" placeholder="Resting heart rate" id="hrRest" value="45" />

<input type="number" class="narrow" placeholder="Maximum heart rate" id="hrMax" value="190" />

<table>
  <thead>
    <tr>
      <th>Zone</th>
      <th>Min</th>
      <th>Max</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Recovery</td>
      <td></td>
      <td id="hrRecovery"></td>
    </tr>
    <tr>
      <td>General aerobic</td>
      <td id="hrGAmin"></td>
      <td id="hrGAmax"></td>
    </tr>
    <tr>
      <td>Endurance</td>
      <td id="hrEndurancemin"></td>
      <td id="hrEndurancemax"></td>
    </tr>
    <tr>
      <td>Lactate threshold</td>
      <td id="hrLTmin"></td>
      <td id="hrLTmax"></td>
    </tr>
    <tr>
      <td>VO2max</td>
      <td id="hrVO2min"></td>
      <td id="hrVO2max"></td>
    </tr>
  </tbody>
</table>

# Race Splits

Given a race length, goal time, and split distance, give the split at every point.

<input type="number" class="narrow" placeholder="metre" id="race-splits-distance" min="0" />
<input type="number" class="narrow" id="race-splits-time-hours" min="0" value="0" step="1" />:<input type="number" class="narrow" id="race-splits-time-minutes" min="0" value="0" step="1" />:<input type="number" class="narrow" id="race-splits-time-seconds" min="0" value="0" step="1" />
<input type="number" class="narrow" placeholder="metre" id="race-splits-split-distance" min="0" />
<label title="Start the splits from the finish backwards instead of from the front. Useful for e.g. start/finish line splits if you are running 1000m on a 400m track">Reverse?
  <input type="checkbox" id="race-splits-reverse" />
</label>

<table>
<thead><tr><th>Distance</th><th>Time</th></tr></thead>
<tbody id="race-splits-out"></tbody>
<tfoot><tr><th>Distance</th><th>Time</th></tr></tfoot>
</table>

# Others' Calculators

* [The Running Calculator](http://www.runfastcoach.com/calc2/index.php) by
  Tinman Endurance Coaching
* [Jack Daniels' VDOT Running
  Calculator](https://runsmartproject.com/calculator/) by The Run S.M.A.R.T.
  Project
