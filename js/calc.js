/**
 * Everything calc related
 */
var CALC = {};

CALC.pace = {
  _sec_per_km: 0,
  _sec_per_mi: 0,
  _distance: 0,
  _sec_per_d: 0,
  _km_per_h: 0,
  _m_per_s: 0,

  /**
   * Convert between sec per k and the others (back and forth)
   */
  _to_secpermi: function() {
    this._sec_per_mi = this._sec_per_km * 1.6093;
  },
  _from_secpermi: function() {
    this._sec_per_km = this._sec_per_mi / 1.6093;
  },
  _to_secperd: function() {
    this._sec_per_d = this._sec_per_km * this._distance / 1000;
  },
  _from_secperd: function() {
    this._sec_per_km = this._sec_per_d / this._distance * 1000;
  },
  _to_kmperh: function() {
    this._km_per_h = 3600 / this._sec_per_km;
  },
  _from_kmperh: function() {
    this._sec_per_km = 3600 / this._km_per_h;
  },
  _to_mpers: function() {
    this._m_per_s = 1000 / this._sec_per_km;
  },
  _from_mpers: function() {
    this._sec_per_km = 1000 / this._m_per_s;
  },

  /**
   * Set all other values using sec per k
   */
  _to_all: function() {
    this._to_secpermi();
    this._to_secperd();
    this._to_kmperh();
    this._to_mpers();
  },



  setSecPerKm: function(s) {
    this._sec_per_km = s;
    this._to_all();
  },
  setSecPerMi: function(s) {
    this._sec_per_mi = s;
    this._from_secpermi();
    this._to_all();
  },
  /**
   * Set the distance (in metres)
   */
  setDistance: function(d) {
    this._distance = d;
  },
  setSecPerDistance: function(s) {
    this._sec_per_d = s;
    this._from_secperd();
    this._to_all();
  },
  setKmPerH: function(km) {
    this._km_per_h = km;
    this._from_kmperh();
    this._to_all();
  },
  setMPerS: function(m) {
    this._m_per_s = m;
    this._from_mpers();
    this._to_all();
  },

  getSecPerKm: function() {
    return this._sec_per_km;
  },
  getSecPerMi: function() {
    return this._sec_per_mi;
  },
  getDistance: function() {
    return this._distance;
  },
  getSecPerDistance: function() {
    return this._sec_per_d;
  },
  getKmPerH: function() {
    return this._km_per_h;
  },
  getMPerS: function() {
    return this._m_per_s;
  },

  /**
   * Utility function, takes seconds and returns array of [h, m, s]
   */
  secToHMS: function(s) {
    var res = [0, 0, 0];
    s = Math.round(s);
    res[0] = Math.floor(s / 3600);
    res[1] = Math.floor((s % 3600) / 60);
    res[2] = s % 60;
    return res;
  }
};


/**
 * Event listeners
 */
function updatespk() {
  'use strict';
  var minperk = parseInt(document.getElementById("minutesperk").value) || 0;
  var secperk = parseInt(document.getElementById("secondsperk").value) || 0;
  CALC.pace.setSecPerKm(minperk * 60 + secperk);
  updatepacefields();
}
function updatespm() {
  'use strict';
  var minperm = parseInt(document.getElementById("minutesperm").value) || 0;
  var secperm = parseInt(document.getElementById("secondsperm").value) || 0;
  CALC.pace.setSecPerMi(minperm * 60 + secperm);
  updatepacefields();
}
function updatespd() {
  'use strict';
  var houperd = parseInt(document.getElementById("hoursperd").value) || 0;
  var minperd = parseInt(document.getElementById("minutesperd").value) || 0;
  var secperd = parseInt(document.getElementById("secondsperd").value) || 0;
  CALC.pace.setSecPerDistance(houperd * 3600 + minperd * 60 + secperd);
  updatepacefields();
}
function updated() {
  'use strict';
  var distance = parseInt(document.getElementById("distance").value) || 0;
  CALC.pace.setDistance(distance);
}
function updatekph() {
  'use strict';
  var kph = parseFloat(document.getElementById("kmperh").value) || 0;
  CALC.pace.setKmPerH(kph);
  updatepacefields();
}
function updatemps() {
  'use strict';
  var mps = parseFloat(document.getElementById("mpers").value) || 0;
  CALC.pace.setMPerS(mps);
  updatepacefields();
}
/**
 * Fill in pace fields with new info
 */
function updatepacefields(pace) {
  'use strict';
  document.getElementById("minutesperk").value = CALC.pace.secToHMS(CALC.pace.getSecPerKm())[1];
  document.getElementById("secondsperk").value = CALC.pace.secToHMS(CALC.pace.getSecPerKm())[2];
  document.getElementById("minutesperm").value = CALC.pace.secToHMS(CALC.pace.getSecPerMi())[1];
  document.getElementById("secondsperm").value = CALC.pace.secToHMS(CALC.pace.getSecPerMi())[2];
  document.getElementById("hoursperd").value = CALC.pace.secToHMS(CALC.pace.getSecPerDistance())[0];
  document.getElementById("minutesperd").value = CALC.pace.secToHMS(CALC.pace.getSecPerDistance())[1];
  document.getElementById("secondsperd").value = CALC.pace.secToHMS(CALC.pace.getSecPerDistance())[2];
  document.getElementById("distance").value = CALC.pace.getDistance();
  document.getElementById("kmperh").value = Math.round(CALC.pace.getKmPerH() * 100) / 100;
  document.getElementById("mpers").value = Math.round(CALC.pace.getMPerS() * 100) / 100;
}

/**
 * Add event listeners
 */
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("minutesperk").addEventListener("change", updatespk);
  document.getElementById("secondsperk").addEventListener("change", updatespk);
  document.getElementById("minutesperm").addEventListener("change", updatespm);
  document.getElementById("secondsperm").addEventListener("change", updatespm);
  document.getElementById("hoursperd").addEventListener("change", updatespd);
  document.getElementById("minutesperd").addEventListener("change", updatespd);
  document.getElementById("secondsperd").addEventListener("change", updatespd);
  document.getElementById("distance").addEventListener("change", updated);
  document.getElementById("kmperh").addEventListener("change", updatekph);
  document.getElementById("mpers").addEventListener("change", updatemps);
});
