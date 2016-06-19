#!/bin/sh

SRC=./_site/
DST_REMOTE=ward@wxm.be
DST_FOLDER=/var/www/run.wxm.be/

jekyll build

rsync -e ssh -r $SRC $DST_REMOTE:$DST_FOLDER
