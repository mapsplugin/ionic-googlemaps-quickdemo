#!/bin/bash

GMAPS_DIR_PATH=$1
if [ -z "${GMAPS_DIR_PATH}" ]; then
  echo "Usage:"
  echo " $> npm run link (path_to_@ionic-native/google-maps directory)"
  exit 0
fi

CHECK=`ls -l ${GMAPS_DIR_PATH}/package.json 2>&1`

if [[ $CHECK = *"No such file or directory"* ]]; then
  (>&2 echo "There is no package.json at ${GMAPS_DIR_PATH}")
else
  rm -rf node_modules/\@ionic-native/core
  rm -rf node_modules/\@ionic-native/google-maps

  # cp -R ${GMAPS_DIR_PATH}/dist/\@ionic-native/core node_modules/\@ionic-native/
  npm link ${GMAPS_DIR_PATH}/dist/\@ionic-native/core
  npm link ${GMAPS_DIR_PATH}/dist/\@ionic-native/google-maps
fi
