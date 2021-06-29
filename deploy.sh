#!/bin/bash

# abort on errors
set -e

npm run build

npm run deploy

# git init
# git remote add origin https://github.com/CICCIOSGAMINO/amplify-login.git

git add -A
git commit -m 'deploy'

git push -u origin master

# deploy on firebase hosting too (.firebaserc for setting the project)
# firebase deploy --only hosting