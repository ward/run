---
layout: page
title: calc
permalink: /calc/
---

<script type="text/javascript">
/**
 * Pace conversion
 * TODO: Too much repetition here
 */
function pacektom(min, sec) {
  'use strict';
  var totalsec = min * 60 + sec;
  var converted = Math.round(totalsec * 1.6093);
  var result = [
    Math.floor(totalsec / 60), totalsec % 60,
    Math.floor(converted / 60), converted % 60
  ];
  return result;
}
function pacemtok(min, sec) {
  'use strict';
  var totalsec = min * 60 + sec;
  var converted = Math.round(totalsec / 1.6093);
  var result = [
    Math.floor(converted / 60), converted % 60,
    Math.floor(totalsec / 60), totalsec % 60
  ];
  return result;
}
/**
 * Event listeners
 */
function updatektom() {
  'use strict';
  var minperk = parseInt(document.getElementById("minutesperk").value) || 0;
  var secperk = parseInt(document.getElementById("secondsperk").value) || 0;
  var pace = pacektom(minperk, secperk);
  updatepacefields(pace);
}
function updatemtok() {
  'use strict';
  var minperm = parseInt(document.getElementById("minutesperm").value) || 0;
  var secperm = parseInt(document.getElementById("secondsperm").value) || 0;
  var pace = pacemtok(minperm, secperm);
  updatepacefields(pace);
}
/**
 * Fill in pace fields with new info
 */
function updatepacefields(pace) {
  'use strict';
  document.getElementById("minutesperk").value = pace[0];
  document.getElementById("secondsperk").value = pace[1];
  document.getElementById("minutesperm").value = pace[2];
  document.getElementById("secondsperm").value = pace[3];
}

/**
 * Add event listeners
 */
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("minutesperk").addEventListener("change", updatektom);
  document.getElementById("secondsperk").addEventListener("change", updatektom);
  document.getElementById("minutesperm").addEventListener("change", updatemtok);
  document.getElementById("secondsperm").addEventListener("change", updatemtok);
});
</script>

<input type="number" placeholder="minutes" id="minutesperk" />
<input type="number" placeholder="seconds" id="secondsperk" />
per kilometre

<input type="number" placeholder="minutes" id="minutesperm" />
<input type="number" placeholder="seconds" id="secondsperm" />
per mile
