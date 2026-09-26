import { Duration, Stack, StackProps } from 'aws-cdk-lib/core';
import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class CdkEc2CustomStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueForStringParameter(
      this,
      '/project/custom/vpc/id'
    );

    const subnet1Id = ssm.StringParameter.valueForStringParameter(
      this,
      '/project/custom/public/subnet1/id'
    );

    const ec2SGId = ssm.StringParameter.valueForStringParameter(
      this,
      '/project/custom/ec2/sg/id'
    );

    const vpc = ec2.Vpc.fromLookup(
      this, 'ExistingVpc', {
      vpcId: vpcId,
    });
    
    const subnet1 = ec2.Subnet.fromSubnetId(
      this,
      'ExistingSubnet',
      subnet1Id
    );
    
    const ec2SG = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      'ExistingEC2SG',
      ec2SGId
    );

    const instance = new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      vpcSubnets: { 
        subnets: [subnet1]
       },
      securityGroup: ec2SG
    });

  }
}
