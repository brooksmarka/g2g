#!/bin/bash

# Get the current git branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Define your Amplify environments
MAIN_ENV="main"
DEV_ENV="dev"

# Check the branch and switch the Amplify environment accordingly
if [ "$BRANCH" == "main" ]; then
  echo "Switching to the main Amplify environment"
  amplify env checkout $MAIN_ENV
else
  echo "Switching to the dev Amplify environment"
  amplify env checkout $DEV_ENV
fi
