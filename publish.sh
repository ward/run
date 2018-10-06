#!/bin/sh

SRC=./_site/
DST_REMOTE=vps
DST_FOLDER=/var/www/run.wxm.be/

bundle exec jekyll build

rsync -4 -r --checksum --progress $SRC $DST_REMOTE:$DST_FOLDER
