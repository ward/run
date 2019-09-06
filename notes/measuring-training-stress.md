---
layout: page
title: Measuring Training Stress
exclude: true
updated: 2019-09-06 12:00:00
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
the same ideas apply elsewhere. The post followed from me trying to understand
several of the numbers provided in GoldenCheetah. This may still be reflected
in what is stated.

## Intro

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

## Activity Metrics

The activity metrics are there to quantify your activity in a certain way. You
want to assign a number to each activity that indicates how hard or easy it was
on your body. There are many different ways to do this and which one you want
might depend on what you are trying to measure.

Probably the most simple one is to just take the distance you covered. Ran 5
km? The metric for this run is 5. Ran 12 km? The metric is 12. I find this one
an easy and relevant one when you are building base and all your runs are at a
pretty low intensity anyway. Chances are you are already tracking distance.

Evidently, distance does not necessarily say a whole lot about the intensity of
a run. For this purpose, many people make use of a heart rate monitor. The
downside is that heart rate is not one number for your entire run, but a new
measurement for every second or so during your run. What needs to be done is
squeezing all those different measurements together into one number that
characterises the run. You could use the mean or median of all the
measurements, but that obscures a lot of information. Did you run steadily at
150 HR or did you run half at 180 HR with the other half jogging at 120 HR? A
more often used approach is to use TRIMP zonal points. TRIMP zonal points give
a weight to every heart rate zone. This tends to involve giving an
exponentially higher weight to the higher heart rate zones. Count the time
spent in each HR zone and multiply it by the weight of that zone. Finally you
sum up everything and get a nice number. Strava's "Suffer Score" is apparently
based on this TRIMP idea.[^stravasufferscoredecoded][^stravabloghowhardishard]

You can apply this idea to other metrics you can gather about your run too.
Pace you ran, split it in zones, following the same logic as with heart rate.
If you have a power meter, like a Stryd footpod, you could use those
measurements in the same way as well.

See also http://fellrnr.com/wiki/TRIMP.

GOVSS[^govsspaper] is another activity metric, though I do not currently have a
proper mathematical explanation for it, having not read the only (unpublished?)
paper I found. It seems to be measuring things in comparison to a 1 hour all
out effort. That one hour is attributed the number 100, every other work out is
then given a number that indicates relative intensity to it.  GoldenCheetah
seems to use GOVSS for running activities in their TriScore metric (TriScore
tries to assign a consistent number across the three disciplines of a
triathlon: swimming, biking, and running).

## Aggregation Functions

Now that you have a bunch of numbers for your workouts, you want to relate them
to one another. Ideally, you will get some numbers that indicate how hard you
have been working as well as an indication of whether it is more than you might
be able to handle. In running, we are always fearful of doing too much too
soon, which can easily lead to injuries. As such, you will often compare
current stress to previous stress. If the current stress is suddenly a lot
higher compared to the previous stress, you might be overdoing it.

### Acute to Chronic

A simple one to apply is the Acute to Chronic concept. I see this one usually
used with distance as the activity metric, but as far as I can tell nothing
would stop you from using other metrics.

The idea is to first aggregate your metric on a weekly basis. In the distance
example, say you ran 20, 30, 35, and 40 km in four consecutive weeks. You then
take the mean of all these weeks, which is 125/4 = 31.25. Finally, you divide
the final week by this average: 40/31.25 = 1.28.

So you get a number describing the past four weeks. You interpret this number
by looking at how large it is. In case of distance comparison, the usual
cut-offs used are a ratio of 1.2 and one of 1.5.  If the ratio is larger than
1.2, you are probably ramping up your distance too quickly. If it is larger
than 1.5, you definitely are. The higher the number, the more risk of injury.
In other words, trying to keep this number low enough when planning your weeks
should help in avoiding injuries.

### Acute and Chronic Training Load

Another way to aggregate activities is by means of Acute Training Load (ATL)
and Chronic Training Load (CTL). These might be a bit harder to wrap your head
around, but in the end each provides you with a number and you end up comparing
those numbers. ATL and CTL give you a number that describes your short term
stress and long term stress respectively for a given day. Both are
[exponentially (weighted) moving averages][ewmawiki] of the stress of your
individual activities.[^simplifiedimpulsresponse] You can read that Wikipedia
link for an explanation, or continue reading here.


The exponentially weighted moving average works as follows. Each of your
activities has a stress number associated to it from some metric you decided on
(distance, TRIMP, ...). Next each of these activities has to be given a weight:
how much of an influence does the activity still have on how you are feeling
today? Today's workout is given a certain weight. Yesterday's workout is given
a slightly lower weight. The one from two days ago even lower. This goes on and
on as long as there is data. The further back the workout, the less meaningful
it will be for today's accumulated stress that you are calculating, but it will
still be factored into things. So what is the actual formula to find out how
stressed you are today? For that, consider the following recursive formula
(shamelessly copied from Wikipedia).

$$
S_1 = Y_1
$$

$$
S_n = \alpha Y_n + (1 - \alpha) S_{n-1}
$$

The Y series are the stress metrics for each day, in other words, the distance,
the TRIMP score, ... The first element in the Y series would be the stress from
your first workout ever. The calculated S series is the accumulated stress. If
you work it out, you find that the weight w of a workout d days ago accounts
for the following in the final S you are calculating.

$$
\alpha (1 - \alpha)^d * w
$$

So what is the α? It essentially decides how much of an influence the older
activities will still have. It can have a value from 0 to 1. The higher the α,
the more emphasis is given on recent activities. Two defaults often pop up for
ATL and CTL. For ATL, the α is usually set at 1/7. For CTL, this is 1/42.
Important to note: the α can depend on the athlete. Not everyone's body reacts
the same way to stress.

Let's work through a contrived example to give you an idea how to use this
information. Say you started working out one week ago.  You ran 3 km, 5 km, 3
km, 6 km, 0 km, 8 km, 5 km. The associated stress levels for these are
calculated by your metric of choice. Here are some numbers I made up: 10, 20,
10, 30, 0, 50, 20. This would be your Y series. Now you can plug the numbers
into the formula in order to get the accumulated stress on every day.

|Day|Distance|Stress|ATL|CTL|
|---|--------|------|---|---|
|1|3|10|10|10|
|2|5|20|11.4|10.2|
|3|3|10|11.2|10.2|
|4|6|30|13.9|10.7|
|5|0|0|11.9|10.4|
|6|8|50|17.4|11.4|
|7|5|20|17.7|11.6|

You will need more activities before the numbers become meaningful, but I hope
you get the idea. Any sports tracking application worth its money will have all
of this built in, so hopefully you do not often have to think about the
details. Often these also enable you to provide your own stress starting value.
In such a case it will set S1 to this value, then continue with the formula as
usual from there on.

What it boils down to though, is that you have two numbers describing your body
on a given day. As mentioned before, it is then a matter of comparing these
two. In general, this is done through subtracting ATL from CTL. This is
referred to as your Training Stress Balance (TSB). If TSB < 0, you are inducing
more stress, you might be more fatigued. If TSB > 0, the stress is lighter than
it has been, you might feel more rested. I am unsure if there is a standard
number to watch out for here.

ATL is sometimes referred to as your fitness, CTL as your fatigue. Their
difference, TSB, may be referred to as your current form.

### Ramp Rate

Sudden increases in CTL may mean you are heading for an injury. A metric to
keep track of these increases is the Ramp Rate. Really all this does is
subtract the first CTL of a period from the final CTL of that period. That
number is then normalised to time. Say after 4 weeks your CTL is 20 points
higher than it was at the start. That's a Ramp Rate of 5 per week.

## Further Reading

I read various other things to make this post, you might want to do so too.

* [http://forum.slowtwitch.com/forum/Slowtwitch_Forums_C1/Triathlon_Forum_F1/Help_me_understand_the_pmc_calculations_of_ctl_and_atl_P5530452/](http://forum.slowtwitch.com/forum/Slowtwitch_Forums_C1/Triathlon_Forum_F1/Help_me_understand_the_pmc_calculations_of_ctl_and_atl_P5530452/)
* [https://www.trainingpeaks.com/blog/why-ramp-rate-is-an-important-training-metric/](https://www.trainingpeaks.com/blog/why-ramp-rate-is-an-important-training-metric/)
* [http://www.joefrielsblog.com/2015/06/part-1-chronic-training-loadso-what.html](http://www.joefrielsblog.com/2015/06/part-1-chronic-training-loadso-what.html)
* [https://www.trainingpeaks.com/blog/applying-the-numbers-part-1-chronic-training-load/](https://www.trainingpeaks.com/blog/applying-the-numbers-part-1-chronic-training-load/)
* [https://www.trainingpeaks.com/blog/the-science-of-the-performance-manager/](https://www.trainingpeaks.com/blog/the-science-of-the-performance-manager/)
* [https://www.beredatraining.com/golden-cheetah/](https://www.beredatraining.com/golden-cheetah/)
* [https://atp.beredatraining.com/everything-ramp-rates/](https://atp.beredatraining.com/everything-ramp-rates/)
* Some playing around with ATL/CTL alpha value
  [https://docs.google.com/spreadsheets/d/1HmoaPjfEVsLyhA4owvr9VMPrQ0y90klQAP-GFNcIjpc/edit#gid=0](https://docs.google.com/spreadsheets/d/1HmoaPjfEVsLyhA4owvr9VMPrQ0y90klQAP-GFNcIjpc/edit#gid=0)

TODO: A small image of the pipeline run data -> number for a run -> number for a period, might be helpful.

[ewmawiki]: https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average "Moving average - Wikipedia"
[^stravasufferscoredecoded]: [https://djconnel.blogspot.com/2011/08/strava-suffer-score-decoded.html](https://djconnel.blogspot.com/2011/08/strava-suffer-score-decoded.html)
[^stravabloghowhardishard]: [https://blog.strava.com/suffer-score-how-hard-is-hard-11775/](https://blog.strava.com/suffer-score-how-hard-is-hard-11775/)
[^govsspaper]: P.F. Skiba, Calculation of Power Output and Quantification of Training Stress in Distance Runners: The Development of the GOVSS Algorithm. 2006. Available at [http://runscribe.com/wp-content/uploads/power/GOVSS.pdf](http://runscribe.com/wp-content/uploads/power/GOVSS.pdf)
[^simplifiedimpulsresponse]: The use of exponential weighted moving average is a simplification of the impuls-response formula proposed by Bannister et al.
