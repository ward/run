Repository for a blog about my running.

# Compile

Blog is handled by [Jekyll](https://jekyllrb.com/) and as such a static
website.

## Dependencies

1. Install rbenv and ruby-build.
2. Use rbenv to install the ruby version specified in `.ruby-version`.
3. Install bundler in that ruby: `gem install bundler`.
4. Install jekyll and other dependencies: `bundle`.

## Usage

With everything installed, you can use `bundle exec jekyll serve` for some live
viewing or just `bundle exec jekyll build` if you want the result.
