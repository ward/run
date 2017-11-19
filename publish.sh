#!/bin/sh

SRC=./_site/
DST_REMOTE=vps
DST_FOLDER=/var/www/run.wxm.be/

bundle exec jekyll build

rsync -e ssh -r --checksum --progress $SRC $DST_REMOTE:$DST_FOLDER
