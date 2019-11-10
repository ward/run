---
layout: post
title: "Daniels' VDOT formulae"
date: 2019-11-10 06:00:00
tags:
- nerding
- vdot
- vo2max
- math
- jack daniels
---

I was playing around a bit with trying to find a simple exponential fit to the
VDOT values described in Jack Daniels' book "Daniels' Running Formula", because
how else would one spend a Saturday afternoon? Using VDOT values from 30
through 85 as well as the associated 5000m times, I got an alright fit, but it
looked definitely lacking the nearer you got to the extremes. A difference of
10 seconds is not good enough. Especially since you _know_ JD used some formula
to generate the numbers to begin with. I did not easily find the exact
scientific paper in which JD first describes these things in detail, but
luckily [some guy on the internet _had_ come across things in an older book of
JD][simpson]. The articles he wrote on it are a bit wordy, so I decided to jot
down notes of the essence as well as trying it out in Python. For the Python
snippets, I assume you have the numpy and scipy libraries setup.

## Building Blocks

A first formula is the \\(o2cost\\). Given a certain velocity \\(v\\) in meters
per minute, it gives you the oxygen cost in ml of oxygen per kg of the runner's
weight per minute. The inefficiencies in running economy of a runner naturally
will change this somewhat, so in reality you are really just looking at the
VDOT values JD considers in his books.


\\[
o2cost(v) = 0.000104 * v^2 + 0.182258 * v - 4.6
\\]

```python
def o2cost(velocity):
    return 0.182258 * velocity + 0.000104 * velocity * velocity - 4.6
```

A second formula to consider is the drop dead formula. It tells you at what
maximum percentage of oxygen cost one can run for time \\(t\\).

\\[
dropdead(t) = 0.2989558 * e^{-0.1922605 * t} + 0.1894393 * e^{-0.012778 * t} + 0.8
\\]

```python
import numpy as np

def drop_dead_formula(time):
    return 0.2989558 * np.exp(-0.1922605 * time) + 0.1894393 * np.exp(-0.012778 * time) + 0.8
```

## Clicking Things Together

### Racing

Using these two formulae, you can get to work. First off you consider the
situation where you just ran a race. You are curious what your VDOT is. Well,
you now know the o2cost of the velocity you ran. You also know what percentage
of your "absolute" number it took to run for as long as you did. Combining that
information gives you the following formula in function of your distance
\\(d\\) in meters and your time \\(t\\) in minutes.

\\[
vdot(d, t) = \frac{o2cost(d / t)}{dropdead(t)}
\\]

```python
def vdot(distance, time):
    cost = o2cost(distance / time)
    pct = drop_dead_formula(time)
    return cost / pct
```

Once you know your VDOT, you are evidently interested in what you can run in
another race. Rewriting the above formulae to isolate \\(t\\) is, to be frank,
a pain. Instead we will be lazy and apply a numerical method on the
\\(vdot(d,t)\\) formula. Specifically, we can apply [Newton's
Method](https://en.wikipedia.org/wiki/Newton%27s_method) for finding roots and
use it on the following. In this formula, \\(t\\) is the only variable.
Distance \\(d\\) and your \\(vdot\\) are known.

\\[
\frac{o2cost(d / t)}{dropdead(t)} - vdot
\\]

```python
from scipy.optimize import newton

def time_estimate(vdot, distance):
    return newton(lambda t: o2cost(distance / t) / drop_dead_formula(t) - vdot, 6, maxiter=100)
```

For the Python code, the `6` is an initial guess. The `maxiter` I added during
playing around and am now too lazy to check whether it is really required.

### Training

TODO: Estimating the `%` used for the different training intensities, the formulae

TODO: Some examples.
<script type="text/javascript" id="MathJax-script" async src="/assets/js/mathjax.3.0.0.tex-svg.js"></script>

[simpson]: http://simpsonassociatesinc.com/runningmath1.htm "The Daniels/Gilbert Formula - Larry Simpson on the web"
