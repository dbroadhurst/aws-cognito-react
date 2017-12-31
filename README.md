# aws-cognito-react

Reference implementation / boilerplate for AWS Cognito user management

![signin](https://s3-us-west-2.amazonaws.com/union25-public/aws-cognito-login.png)

## Introduction

I would like to start every project knowing user management is taken care of so I can focus on making a great app. I want a service that will scale and not require extra back-end management / development. I want to be able to customize the look for new apps and control the state a flow

aws-cognito-react primary goal is to provide user management services for a web App in a scalable serverless way.

## Install

```bash
git clone git@github.com:dbroadhurst/aws-cognito-react.git
npm install
cd aws-cognito-react/app
npm run start
```

Your browser should open at

```
http://localhost:3000
```

## AWS Cognito Setup

Once your account is setup update the config file in src/components/Auth/Auth.js

## Description

My original idea was to provide user management as a package but it became clear adding user management to an existing project is tricky. If you are in the position where you need to retro fit user management to an existing project then this project will help but the cleanest path is to start with this project as a boilerplate. The project has been setup using create react app which is currently the most robust way to setup a react project.

The stack has 3 layers that help provide an opportunity to extend and even replace sections of the stack.

[aws-cognito-react](https://github.com/dbroadhurst/aws-cognito-react) front-end boilerplate

[aws-cognito-redux-saga](https://github.com/dbroadhurst/aws-cognito-redux-saga) asynchronous code management

[aws-cognito-promise](https://github.com/dbroadhurst/aws-cognito-promises) promise wrappers for the AWS Cognito SDK

The AWS guide can be found [here](http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-the-javascript-sdk.html)

You can find a working example [here](http://cognito.dbroadhurst.net)

## Road map

* Password update - Done
* Social identity integration
* Authenticated routes
* Authorized routes
* Get help from contributors
* Provide ability for administrators to add new users
