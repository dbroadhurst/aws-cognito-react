# AWS Cognito React

AWS Cognito React was written to provide a common base to add user authentication and eventually autherization to any web app. My long term goal is to develop this library into a common framework that lets developers work on app features from day 1 rather than getting bogged down with user authentication. The library uses AWS Cognito so there's no servers to setup. To customize AWS Cognito only requires one config change in the app code.

## Getting Started

````bash
git clone https://github.com/dbroadhurst/aws-cognito-react
cd aws-cognito-react/app
npm install
npm run start
````

Your browser should open at 

````
http://localhost:3000
````

The app uses [create-react-app](https://github.com/facebookincubator/create-react-app) as it's start kit

## AWS Cognito Setup

The AWS guide can be found [here](http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-the-javascript-sdk.html)

Once your account is setup update the config file in src/components/Auth/Auth.js

## Description

AWS Cognito react is a refereance app that's shows how to implement AWS Cognito. This App uses 

[aws-cognito-redux-saga](https://www.npmjs.com/package/aws-cognito-redux-saga) 

[aws-cognito-promises](https://www.npmjs.com/package/aws-cognito-promises) 

to simplify interaction with the AWS libraries and provide redux and promise support 

You can find a working example [here](http://cognito.dbroadhurst.net) 

![Signed In](https://s3-us-west-2.amazonaws.com/union25-public/cognito.png) 

## Roadmap
Currently signin, signout, signup and confirmation are supported with other features to follow. Next I will ass change password followed by SMS confirmation

