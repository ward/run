---
layout: post
title: "GoldenCheetah and Training Load"
date: 2017-07-21 12:00:00
tags:
- goldencheetah
---

<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>

Wrapping your head around PMC, TSB, CTL, ATL, ... others

# Abbreviations

- PMC = ?
- CTL = Chronic Training Load
- ATL = Acute Training Load
- TSB = Training Stress Balance
- TRIMP = Intensity metric for a workout
- Triscore = Intensity metric for a workout
- RR

These assume that you have some metric that, given the data of a workout (time,
heartrate, power output, ...), gives you a number that signifies the intensity
of that workout. Examples of such metrics: TRIMP, Triscore, ...

# CTL and ATL

Then you want to combine the numbers of individual workouts to get a meaningful
number over a period of time.  This is done by means of the CTL (long term
stress) and ATL (short term stress). Both are [exponentially (weighted) moving
averages][ewmawiki]. You can read that Wikipedia link, or continue reading
here.

The exponentially weighted moving average works as follows. Today's workout is
given a certain weight. Yesterday's workout has a bit less weight. The one from
two days ago even less. This goes on and on as long as there is data.  The
further back the workout, the less meaningful it will be for today's
accumulated stress that you are calculating, but it will still be factored into
things. To actually calculate things, consider the following recursive formula
(shamelessly copied from Wikipedia).

$$
S_1 = Y_1
$$

$$
S_n = \alpha Y_n + (1 - \alpha) S_{n-1}
$$

The Y series are the stress metrics for each day. The first element in the Y
series would be your first workout ever. The calculated S series is the
accumulated stress. If you work it out, you find that the weight w of a workout
d days ago accounts for the following in the final S you are calculating.

$$
\alpha (1 - \alpha)^d * w
$$


As a contrived example, say you started working out one week ago. You ran 3 km,
5 km, 3 km, 6 km, 0 km, 8 km, 5 km. The associated stress levels for these are
calculated by your metric of choice. Here are some numbers I made up: 10, 20,
10, 30, 0, 50, 20. This would be your Y series. For CTL, the α is usually set
at 1/42.  For ATL, this is 1/7. Now you can plug in the numbers in order to
get the accumulated stress on every day.

|Day|Distance|Stress|ATL|CTL|
|---|--------|------|---|---|
|1|3|10|10|10|
|2|5|20|11.4|10.2|
|3|3|10|11.2|10.2|
|4|6|30|13.9|10.7|
|5|0|0|11.9|10.4|
|6|8|50|17.4|11.4|
|7|5|20|17.7|11.6|

Need quite some data before the numbers become meaningful. GoldenCheetah allows
you to provide your own starting value to remedy this (assuming you can get a
proper starting value of course).

The values for α are defaults and may differ depending on the athlete, their
goal, ...

The use of exponential weighted moving average is a simplification of the
impuls-response formula proposed by Bannister et al.

# TSB

Difference between ATL and CTL.

# Refs

http://forum.slowtwitch.com/forum/Slowtwitch_Forums_C1/Triathlon_Forum_F1/Help_me_understand_the_pmc_calculations_of_ctl_and_atl_P5530452/

https://www.trainingpeaks.com/blog/why-ramp-rate-is-an-important-training-metric/

http://www.joefrielsblog.com/2015/06/part-1-chronic-training-loadso-what.html

https://www.trainingpeaks.com/blog/applying-the-numbers-part-1-chronic-training-load/

https://www.trainingpeaks.com/blog/the-science-of-the-performance-manager/

[ewmawiki]: https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average "Moving average - Wikipedia"
