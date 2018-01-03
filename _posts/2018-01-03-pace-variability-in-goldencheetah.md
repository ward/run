---
layout: post
title: "Pace Variability in GoldenCheetah"
date: 2018-01-03 18:00:00
tags:
- goldencheetah
---

This post will only be relevant to you if you are a user of
[GoldenCheetah][goldencheetah]. If you are not, go check it out or maybe let
this post convince you.

In [Smashrun][smashrun]'s Pro plan, they provide you with a metric (and badges
for it) called Pace Variability (or call it Speed Variability if you prefer).
The way I understand this, they do the following: They look at the pace during
your run in 10 second intervals. They then calculate the absolute average
deviation over these intervals. Finally they divide this absolute average
deviation by the average pace over the run. This ratio is the variability they
use.

Interested by the idea, I decided to see if I could add it myself to
GoldenCheetah. This seemed to be easy enough as a User Metric. In Preferences,
go to Metrics -> Custom, and add one. Use the following meta information:

- Symbol: `Pace_Variability`
- Name: Pace Variability
- Type: Total
- Precision: 10, Time checked. This is the size of the samples used by
  GoldenCheetah, we want to work with samples each 10 seconds long. Depending
  on your preference, you can change this value to be smaller or larger.
- Metric Units: `%`
- Imperial Units: `%`
- Conversion Factor: `1.000`
- Conversion Sum: `0.000`

Finally, we need some code to define the metric. The explanation of their
language can be found [on their GitHub wiki][ghwiki].

Program:

```
{
  # initialise aggregating variables
  init {
    # Average_Speed is a built-in metric for the entire activity
    avgspeed <- Average_Speed;
    samplecount <- 0;
    total_diff <- 0;
  }

  # For every sample, do the following
  # (see "Precision" value to see how big samples are)
  sample {
    # SPEED is specific to the sample
    diff <- fabs(avgspeed - SPEED);
    total_diff <- total_diff + diff;
    samplecount <- samplecount + 1;
  }

  # calculate metric value at end
  value {
    avgdeviation <- total_diff / samplecount;
    avgdeviation / avgspeed * 100;
  }

  # Not sure what this one does
  count { samplecount; }
}
```

After adding the metric, GoldenCheetah will require a restart for the new
metric to take effect. After restarting, it will calculate this metric for
every activity present. This part may take a while depending on how many
activities you have. Finally, you are able to use this metric like you can any
other built-in metric. For example to create graph or just to show the value
somewhere.

[goldencheetah]: http://www.goldencheetah.org/
[smashrun]: http://smashrun.com/ward
[ghwiki]: https://github.com/GoldenCheetah/GoldenCheetah/wiki/UG_Special-Topics_Formula-Syntax-and-Expressions
