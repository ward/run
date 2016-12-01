Repository for a blog about my running. Blog is handled by
[Jekyll](https://jekyllrb.com/) and as such a static website. Jekyll requires
Ruby to be installed.  Cleanest way to install Ruby is, in my opinion, with
rbenv and ruby-build. Look at their respective manuals to install.  This will
enable installation and usage of the correct Ruby version as defined in
`.ruby-version`.  You then need to install Jekyll on that Ruby version with
`gem install jekyll`. In the future I probably will switch to using Bundler for
this and other dependencies. If you see a Gemfile in the root folder, then I
already have and this part of the README is outdated.

With everything installed, you can use `jekyll serve` for some live viewing or
just `jekyll build` if you want the result.
