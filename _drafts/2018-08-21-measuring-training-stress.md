---
layout: post
title: "Measuring Training Stress"
date: 2018-08-21 12:00:00
tags:
- training
- acute-to-chronic
- atl
- ctl
- goldencheetah
---

<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>

1. TOC
{:toc}

Putting a number to the stress your body is experiencing helps you in both
planning and evaluating your training. I am jotting down some of my notes on
the matter in this post. They will be largely in the context of running, but
the same ideas apply elsewhere.

# Intro

On a high level, I would divide the functions we will look at into two
categories. I do not know enough about the subject to tell you what, if any,
the official terms are. I will try to describe the concepts in enough detail so
you can link it to something you might know or are able to search further on
the topic.

1. Activity metrics: these take your run (or other type of activity) and distil
   it to one number. Some seem to also call this TRaining IMPulse (TRIMP), but
   by my observation that term is more fitting for some particular metrics.
2. Aggregation functions: these take the numbers representing many different
   activities and give you a number that tells you something about a range of
   dates.

# Activity Metrics

The activity metrics are there to quantify your activity in a certain way.
There are many different ways to do this and which one you want might depend on
what you are trying to measure.

Probably the most simple one is to just take the distance you covered. Ran 5
km? The metric for this run is 5. Ran 12 km? The metric is 12. I find this one
an easy and relevant one when you are building base and all your runs are at a
pretty low intensity anyway. Chances are you are already tracking distance
anyway.

Heart rate can give you a better number. TRIMP zonal points: weight every heart
rate zone, then calculate how much time was spent in each, multiply and sum.
Strava's "Suffer Score" seems to be based on this idea. See also
https://djconnel.blogspot.com/2011/08/strava-suffer-score-decoded.html and
https://blog.strava.com/suffer-score-how-hard-is-hard-11775/. See also also
http://fellrnr.com/wiki/TRIMP.

TriScore that GoldenCheetah uses? Look up where that one comes from.

# Aggregation Functions

Now that you have a bunch of numbers for your workouts, you want to relate them
to one another. Ideally, you will get some numbers that indicate how hard you
have been working as well as an indication of whether it is more than you might
be able to handle.

## Acute to Chronic

A simple one to apply is the Acute to Chronic concept. I see this one usually
used with distance as the activity metric, but as far as I can tell nothing
would stop you from using other metrics.

The idea is to first aggregate your metric on a weekly basis. In the distance
example, say you ran 20, 30, 35, and 40 km in four consecutive weeks. You then
take the mean of all these weeks, which is 125/4 = 31.25. Finally, you divide
the final week by this average: 40/31.25 = 1.28.

So you get a number describing the past four weeks. You interpret this number
by looking at how large it is.  If it is larger than 1.2, you are probably
ramping up your distance too quickly. If it is larger than 1.5, you definitely
are. The higher the number, the more risk of injury. In other words, trying to
keep this number low enough when planning your weeks should help in avoiding
injuries.

## Acute and Chronic Training Load

Another, slightly more complicated way, of aggregation is by means of Acute
Training Load (ATL) and Chronic Training Load (CTL).  These give you a number
that describes your short term stress and long term stress respectively for a
given day.  Both are [exponentially (weighted) moving averages][ewmawiki]. You
can read that Wikipedia link for an explanation, or continue reading here.

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

-----

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

# TSB

Difference between ATL and CTL.

# RR

From the GoldenCheetah mailing list:

> Ramp Rate.
> 
> The rate at which the long term stress has been increasing.
> It looks back 7 days, or whatever you have configured in preferences for STS.
> 
> So, negative figures indicate CTL/LTS has been dropping recently and positive means its been increasing.
> Obviously, if you ramp up too quickly - i.e. try to do more miles/intensity too early - then you risk injury.
> 
> Its just a way of quantifying the rate of change in training load over the short term.
> Its been in GC for at least 5 years ;)

# Refs

http://forum.slowtwitch.com/forum/Slowtwitch_Forums_C1/Triathlon_Forum_F1/Help_me_understand_the_pmc_calculations_of_ctl_and_atl_P5530452/

https://www.trainingpeaks.com/blog/why-ramp-rate-is-an-important-training-metric/

http://www.joefrielsblog.com/2015/06/part-1-chronic-training-loadso-what.html

https://www.trainingpeaks.com/blog/applying-the-numbers-part-1-chronic-training-load/

https://www.trainingpeaks.com/blog/the-science-of-the-performance-manager/

[ewmawiki]: https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average "Moving average - Wikipedia"
