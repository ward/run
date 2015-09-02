#!/bin/sh

SRC=./_site/
DST_REMOTE=ward@wardje.eu
DST_FOLDER=/var/www/wardje.eu/run/

jekyll build

rsync -e ssh -r $SRC $DST_REMOTE:$DST_FOLDER
