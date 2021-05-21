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

## Adding Images

When adding an image, it is advised to

- Shrink the image, no point in 4000x3000 pixels when it shows up way smaller
  in the blog. The following keeps the aspect ratio. `newimgfile` can be equal
  to `imgfile`.

    ```
    convert imgfile -resize 800x800 newimgfile
    ```
- Scrub geodata from the image (and other things?)

    ```
    exiftool -geotag= imgfile
    ```
- Make pngs smaller, use pngquant or similar.
