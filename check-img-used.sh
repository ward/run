#!/bin/bash

# Looks for files in the img directory that are not referenced by any other
# file. Those may possibly be removed. Note: we don't currently search the
# _drafts/ folder for references!

for file in $(find assets/img -type f); do
  if rg -q $file _posts/ ; then
    true
  else
    echo "$file not mentioned."
  fi
done
