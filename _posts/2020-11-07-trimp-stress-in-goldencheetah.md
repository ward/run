---
layout: post
title: "TRIMP Stress in GoldenCheetah"
date: 2020-11-07 08:00:00
tags:
- goldencheetah
- training stress
- trimp
---
<script type="text/x-mathjax-config">
// Adding $blab$ for inline math
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
  },
});
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>

GoldenCheetah provides three different TRIMP metrics for an activity: TRIMP
points, TRIMP(100) points, and TRIMP Zonal points. In its trend view, one of
these is used to show you your training stress over time through the metrics
TRIMP Short Term Stress Balance, TRIMP Long Term Stress Balance, and TRIMP
Stress Balance. I assumed (correctly) that it was TRIMP points, but confirming
this suspicion took more effort than I expected as I found a slight difference
between how GoldenCheetah calculates stress and how I have been doing it. The
difference is what I wanted to document here.

## Quick Overview of Stress

I have [some notes][measuringstress] that go into more detail on measuring
stress, but I figured it would be useful to provide a summary here. Tracking
stress comes in two parts:

1. Assign a number to an activity. The number indicates how much stress the
   activity placed on the body. In the context of this post, we will consider
   TRIMP values. How exactly these are calculated does not necessarily matter
   here.
2. Summarise these numbers over time. These numbers may then indicate, for
   example, your Long Term Stress (LTS, form) or your Short Term Stress (STS,
   fatigue). This summary was slightly different than what I was used to.

## Summarising Stress

What I [had documented][measuringstress] as the more popular approach, was the
following formula. In it, $Y_n$ is the stress on a given day and $S_n$ is the
accumulated stress on that day.

$$
S_1 = Y_1
$$

$$
S_n = \alpha Y_n + (1 - \alpha) S_{n-1}
$$

The $\alpha$ is defined in terms of the number of days you find
important: $\alpha = 1 / d$. For short term stress, you would
keep the number of days low (default seems to be 7, so $\alpha =
1/7$). For long term stress, you would keep the number of days a bit
higher (default seems to be 42, so $\alpha = 1/42$).

## In GoldenCheetah

So to find out which of the three TRIMP activity stresses was being used, I
figured I would just throw the numbers in and see which matched. None did.
There seems to be little documentation in the GUI around this, so I dug into
the code. In `src/Metrics/PMCData.cpp`, I found the following

```C++
double lte = (double)exp(-1.0/ltsDays_);
double ste = (double)exp(-1.0/stsDays_);

// Bunch of code snipped

// LTS
if (day) lastLTS = lts_[day-1];
lts_[day] = (stress_[day] * (1.0 - lte)) + (lastLTS * lte);

// STS
if (day) lastSTS = sts_[day-1];
sts_[day] = (stress_[day] * (1.0 - ste)) + (lastSTS * ste);
```

Do not worry if you have trouble reading that. The conclusion here is that
GoldenCheetah does *not* use $\alpha = 1 / d$. Instead they set

$$
\alpha = 1 - e^{-1/d}
$$

The difference in the resulting $\alpha$ is pretty small, but it is a
difference nonetheless. With the recursive way stress is calculated, this also
leads to the difference accumulating. I am not really sure why they use this
value as $\alpha$. Likely there is some other paper I missed, I am no expert
either. Of course, for all these metrics, you should tweak them in function of
how you actually feel. That also counts for this $\alpha$, the recovery of an
older person is not the same as for a younger person.

## TRIMP

I used that adjusted stress formula to see which activity metric matches up to
the stress metrics. This was just some trial and error of throwing the numbers
in. TRIMP won out. For completeness sake, I will explicitly state what this
TRIMP score signifies. As mentioned in GoldenCheetah, this is the "Training
impulse according to Morton/Bannister with Green et al coefficient".

Calculating it is just a matter of throwing together some information from your
activity.  First grab the average heart rate and see how it stacks up to your
maximum and resting heart rate.

$$
HR_{rel} = \frac{HR_{avg} - HR_{rest}}{HR_{max} - HR_{rest}}
$$

Then combine that relative heart rate with the time you spent exercising and a
$k$ adjusted to your sex: $1.92$ for men, $1.67$ for women.

$$
TRIMP = t_{min} * HR_{rel} * 0.64 * exp\left( k_{sex} * HR_{rel} \right)
$$

[measuringstress]: {{ site.baseurl }}/notes/measuring-training-stress.html
