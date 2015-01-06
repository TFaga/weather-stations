#!/usr/bin/env sh

# Deploy to beta server
if [[ $TRAVIS_TAG != "" && $TRAVIS_PULL_REQUEST == "false" ]];then

	git config --global user.email "travis@travis-ci.org";
	git config --global user.name "travis";

	git remote add azure https://$AZ_USER:$AZ_PASS@$AZ_BETA.scm.azurewebsites.net:443/$AZ_BETA.git;

	git checkout -b deploy $TRAVIS_TAG

	git push -f azure deploy:master > /dev/null;
fi
