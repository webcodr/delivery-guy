#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Did you update the release notes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]]; then
  exit
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  yarn lint
  yarn flow
  yarn test
  yarn dist

  # commit
  git add -A
  git add -f \
    dist/*.js
  git commit -m "build: build $VERSION"
  # tag version
  npm version "$VERSION" --message "build: release $VERSION" --no-git-tag-version
  git tag "$VERSION"

  # publish
  git push origin refs/tags/"$VERSION"
  git push
  npm publish
fi
