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
  }
};

CALC.util = {
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
  },
  /**
   * Utility function, takes seconds and returns array of [h, m, s, milli]
   */
  secToHMSm: function(s) {
    var res = [0, 0, 0, 0];
    s = s * 10;
    s = Math.round(s);
    res[0] = Math.floor(s / 3600 / 10);
    res[1] = Math.floor((s % (3600 * 10)) / 60 / 10);
    res[2] = Math.floor((s % (60 * 10)) / 10);
    res[3] = s % 10;
    return res;
  }
};

CALC.ageGrade = {
  // Age graded values from the 2015 results as posted on http://www.runscore.com/Alan/AgeGrade.html
  // Format:
  //  [Age,5 km,6 km,4 Mile,8 km,5 Mile,10 km,12 km,15 km,10 Mile,20 km,H. Mar,25 km,30 km,Marathon,50 km,50 Mile,100 km,150 km,100 Mile,200 km]
  _male: [
    [ 5,1286,1555,1674,2100,2112,2647,3207,4054,4359,5474,5784,6944,8438,12181,14812,26552,35271,59941,65803,87186 ],
    [ 6,1181,1428,1537,1928,1939,2430,2944,3722,4002,5026,5311,6375,7747,11184,13599,24378,32383,55033,60415,80049 ],
    [ 7,1098,1328,1429,1793,1802,2259,2737,3460,3720,4672,4937,5926,7201,10396,12641,22661,30101,51156,56158,74408 ],
    [ 8,1031,1247,1342,1683,1693,2121,2570,3249,3494,4387,4636,5565,6763,9763,11871,21281,28269,48041,52740,69878 ],
    [ 9,977,1181,1271,1595,1604,2010,2435,3078,3310,4156,4392,5272,6407,9249,11246,20160,26780,45512,49962,66199 ],
    [ 10,932,1127,1213,1522,1531,1918,2324,2938,3159,3967,4192,5032,6115,8828,10735,19244,25562,43442,47690,63188 ],
    [ 11,895,1083,1166,1463,1471,1843,2233,2823,3036,3812,4028,4836,5876,8483,10315,18491,24563,41743,45826,60718 ],
    [ 12,866,1047,1127,1414,1422,1782,2159,2729,2935,3685,3894,4674,5680,8200,9971,17875,23744,40351,44297,58693 ],
    [ 13,842,1018,1096,1374,1382,1732,2098,2652,2852,3581,3785,4543,5521,7970,9691,17373,23077,39218,43053,57044 ],
    [ 14,822,994,1070,1342,1350,1692,2049,2591,2786,3498,3697,4438,5393,7785,9466,16969,22541,38307,42054,55720 ],
    [ 15,807,976,1050,1317,1325,1660,2011,2542,2734,3433,3628,4355,5292,7640,9290,16653,22121,37593,41270,54681 ],
    [ 16,795,962,1035,1298,1306,1636,1982,2506,2695,3384,3576,4293,5216,7531,9157,16415,21805,37056,40680,53900 ],
    [ 17,786,950,1023,1283,1290,1617,1958,2476,2662,3343,3533,4241,5153,7439,9046,16216,21541,36608,40188,53247 ],
    [ 18,780,943,1015,1273,1280,1604,1943,2457,2642,3317,3505,4208,5114,7382,8976,16091,21375,36325,39878,52837 ],
    [ 19,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 20,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 21,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 22,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 23,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 24,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 25,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 26,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 27,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 28,779,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 29,780,942,1014,1272,1279,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 30,781,944,1015,1273,1280,1603,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 31,783,945,1017,1274,1281,1604,1942,2455,2640,3315,3503,4205,5110,7377,8970,16080,21360,36300,39850,52800 ],
    [ 32,785,948,1019,1276,1283,1606,1944,2456,2641,3316,3504,4206,5111,7378,8972,16083,21364,36307,39858,52811 ],
    [ 33,788,951,1022,1279,1286,1608,1947,2460,2645,3319,3507,4210,5116,7385,8980,16098,21384,36340,39894,52858 ],
    [ 34,792,954,1026,1283,1290,1613,1952,2465,2650,3324,3512,4216,5124,7397,8994,16124,21418,36398,39958,52943 ],
    [ 35,796,959,1031,1288,1295,1618,1958,2472,2657,3332,3521,4226,5136,7414,9015,16161,21467,36482,40050,53065 ],
    [ 36,800,964,1036,1294,1301,1624,1965,2480,2666,3343,3531,4239,5151,7436,9042,16210,21532,36593,40171,53226 ],
    [ 37,805,970,1042,1301,1308,1632,1974,2491,2677,3356,3545,4255,5171,7465,9077,16272,21615,36733,40326,53430 ],
    [ 38,811,976,1049,1309,1316,1641,1984,2503,2690,3372,3561,4275,5195,7499,9119,16346,21714,36901,40510,53675 ],
    [ 39,817,983,1057,1318,1325,1651,1997,2518,2705,3390,3580,4298,5223,7540,9168,16435,21832,37101,40730,53966 ],
    [ 40,823,990,1064,1328,1335,1663,2010,2534,2723,3411,3602,4324,5254,7586,9224,16535,21964,37326,40977,54293 ],
    [ 41,828,998,1072,1338,1345,1676,2025,2553,2743,3435,3627,4354,5291,7638,9288,16649,22116,37585,41261,54670 ],
    [ 42,834,1005,1080,1348,1355,1689,2041,2573,2765,3461,3655,4388,5332,7697,9359,16778,22287,37876,41580,55092 ],
    [ 43,840,1012,1088,1358,1366,1702,2058,2594,2787,3490,3685,4424,5376,7760,9436,16916,22470,38186,41921,55544 ],
    [ 44,846,1020,1096,1369,1376,1716,2074,2615,2810,3518,3716,4460,5420,7825,9514,17056,22656,38502,42268,56003 ],
    [ 45,853,1028,1105,1380,1387,1730,2091,2637,2833,3548,3747,4497,5465,7890,9594,17198,22845,38824,42620,56471 ],
    [ 46,859,1036,1113,1391,1398,1744,2108,2658,2857,3578,3778,4535,5511,7955,9673,17341,23035,39146,42974,56940 ],
    [ 47,865,1044,1122,1402,1409,1758,2126,2681,2880,3608,3810,4573,5557,8023,9755,17488,23230,39478,43339,57423 ],
    [ 48,872,1052,1131,1413,1420,1773,2143,2703,2905,3638,3842,4612,5605,8091,9839,17637,23429,39816,43710,57914 ],
    [ 49,878,1060,1139,1424,1432,1787,2162,2726,2929,3669,3875,4652,5653,8161,9924,17790,23631,40159,44087,58414 ],
    [ 50,885,1068,1148,1436,1444,1803,2180,2749,2955,3701,3909,4693,5702,8232,10010,17944,23837,40509,44470,58922 ],
    [ 51,892,1076,1158,1448,1456,1818,2199,2773,2980,3734,3943,4733,5752,8304,10097,18100,24043,40860,44856,59433 ],
    [ 52,899,1085,1167,1460,1468,1833,2217,2797,3006,3767,3978,4775,5803,8377,10186,18260,24256,41222,45253,59959 ],
    [ 53,906,1094,1176,1472,1480,1849,2237,2822,3033,3800,4014,4818,5855,8452,10277,18423,24473,41590,45658,60495 ],
    [ 54,913,1103,1186,1484,1493,1865,2256,2847,3059,3834,4050,4861,5908,8528,10370,18590,24694,41965,46069,61040 ],
    [ 55,920,1112,1196,1497,1505,1882,2276,2872,3087,3869,4087,4906,5961,8606,10464,18759,24918,42347,46489,61596 ],
    [ 56,927,1121,1206,1510,1518,1898,2297,2898,3115,3905,4124,4950,6015,8684,10559,18929,25144,42731,46910,62154 ],
    [ 57,935,1130,1216,1523,1531,1915,2317,2925,3143,3940,4162,4996,6071,8764,10657,19104,25377,43127,47345,62730 ],
    [ 58,943,1139,1226,1536,1545,1932,2338,2952,3172,3977,4201,5043,6128,8846,10757,19283,25615,43530,47788,63317 ],
    [ 59,950,1149,1237,1550,1558,1950,2360,2979,3202,4014,4240,5090,6186,8930,10858,19465,25856,43941,48239,63915 ],
    [ 60,958,1159,1247,1564,1572,1968,2382,3007,3232,4053,4281,5139,6245,9015,10962,19650,26103,44360,48699,64524 ],
    [ 61,966,1169,1258,1578,1586,1986,2404,3035,3262,4091,4321,5188,6304,9101,11066,19837,26351,44782,49161,65137 ],
    [ 62,974,1179,1269,1592,1601,2005,2427,3064,3294,4131,4363,5238,6365,9189,11173,20030,26607,45217,49639,65770 ],
    [ 63,982,1189,1280,1606,1615,2024,2450,3094,3326,4171,4406,5289,6428,9279,11283,20226,26868,45660,50126,66415 ],
    [ 64,991,1199,1292,1621,1630,2043,2473,3124,3358,4212,4450,5342,6491,9371,11395,20427,27134,46113,50622,67073 ],
    [ 65,999,1210,1303,1636,1645,2063,2497,3155,3391,4254,4494,5395,6556,9465,11509,20631,27406,46574,51129,67744 ],
    [ 66,1008,1221,1315,1652,1661,2083,2522,3186,3425,4297,4539,5449,6622,9559,11624,20837,27679,47039,51639,68420 ],
    [ 67,1017,1232,1327,1667,1676,2103,2547,3218,3460,4341,4586,5505,6689,9657,11742,21050,27962,47519,52167,69119 ],
    [ 68,1026,1243,1339,1683,1692,2124,2573,3250,3494,4386,4633,5561,6758,9757,11864,21267,28250,48010,52705,69832 ],
    [ 69,1037,1256,1353,1700,1709,2146,2598,3283,3530,4431,4681,5619,6829,9858,11987,21489,28545,48510,53254,70560 ],
    [ 70,1048,1270,1368,1719,1728,2169,2626,3318,3567,4477,4731,5679,6901,9962,12113,21715,28845,49021,53815,71303 ],
    [ 71,1061,1285,1385,1739,1749,2194,2657,3356,3608,4527,4783,5741,6977,10072,12247,21955,29164,49563,54410,72092 ],
    [ 72,1075,1302,1403,1762,1771,2223,2690,3398,3653,4583,4841,5811,7062,10195,12396,22222,29519,50166,55072,72968 ],
    [ 73,1090,1320,1423,1787,1797,2254,2728,3445,3703,4644,4906,5889,7157,10332,12563,22521,29916,50840,55812,73950 ],
    [ 74,1107,1340,1445,1814,1824,2288,2769,3496,3757,4712,4977,5975,7261,10482,12745,22847,30350,51577,56621,75021 ],
    [ 75,1125,1362,1469,1844,1854,2326,2814,3552,3818,4786,5056,6069,7375,10647,12946,23207,30827,52389,57512,76201 ],
    [ 76,1145,1386,1495,1876,1887,2367,2863,3614,3884,4869,5142,6172,7500,10828,13166,23602,31352,53280,58491,77499 ],
    [ 77,1166,1413,1524,1912,1922,2412,2918,3682,3956,4958,5237,6286,7639,11029,13410,24039,31933,54268,59575,78936 ],
    [ 78,1190,1441,1555,1951,1962,2461,2977,3756,4035,5057,5341,6411,7791,11247,13676,24516,32566,55344,60756,80500 ],
    [ 79,1216,1473,1589,1994,2005,2515,3042,3837,4123,5165,5455,6548,7957,11487,13968,25039,33261,56524,62052,82217 ],
    [ 80,1244,1507,1626,2040,2051,2574,3113,3926,4219,5285,5581,6699,8141,11752,14290,25617,34029,57830,63486,84117 ],
    [ 81,1275,1545,1667,2091,2103,2639,3190,4024,4324,5415,5718,6864,8341,12042,14643,26249,34868,59256,65051,86190 ],
    [ 82,1308,1586,1712,2148,2159,2710,3276,4132,4439,5559,5870,7046,8562,12361,15030,26944,35791,60824,66773,88472 ],
    [ 83,1345,1631,1761,2209,2221,2788,3370,4250,4566,5717,6038,7248,8807,12715,15460,27715,36815,62565,68683,91003 ],
    [ 84,1386,1681,1815,2277,2289,2874,3475,4382,4707,5893,6222,7469,9076,13103,15933,28561,37940,64476,70782,93783 ],
    [ 85,1431,1736,1875,2352,2365,2970,3590,4526,4862,6087,6426,7714,9374,13533,16456,29499,39185,66593,73106,96863 ],
    [ 86,1480,1797,1941,2435,2448,3075,3717,4687,5034,6303,6653,7987,9706,14011,17037,30541,40570,68946,75689,100285 ],
    [ 87,1535,1865,2015,2528,2541,3193,3860,4866,5228,6544,6908,8292,10077,14547,17689,31710,42122,71584,78584,104121 ],
    [ 88,1597,1940,2098,2631,2645,3325,4019,5067,5443,6813,7192,8633,10491,15145,18415,33012,43851,74523,81811,108397 ],
    [ 89,1665,2025,2190,2747,2762,3473,4198,5293,5685,7117,7511,9016,10956,15817,19232,34477,45798,77830,85442,113208 ],
    [ 90,1743,2120,2294,2878,2894,3640,4401,5548,5959,7459,7874,9452,11486,16581,20162,36143,48011,81591,89571,118678 ],
    [ 91,1830,2228,2412,3026,3043,3830,4630,5840,6272,7850,8285,9946,12086,17448,21216,38032,50520,85856,94253,124882 ],
    [ 92,1930,2352,2547,3197,3214,4048,4894,6173,6630,8300,8758,10513,12775,18443,22425,40200,53400,90750,99625,132000 ],
    [ 93,2044,2494,2703,3393,3411,4300,5199,6559,7044,8819,9307,11172,13576,19599,23831,42721,56748,96440,105871,140276 ],
    [ 94,2177,2660,2884,3622,3641,4594,5557,7010,7530,9426,9946,11939,14509,20945,25468,45656,60647,103066,113146,149915 ],
    [ 95,2332,2854,3098,3891,3911,4941,5977,7542,8103,10147,10703,12848,15613,22539,27406,49129,65261,110907,121754,161320 ],
    [ 96,2517,3085,3352,4212,4234,5356,6482,8183,8788,11010,11611,13938,16937,24451,29732,53298,70799,120318,132085,175008 ],
    [ 97,2739,3365,3661,4602,4626,5863,7098,8963,9628,12063,12724,15274,18562,26796,32583,58409,77588,131856,144751,191791 ],
    [ 98,3012,3712,4041,5086,5112,6490,7862,9935,10675,13378,14108,16935,20580,29710,36126,64760,86025,146194,160491,212646 ],
    [ 99,3353,4146,4525,5699,5725,7293,8839,11179,12011,15061,15879,19062,23164,33441,40662,72892,96827,164551,180644,239347 ],
    [ 100,3794,4715,5155,6500,6532,8349,10130,12827,13779,17293,18235,21890,26601,38402,46694,83706,111192,188964,207444,274857 ]
  ],
  _female: [
    [ 5,1264,1545,1643,2057,2071,2596,3130,3930,4224,5278,5581,6655,8074,11591,14009,25335,33653,56633,62054,82168 ],
    [ 6,1207,1475,1586,1985,1999,2506,3021,4317,4276,5344,6130,6737,8174,11187,13521,24453,32481,54661,59893,79306 ],
    [ 7,1157,1413,1520,1903,1916,2402,2895,4056,4056,5068,5759,6390,7752,10722,12959,23436,31131,52388,57403,76010 ],
    [ 8,1114,1360,1463,1831,1844,2311,2786,3838,3868,4833,5450,6093,7393,10319,12471,22555,29961,50419,55245,73152 ],
    [ 9,1076,1314,1413,1769,1781,2233,2691,3655,3706,4631,5190,5839,7085,9967,12046,21786,28939,48700,53361,70658 ],
    [ 10,1043,1273,1369,1714,1726,2163,2608,3501,3567,4458,4971,5620,6819,9658,11672,21110,28041,47189,51706,68465 ],
    [ 11,1014,1238,1331,1666,1678,2103,2535,3369,3447,4308,4784,5431,6590,9389,11347,20522,27260,45875,50266,66559 ],
    [ 12,989,1206,1298,1624,1636,2050,2471,3257,3343,4178,4625,5268,6391,9152,11061,20005,26572,44717,48998,64879 ],
    [ 13,967,1179,1268,1587,1598,2004,2415,3162,3253,4065,4490,5126,6219,8944,10810,19551,25970,43703,47886,63408 ],
    [ 14,947,1155,1243,1555,1566,1963,2367,3081,3176,3968,4375,5003,6070,8764,10592,19157,25446,42822,46921,62129 ],
    [ 15,931,1135,1220,1528,1538,1928,2324,3013,3109,3885,4278,4898,5942,8607,10403,18814,24990,42055,46081,61017 ],
    [ 16,915,1116,1200,1502,1513,1896,2285,2951,3048,3809,4191,4802,5826,8464,10229,18500,24574,41354,45313,60000 ],
    [ 17,900,1097,1180,1477,1488,1865,2248,2892,2989,3735,4107,4710,5714,8325,10061,18197,24171,40676,44570,59016 ],
    [ 18,890,1083,1164,1458,1468,1840,2218,2841,2961,3700,4035,4665,5660,8213,9926,17952,23846,40129,43970,58223 ],
    [ 19,886,1074,1155,1446,1456,1825,2200,2803,2961,3700,3980,4665,5660,8147,9847,17808,23655,39807,43618,57756 ],
    [ 20,886,1071,1152,1442,1452,1820,2194,2776,2961,3700,3942,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 21,886,1071,1152,1442,1452,1820,2194,2760,2961,3700,3919,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 22,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 23,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 24,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 25,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 26,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 27,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 28,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 29,886,1071,1152,1442,1452,1820,2194,2755,2961,3700,3912,4665,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 30,886,1071,1152,1442,1452,1820,2194,2756,2962,3701,3913,4666,5660,8125,9820,17760,23591,39700,43500,57600 ],
    [ 31,886,1071,1152,1442,1452,1820,2194,2758,2964,3704,3916,4670,5661,8127,9822,17764,23596,39708,43509,57612 ],
    [ 32,887,1072,1153,1443,1453,1822,2196,2762,2968,3709,3922,4677,5666,8134,9831,17780,23617,39744,43548,57663 ],
    [ 33,888,1073,1155,1445,1455,1825,2199,2767,2974,3716,3929,4686,5674,8146,9846,17806,23652,39803,43613,57750 ],
    [ 34,890,1076,1157,1448,1458,1828,2204,2774,2982,3726,3939,4698,5686,8163,9866,17844,23702,39887,43705,57872 ],
    [ 35,892,1078,1160,1452,1462,1833,2209,2783,2991,3737,3951,4713,5701,8186,9893,17892,23767,39996,43824,58029 ],
    [ 36,894,1081,1163,1457,1467,1839,2217,2793,3002,3751,3966,4730,5720,8213,9926,17952,23846,40129,43970,58223 ],
    [ 37,898,1085,1168,1462,1472,1846,2225,2805,3014,3767,3982,4750,5742,8245,9965,18023,23941,40288,44145,58453 ],
    [ 38,901,1090,1172,1468,1478,1854,2235,2818,3029,3785,4002,4773,5768,8284,10012,18108,24053,40477,44352,58728 ],
    [ 39,905,1095,1178,1475,1486,1863,2246,2833,3045,3805,4023,4799,5798,8327,10065,18202,24179,40689,44583,59035 ],
    [ 40,910,1101,1184,1484,1494,1874,2259,2850,3063,3828,4047,4828,5831,8377,10125,18311,24323,40932,44850,59388 ],
    [ 41,915,1107,1192,1493,1503,1886,2273,2869,3084,3853,4074,4861,5870,8433,10192,18433,24485,41204,45148,59782 ],
    [ 42,921,1115,1199,1503,1513,1899,2289,2890,3106,3881,4104,4896,5911,8495,10267,18568,24664,41505,45478,60220 ],
    [ 43,928,1123,1208,1514,1525,1913,2307,2913,3131,3912,4136,4935,5958,8563,10349,18716,24861,41838,45843,60702 ],
    [ 44,935,1132,1218,1526,1537,1929,2326,2938,3157,3945,4171,4978,6008,8638,10440,18882,25081,42207,46247,61238 ],
    [ 45,943,1141,1228,1540,1551,1947,2347,2965,3186,3981,4210,5025,6065,8720,10539,19060,25318,42606,46684,61816 ],
    [ 46,951,1152,1240,1555,1565,1966,2370,2994,3218,4021,4252,5075,6125,8809,10647,19256,25578,43045,47165,62453 ],
    [ 47,960,1163,1252,1570,1581,1986,2395,3026,3252,4064,4297,5130,6191,8907,10765,19469,25862,43521,47687,63144 ],
    [ 48,970,1175,1265,1588,1599,2009,2422,3060,3289,4110,4345,5189,6262,9012,10892,19698,26166,44033,48248,63886 ],
    [ 49,981,1188,1279,1606,1617,2032,2450,3096,3328,4158,4396,5250,6338,9123,11026,19942,26489,44577,48843,64675 ],
    [ 50,991,1201,1294,1624,1636,2056,2479,3133,3367,4208,4449,5314,6416,9237,11164,20191,26820,45134,49454,65484 ],
    [ 51,1002,1215,1308,1643,1655,2081,2509,3171,3408,4259,4503,5379,6495,9354,11306,20447,27160,45706,50081,66314 ],
    [ 52,1013,1229,1323,1663,1674,2106,2539,3210,3450,4311,4558,5446,6576,9474,11451,20709,27508,46292,50723,67164 ],
    [ 53,1025,1243,1339,1682,1694,2132,2571,3250,3493,4364,4614,5514,6659,9597,11599,20978,27866,46893,51382,68037 ],
    [ 54,1036,1257,1354,1703,1715,2159,2603,3290,3536,4419,4672,5584,6745,9724,11752,21254,28232,47511,52058,68933 ],
    [ 55,1048,1272,1371,1724,1736,2186,2635,3332,3581,4475,4731,5657,6832,9853,11909,21538,28609,48145,52753,69852 ],
    [ 56,1061,1287,1387,1745,1757,2214,2669,3375,3627,4533,4792,5730,6922,9986,12070,21829,28996,48795,53466,70796 ],
    [ 57,1073,1303,1404,1767,1779,2243,2704,3419,3675,4592,4855,5806,7014,10123,12235,22128,29393,49464,54199,71767 ],
    [ 58,1086,1319,1421,1790,1802,2272,2739,3464,3723,4652,4919,5883,7109,10264,12405,22436,29802,50152,54952,72764 ],
    [ 59,1099,1335,1439,1812,1825,2302,2775,3510,3773,4715,4985,5964,7206,10409,12580,22752,30222,50858,55726,73789 ],
    [ 60,1112,1352,1457,1836,1849,2333,2813,3558,3824,4779,5052,6046,7306,10557,12760,23077,30654,51585,56523,74844 ],
    [ 61,1126,1369,1476,1860,1874,2365,2851,3607,3877,4844,5122,6130,7408,10711,12945,23412,31098,52333,57342,75929 ],
    [ 62,1140,1387,1495,1885,1899,2398,2891,3657,3931,4912,5193,6217,7515,10868,13135,23756,31556,53103,58186,77047 ],
    [ 63,1155,1405,1515,1911,1924,2432,2931,3709,3986,4981,5267,6306,7624,11030,13332,24111,32027,53896,59055,78197 ],
    [ 64,1169,1423,1535,1937,1951,2466,2973,3762,4043,5053,5342,6398,7735,11198,13534,24476,32512,54713,59950,79383 ],
    [ 65,1184,1442,1555,1964,1978,2502,3016,3817,4102,5126,5420,6493,7851,11370,13742,24853,33013,55556,60873,80605 ],
    [ 66,1200,1462,1577,1992,2006,2538,3060,3873,4163,5202,5500,6590,7970,11548,13957,25242,33529,56424,61825,81865 ],
    [ 67,1216,1482,1599,2021,2035,2576,3105,3931,4225,5280,5582,6690,8093,11731,14178,25643,34062,57320,62807,83165 ],
    [ 68,1232,1502,1621,2050,2065,2615,3152,3991,4289,5360,5667,6794,8218,11920,14407,26056,34611,58245,63820,84507 ],
    [ 69,1249,1523,1644,2081,2096,2655,3201,4053,4356,5443,5755,6901,8349,12116,14644,26484,35179,59201,64867,85893 ],
    [ 70,1267,1545,1668,2112,2127,2696,3250,4116,4424,5528,5845,7011,8483,12318,14888,26925,35766,60188,65949,87326 ],
    [ 71,1284,1568,1693,2144,2159,2739,3302,4182,4495,5616,5938,7124,8623,12527,15140,27382,36372,61209,67068,88807 ],
    [ 72,1303,1591,1718,2177,2193,2783,3355,4250,4567,5707,6034,7243,8766,12743,15402,27854,37000,62265,68225,90339 ],
    [ 73,1322,1615,1744,2211,2227,2828,3409,4320,4643,5801,6134,7364,8915,12967,15672,28343,37649,63358,69422,91925 ],
    [ 74,1341,1639,1771,2246,2263,2875,3466,4392,4720,5898,6236,7489,9069,13199,15952,28850,38322,64490,70663,93567 ],
    [ 75,1361,1664,1798,2283,2300,2924,3524,4467,4801,5999,6342,7619,9229,13448,16253,29394,39045,65707,71996,95333 ],
    [ 76,1382,1691,1827,2321,2337,2974,3585,4544,4884,6106,6457,7761,9405,13725,16588,30000,39850,67061,73480,97297 ],
    [ 77,1403,1717,1856,2359,2377,3026,3648,4626,4973,6224,6584,7919,9603,14033,16960,30674,40744,68566,75130,99482 ],
    [ 78,1425,1745,1887,2400,2417,3080,3714,4717,5073,6354,6724,8093,9821,14375,17374,31423,41739,70241,76964,101911 ],
    [ 79,1448,1774,1919,2442,2461,3137,3788,4818,5183,6500,6879,8287,10062,14757,17835,32256,42846,72103,79005,104613 ],
    [ 80,1473,1807,1955,2491,2510,3204,3872,4931,5307,6662,7051,8503,10332,15181,18348,33184,44079,74178,81278,107623 ],
    [ 81,1502,1844,1996,2546,2565,3278,3965,5058,5445,6842,7243,8744,10633,15655,18921,34220,45455,76493,83815,110983 ],
    [ 82,1535,1886,2042,2608,2627,3361,4071,5199,5599,7041,7457,9011,10967,16185,19562,35378,46994,79084,86653,114741 ],
    [ 83,1572,1933,2093,2677,2697,3455,4189,5358,5772,7265,7695,9310,11340,16780,20281,36679,48722,81991,89839,118959 ],
    [ 84,1613,1986,2152,2755,2776,3561,4321,5535,5965,7514,7959,9642,11760,17451,21091,38144,50668,85266,93428,123711 ],
    [ 85,1659,2045,2217,2843,2864,3680,4471,5735,6182,7794,8257,10017,12230,18209,22008,39803,52871,88974,97490,129090 ],
    [ 86,1711,2112,2291,2942,2965,3816,4639,5961,6427,8109,8592,10441,12765,19073,23052,41690,55378,93192,102113,135211 ],
    [ 87,1771,2188,2374,3055,3079,3969,4832,6216,6705,8465,8972,10923,13371,20062,24247,43852,58249,98025,107407,142222 ],
    [ 88,1837,2274,2469,3183,3208,4146,5051,6508,7022,8871,9404,11470,14066,21203,25626,46347,61563,103601,113518,150313 ],
    [ 89,1913,2372,2577,3330,3356,4347,5301,6843,7384,9336,9896,12101,14867,22532,27232,49251,65422,110094,120632,159734 ],
    [ 90,2000,2484,2701,3499,3527,4581,5591,7231,7804,9872,10465,12834,15797,24095,29122,52669,69961,117734,129004,170819 ],
    [ 91,2099,2613,2844,3695,3724,4852,5930,7683,8294,10496,11129,13692,16896,25958,31374,56741,75371,126837,138978,184026 ],
    [ 92,2214,2764,3011,3924,3955,5172,6326,8214,8871,11233,11912,14707,18199,28212,34097,61667,81913,137847,151042,200000 ],
    [ 93,2348,2940,3206,4194,4230,5552,6801,8850,9561,12111,12843,15922,19776,30988,37452,67735,89973,151411,165904,219680 ],
    [ 94,2506,3148,3439,4519,4556,6013,7372,9619,10393,13172,13966,17413,21719,34486,41681,75382,100132,168506,184635,244482 ],
    [ 95,2695,3399,3719,4913,4956,6578,8078,10572,11424,14481,15353,19269,24167,39025,47166,85303,113309,190682,208934,276657 ],
    [ 96,2923,3705,4061,5403,5448,7289,8962,11774,12730,16136,17105,21647,27330,45139,54556,98667,131061,220556,241667,320000 ],
    [ 97,3205,4086,4489,6021,6075,8202,10106,13341,14423,18290,19386,24801,31585,53808,65033,117616,156232,262914,288079,381457 ],
    [ 98,3560,4573,5042,6834,6895,9430,11645,15460,16719,21191,22457,29156,37633,67038,81023,146535,194645,327558,358911,475248 ],
    [ 99,4020,5214,5772,7936,8013,11145,13807,18478,19993,25325,26813,35584,46777,89680,108389,196026,260386,438190,480132,635762 ],
    [ 100,4641,6099,6788,9524,9622,13736,17074,23132,25030,31651,33493,46006,62404,137247,165878,300000,398497,670608,734797,972973 ]
  ],
  _distanceIdx: [
    0, // Age column
    5000, // 5k
    6000, // 6k
    6437, // 4 mile
    8000, // 8k
    8047, // 5 mile
    10000, // 10k
    12000, // 12k
    15000, // 15k
    16093, // 10 mile
    20000, // 20k
    21097, // half marathon
    25000, // 25k
    30000, // 30k
    42195, // marathon
    50000, // 50k
    80467, // 50 mile
    100000, // 100k
    150000, // 150k
    160934, // 100 mile
    200000  // 200k
  ],

  /**
   * Calculates the percent given an athlete, distance and time.
   *
   * @param age number Age of the person in question
   * @param gender number 0 for male, 1 for female
   * @param distance number Distance run in meter
   * @param time number Time to cover the distance in seconds
   * @return number The percent calculated from it (value between 0 and 1)
   */
  timeToPercent: function(age, gender, distance, time) {
    var data = gender ? this._female : this._male;
    var distanceidx = this._distanceIdx.indexOf(distance);
    var ageidx = age - 5;
    var worldrecord = data[ageidx][distanceidx];
    var ratio = worldrecord / time;
    return ratio;
  },

  percentToTime: function(age, gender, distance, ratio) {
    var data = gender ? this._female : this._male;
    var distanceidx = this._distanceIdx.indexOf(distance);
    var ageidx = age - 5;
    var worldrecord = data[ageidx][distanceidx];
    var time = worldrecord / ratio;
    return time;
  }
};

CALC.racePredictor = {
  /**
   * Calculates a prediction of what your race time will be given the
   * performance in another race.
   * Formula devised by Pete Riegel in the '70s. Updated in the '80s.
   *
   * @param distanceIn number Length of the performed race in metre
   * @param timeIn number Time in seconds of the performed race
   * @param distanceOut number Length of the target race
   * @return number Predicted time in seconds for the target race
   */
  predict: function(distanceIn, timeIn, distanceOut) {
    return timeIn * Math.pow((distanceOut / distanceIn), 1.06);
  }
};

CALC.hrzones = {
  /**
   * Gives zones according to Pete Pfitzinger's Faster Road Racing.
   */
  petemax: function(maxhr) {
    return {
      recovery: [0,0.76*maxhr],
      generalaerobic: [0.7*maxhr,0.81*maxhr],
      endurance: [0.74*maxhr,0.84*maxhr],
      lactatethreshold: [0.8*maxhr,0.91*maxhr],
      vo2max: [0.94*maxhr,0.98*maxhr]
    };
  },
  petehrr: function(restinghr, maxhr) {
    var hrr = maxhr - restinghr;
    var round = function(n) { return Math.round(n*100) / 100; };
    return {
      recovery: [
        0,
        round((0.7*hrr)+restinghr)
      ],
      generalaerobic: [
        round((0.62*hrr)+restinghr),
        round((0.75*hrr)+restinghr)
      ],
      endurance: [
        round((0.65*hrr)+restinghr),
        round((0.78*hrr)+restinghr)
      ],
      lactatethreshold: [
        round((0.75*hrr)+restinghr),
        round((0.88*hrr)+restinghr)
      ],
      vo2max: [
        round((0.92*hrr)+restinghr),
        round((0.97*hrr)+restinghr)
      ]
    };
  }
};

CALC.trimp = {
  hr_rel: function(hr_avg_activity, hr_rest, hr_max) {
    return (hr_avg_activity - hr_rest) / (hr_max - hr_rest);
  },
  /**
   * @param sex 1 if a woman, 0 if man (default: man)
   * @return number Stress for the activity as defined by Morton/Bannister with
   *                Green et al coefficient.
   */
  calc: function(time_minutes, hr_rel, sex) {
    // 1.67 for women, 1.92 for men
    let k = (sex === 1) ? 1.67 : 1.92;
    return time_minutes * hr_rel * 0.64 * Math.pow(Math.E, k * hr_rel);
  }
};

/**
 * Event listeners for pace/speed
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
  document.getElementById("pace_predefined_distance").value = null;
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

function fill_predefined_distance() {
  'use strict';
  var distance = parseInt(document.getElementById("pace_predefined_distance").value) || 0;
  document.getElementById("distance").value = distance;
  CALC.pace.setDistance(distance);
}
/**
 * Fill in pace fields with new info
 */
function updatepacefields(pace) {
  'use strict';
  document.getElementById("minutesperk").value = CALC.util.secToHMS(CALC.pace.getSecPerKm())[1];
  document.getElementById("secondsperk").value = CALC.util.secToHMS(CALC.pace.getSecPerKm())[2];
  document.getElementById("minutesperm").value = CALC.util.secToHMS(CALC.pace.getSecPerMi())[1];
  document.getElementById("secondsperm").value = CALC.util.secToHMS(CALC.pace.getSecPerMi())[2];
  document.getElementById("hoursperd").value = CALC.util.secToHMS(CALC.pace.getSecPerDistance())[0];
  document.getElementById("minutesperd").value = CALC.util.secToHMS(CALC.pace.getSecPerDistance())[1];
  document.getElementById("secondsperd").value = CALC.util.secToHMS(CALC.pace.getSecPerDistance())[2];
  document.getElementById("distance").value = CALC.pace.getDistance();
  document.getElementById("kmperh").value = Math.round(CALC.pace.getKmPerH() * 100) / 100;
  document.getElementById("mpers").value = Math.round(CALC.pace.getMPerS() * 100) / 100;
}

/**
 * Add event listeners for pace/speed
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

  // Filling in of predefined distances
  document.getElementById("pace_predefined_distance").value = null;
  document.getElementById("pace_predefined_distance").addEventListener("change", fill_predefined_distance);

  // Default value in the distance field
  CALC.pace.setDistance(1000);
});

/**
 * Event listeners for age grade
 */
function updatePercent() {
  'use strict';
  var age = parseInt(document.getElementById("agAge").value) || 20;
  var gender = parseInt(document.getElementById("agGender").value);
  var distance = parseInt(document.getElementById("agDistance").value);
  var houperd = parseInt(document.getElementById("agHours").value) || 0;
  var minperd = parseInt(document.getElementById("agMinutes").value) || 0;
  var secperd = parseInt(document.getElementById("agSeconds").value) || 0;

  var ratio = CALC.ageGrade.timeToPercent(age, gender, distance, houperd * 3600 + minperd * 60 + secperd);

  var percent = Math.floor(ratio * 10000) / 100;
  document.getElementById("agPercent").value = percent;
}
function updateTime() {
  'use strict';
  var age = parseInt(document.getElementById("agAge").value);
  var gender = parseInt(document.getElementById("agGender").value);
  var distance = parseInt(document.getElementById("agDistance").value);
  var percent = parseFloat(document.getElementById("agPercent").value);

  var seconds = CALC.ageGrade.percentToTime(age, gender, distance, percent / 100);

  var time = CALC.util.secToHMS(Math.floor(seconds));

  document.getElementById("agHours").value = time[0];
  document.getElementById("agMinutes").value = time[1];
  document.getElementById("agSeconds").value = time[2];
}

/**
 * Add event listeners for age grade
 */
document.addEventListener("DOMContentLoaded", function(event) {
  // Keep track of which was last set: time (0) or percent (1)
  var agLastUsed = 0;
  var updateLast = function() {
    if (agLastUsed === 0) {
      updatePercent();
    } else if (agLastUsed === 1) {
      updateTime();
    } else {
      new Error("Age Grade: Last used broken");
    }
  };
  var _timeEntered = function() {
    agLastUsed = 0;
    updatePercent();
  };
  var _percentEntered = function() {
    agLastUsed = 1;
    updateTime();
  };

  document.getElementById("agAge").addEventListener("change", updateLast);
  document.getElementById("agGender").addEventListener("change", updateLast);
  document.getElementById("agDistance").addEventListener("change", updateLast);
  document.getElementById("agHours").addEventListener("change", _timeEntered);
  document.getElementById("agMinutes").addEventListener("change", _timeEntered);
  document.getElementById("agSeconds").addEventListener("change", _timeEntered);

  document.getElementById("agPercent").addEventListener("change", _percentEntered);
});

/**
 * Event listener for race prediction
 */
function updatePrediction() {
  var distanceIn = parseIntInput("rpDistanceIn");
  var hourIn = parseIntInput("rpHoursIn");
  var minutesIn = parseIntInput("rpMinutesIn");
  var secondsIn = parseIntInput("rpSecondsIn");
  var timeIn = hourIn * 3600 + minutesIn * 60 + secondsIn;
  var distanceOut = parseIntInput("rpDistanceOut");
  var prediction = CALC.racePredictor.predict(distanceIn, timeIn, distanceOut);
  var times = CALC.util.secToHMS(prediction);
  var output = times.join(":");
  document.getElementById("rpTimeOut").value = output;
}

function parseIntInput(DOMid) {
  return parseInt(document.getElementById(DOMid).value);
}
function listenChange(DOMid, f) {
  document.getElementById(DOMid).addEventListener("change", f);
}

document.addEventListener("DOMContentLoaded", function(event) {
  var DOMids = ['rpDistanceIn', 'rpHoursIn', 'rpMinutesIn', 'rpSecondsIn', 'rpDistanceOut'];
  DOMids.forEach(function(DOMid) {
    listenChange(DOMid, updatePrediction);
  });
});

/**
 * Event listener for hr zones
 */

function updateZones() {
  var hrRest = parseIntInput("hrRest");
  var hrMax = parseIntInput("hrMax");
  var zones = CALC.hrzones.petehrr(hrRest, hrMax);
  document.getElementById('hrRecovery').innerHTML = zones.recovery[1];
  document.getElementById('hrGAmin').innerHTML = zones.generalaerobic[0];
  document.getElementById('hrGAmax').innerHTML = zones.generalaerobic[1];
  document.getElementById('hrEndurancemin').innerHTML = zones.endurance[0];
  document.getElementById('hrEndurancemax').innerHTML = zones.endurance[1];
  document.getElementById('hrLTmin').innerHTML = zones.lactatethreshold[0];
  document.getElementById('hrLTmax').innerHTML = zones.lactatethreshold[1];
  document.getElementById('hrVO2min').innerHTML = zones.vo2max[0];
  document.getElementById('hrVO2max').innerHTML = zones.vo2max[1];
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.getElementById('hrRest').addEventListener('change', function(event) {
    updateZones();
  });
  document.getElementById('hrMax').addEventListener('change', function(event) {
    updateZones();
  });
  updateZones();
});


/**
 * Event listener for race splits
 */

function race_splits_update() {
  let distance = parseInt(document.getElementById('race-splits-distance').value);
  let split_distance = parseInt(document.getElementById('race-splits-split-distance').value);
  let time = race_split_parse_time(document.getElementById('race-splits-time-hours').value, document.getElementById('race-splits-time-minutes').value, document.getElementById('race-splits-time-seconds').value);
  let reverse = document.getElementById('race-splits-reverse').checked;
  if (isNaN(distance) || isNaN(split_distance) || isNaN(time)) {
    return;
  }
  let number_of_splits = Math.floor(distance / split_distance);
  let s_per_m = time / distance;

  let table_body = document.getElementById('race-splits-out');
  // Remove existing rows
  while (table_body.firstChild) {
    table_body.removeChild(table_body.lastChild);
  }
  // Insert new rows
  let leftover_distance = distance - (number_of_splits * split_distance);
  let leftover_time = s_per_m * leftover_distance;
  for (let i = 0; i <= number_of_splits; i++) {
    let curr_distance = split_distance * i;
    let curr_time = s_per_m * curr_distance;
    if (reverse) {
      curr_distance += leftover_distance;
      curr_time += leftover_time;
    }
    table_body.appendChild(race_splits_new_row(curr_distance, curr_time));
  }
  if (leftover_distance > 0) {
    if (reverse) {
      table_body.prepend(race_splits_new_row(0, 0));
    } else {
      table_body.appendChild(race_splits_new_row(distance, time));
    }
  }
}

function race_splits_new_row(distance, time) {
  let new_row = document.createElement('tr');
  let distance_cell = document.createElement('td');
  distance_cell.innerHTML = distance;
  let time_cell = document.createElement('td');
  let time_value = CALC.util.secToHMSm(time);
  // Pad seconds to 2 wide in all cases
  time_value[2] = time_value[2].toString().padStart(2, '0');
  if (time_value[0] > 0) {
    // Pad minutes only when there is a preceding hour
    time_value[1] = time_value[1].toString().padStart(2, '0');
    time_cell.innerHTML = `${time_value[0]}:${time_value[1]}:${time_value[2]}.${time_value[3]}`;
  } else {
    time_cell.innerHTML = `${time_value[1]}:${time_value[2]}.${time_value[3]}`;
  }
  new_row.appendChild(distance_cell);
  new_row.appendChild(time_cell);
  return new_row;
}

function race_split_parse_time(h, m, s) {
  let hour   = parseInt(h);
  let minute = parseInt(m);
  let second = parseInt(s);
  return second + minute * 60 + hour * 3600;
}

document.addEventListener('DOMContentLoaded', function(event) {
  let inputs = [
    document.getElementById('race-splits-distance'),
    document.getElementById('race-splits-time-hours'),
    document.getElementById('race-splits-time-minutes'),
    document.getElementById('race-splits-time-seconds'),
    document.getElementById('race-splits-split-distance'),
    document.getElementById('race-splits-reverse')
  ];
  inputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
      race_splits_update();
    });
  });
});
