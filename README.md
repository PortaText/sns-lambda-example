[![License](http://img.shields.io/badge/license-APACHE2-blue.svg)](http://img.shields.io/badge/license-APACHE2-blue.svg)

# SNS & Lambda Example for PortaText API
This is an example of how to use the [PortaText SDK for NodeJS](https://github.com/PortaText/node-sdk) from
[Amazon Lambda](https://aws.amazon.com/lambda/details/), and trigger this code from [Amazon SNS](https://aws.amazon.com/sns/) to
easily send SMS using your PortaText account.

# Installation

## Download this code and download dependencies
```sh
$ git clone https://github.com/PortaText/sns-lambda-example.git
$ cd sns-lambda-example
$ npm install
```

## Set your API key
Edit the file index.js and change the variable "apiKey" with your own API key.

## Create the ZIP file for deploy
```sh
$ zip -r sns-lambda-example.zip *
```

## Create a Lambda Function
In your Amazon Lambda console

1. Click on "Create a Lambda Function".
2. Select NodeJS 4.3 as the runtime.
3. Click Next. Don't select a Trigger yet, we will create the SNS later on.
4. Write the name and description of your function.
5. Choose "Upload a .ZIP file" in "Code entry type".
6. Click "Upload" and select the .ZIP file created above.
7. In Role choose "Create a Custom Role", click on "Allow".
8. Click on Next, and then on "Create Function".

## Allow Amazon's IP address for your API key
In your [user panel](https://panel.portatext.com/), do one of the following:

1. Allow `0.0.0.0/0` if you don't know in advance the IP that your Lambda will use
to access the Internet (and btw this is actually *not* recommended)

2. The preferred way is to setup an Elastic IP for your Lambda function, by putting
it into a specific VPC and setting up a NAT Gateway (read more here in
[this post](http://marcelog.github.io/articles/aws_lambda_internet_vpc.html)
from our CTO [@marcelog](https://github.com/marcelog)).

## Setup your SNS Topic

1. Create a new topic in your SNS Console.
2. Add a new subscription to it. Choose `AWS Lambda` as the Protocol, and select
your new Lambda function as the Endpoint.

## Create a user with Publish permissions for the topic
You should create a user and obtain the an access key and secret so you can publish
to your new topic. The policy should be something like this:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1473859117000",
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "the_arn_for_your_topic"
            ]
        }
    ]
}
```

# Sample Payload
You can test your function by sending the following payload by clicking "Publish to Topic"
in your new SNS Endpoint.
```json
{
  "from": "one_of_your_dids",
  "to": "a_destination_number",
  "text": "hello world from Lambda"
}
```

# License
The source code is released under Apache 2 License.

Check [LICENSE](https://github.com/PortaText/sns-lambda-example/blob/master/LICENSE) file for more information.

