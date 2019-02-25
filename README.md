# Trade API

A brokerage company's accounts and trading management platform. One requirement is for a REST API service to manage trades using the Nodejs Express framework with MongoDB

## Getting Started

Follwoing npm packages used to develope this project

|NPM package    | Version       | Description   |
| ------------- | ------------- |-------------- |
| body-parser   | 1.18.3        | Read request from Json    |
| dotenv        | 6.2.0         | Get enviroment variables  |
| expect        | 24.1.0        | Unit testing values chack |
| express       | 4.16.4        | Nodejs api framwork       |
| helmet        | 3.15.1        | Rest API Security  |
| lodash        | 4.17.11       | Library delivering consistency, modularity, performance  |
| moment        | 2.24.0        | Display dates and times  |
| moment-timezone| 0.5.23       | moment with TimeZone  |
| mongodb       | 3.1.13        | mongodb   |
| mongoose      | 5.4.15        | mongodb ORM  |
| validator     | 10.11.0       | validatate the input  |
| random-number | 0.0.9         | create random number |
| winston       | 3.2.1         | create Logs |
| chai          | 4.2.0         | create Unit test case  |
| chai-http     | 4.2.1         | create Unit test case for http request |
| mocha         | 3.2.1         | create Unit test case |
| connect       | 3.6.6         | connect http server |
| js-yaml       | 3.12.1        | yaml to js  |
| swagger-tools | 0.10.4        | swagger-tools impementation |
| swagger-ui-express | 4.0.2    | swagger access express js  |
| yamljs | 0.3.0   | reading yaml files|


### Prerequisites

please install node server in your local machine and mongoDB (version 4.0.2) for mongodb GUI tool install Robomongo and API test Insomina rest client

### Installing

A step by step series of examples that tell you how to get a development env running

install API server and swagger npm package  using below command ( inside apiserver and swagger folders)

```
npm i --save
```

if you run npm port no and db config path and status code are all  get from .env file.

![image](https://user-images.githubusercontent.com/14818202/53307846-6624a800-38c2-11e9-9170-59cb47723da4.png)


Run swagger UI for API Documentation

```
npm start
```
![image](https://user-images.githubusercontent.com/14818202/53307880-b3a11500-38c2-11e9-8f14-0f4858cd395d.png)


![swagger ui](https://user-images.githubusercontent.com/14818202/53307932-1c888d00-38c3-11e9-9bf3-c7d6ad24a494.png)


## Running the tests

For run unit test  

```
npm test  
```
![image](https://user-images.githubusercontent.com/14818202/53307980-9a4c9880-38c3-11e9-9585-0ac8d20fab34.png)


### Code Patterns

For Api  - MVC with Moduler Design Patterns

For Swagger -  Moduler Design Patterns

For Api unit Testing -  Moduler with AAA Design Patterns


<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc -->
