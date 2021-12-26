#!/bin/bash

# Works fine for landscape pictures. For portrait pictures, they come out
# sideways by default it seems. Open the original in macos preview, flip it
# four times (so it is the right way up again) and save the file. Now if you
# convert it, it should be correct. Note that you need to change the resize
# flag to `0 800` for portraits then.

# Looks for jpg files in the defined directory and turns them to webp
FOLDER="."

for file in $(ls -1 $FOLDER/*.jpg); do
  # Might want to add -preset photo (as first option)
  cwebp -resize 800 0 $file -o ${file/.jpg/.webp}
done
