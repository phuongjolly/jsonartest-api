This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

http://test.phuongjolly.com

### Solution
Using NodeJs, MySQL for implementation. IDE: WebStorm.

Completed features:
 - Authenticate and use jwt
 - Get customers with filter params
 - Get Order detail and Production detail with filter params

### Configuration

in `Connection.mjs`, change:
```
host: process.env['MYSQL_HOST'] || "localhost",
user: process.env['MYSQL_USER'] || "root",
password: process.env['MYSQL_PASSWORD'] || "root",
database: process.env['MYSQL_DB'] || 'classicmodels'
```

### Run locally

This project uses `restify` framework.
You can use IDE like WebStorm to open the project or follow these steps to run the application.

Install dependencies:

```
yarn install
```

Start website locally:

```
yarn start
```
### Deploy using docker

Build docker image:

```
docker build . -t phuongjolly/sonar-api

```

Push docker image to repository:

```
docker push phuongjolly/sonar-api
```

Deploy the website on the server:

```
docker run phuongjolly/sonar-api
```

## Deploy using Rancher 

Download from: https://rancher.com/docs/rancher/v2.x/en/installation/

