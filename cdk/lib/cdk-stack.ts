import * as cdk from '@aws-cdk/core'
import * as cognito from '@aws-cdk/aws-cognito'

// https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const userPool = new cognito.UserPool(this, 'test-user-pool', {
      signInAliases: {
        email: true,
        username: true,
      },
      // standardAttributes: {
      //   profilePicture: { mutable: true },
      // },
      // customAttributes: {
      //   isEmployee: new cognito.BooleanAttribute({ mutable: true }),
      // },
      passwordPolicy: {
        minLength: 8,
        requireDigits: false,
        requireLowercase: false,
        requireSymbols: false,
        requireUppercase: false,
      },
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
      },
    })

    const client = userPool.addClient('app-client')

    new cdk.CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    })

    new cdk.CfnOutput(this, 'userPoolClientId', {
      value: client.userPoolClientId,
    })
  }
}
