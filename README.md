Amplify - Login
===============
[TOC]

AWS Amplify & Cognito Login example. In this simple example will be deeper into the use of Cognito, Users Pool and Auth / Ident on AWS platform.

# Vite
# Vite
First action of course, boostrap an Vite WebApp environment. In this case we start with Lite project.

```bash
#choose the project name eg. amplify-login
lite amplify-login

npm install

# use Vite dev server
npm run dev
# build into dist folder
npm run build
# preview with the build files
npm run preview
```


# AWS
Configure amplify,  you need to configure the user will handle the amplify project. IAM roles are a secure way to grant the Amplify Console permissions to act on resources in your account. To get all docs you need about the Amplify Console follow:

https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html

```bash
# if need to install amplify CLI
# npm i -g @aws-amplify/cli

# configure the amplify project (choose / create the AWS user will handle the project on AWS)
amplify configure

# This requires you to sign in and then takes you through questions to set up 
# Amplify for your project.
```

## Initializing the Back End
You need to add backend components such as a database and also authentication to your application. You can use AWS Cognito to authenticate users, and GraphQL endpoints to interact with the DB. Now we’ll use the AWS Amplify CLI to initialize these components to support our app:

```bash
amplify init

# some amplify commands
amplify status
# allow you to add features
amplify add <category>
# build all your local backend resources and provision it in the cloud
amplify push
# open the Amplify Console and view your project status
amplify console
# build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
amplify publish

# Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

## Hosting
The core library for interacting with AWS services in applications is **aws-amplify** . The CLI only creates back-end services. This library controls how the application connects to the back end and triggers actions. So install it:

```bash
# project root
npm install --save aws-amplify

# adding hosting to your project
amplify hosting add
```

## Authentication & Cognito
Authentication with Amplify. The Amplify Framework uses Amazon Cognito as the main authentication provider. Amazon Cognito is a robust user directory service that handles user registration, authentication, account recovery & other operations. In this tutorial, you’ll learn how to add authentication to your application using Amazon Cognito and username/password login.

https://docs.amplify.aws/lib/auth/getting-started/q/platform/js

```bash
# project root (eg. email)
amplify add auth
# deploy the service (back end)
amplify push
# view the deployed services in your project at any time,
amplify console
```

Time to start coding to login / logout the user !

