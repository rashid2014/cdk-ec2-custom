#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CdkEc2CustomStack } from '../lib/cdk-ec2-custom-stack';

const app = new cdk.App();
new CdkEc2CustomStack(app, 'CdkEc2CustomStack');
