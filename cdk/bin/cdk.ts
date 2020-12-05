#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { CdkStack } from '../lib/cdk-stack'

require('dotenv').config()

const app = new cdk.App()
new CdkStack(app, 'CdkStack')
