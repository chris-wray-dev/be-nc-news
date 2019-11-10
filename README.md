# Project Title

NC News - API.

A news aggregation back-end API.

## Getting Started

This API is hosted at the following link https://chris-nc-news.herokuapp.com/api/

If you would prefer a local version please follow the isntructions below.

### Prerequisites

To install this API on your local machine you will need basic command line skills. You will also need npm package manager installed on your machine. 

### Installing

1. Fork the repo into your own GitHub account.  
2. Clone the repo onto your local machine by navigating to your preferred directory in the command line and typing in the command

git clone [your forked repo url here]

3. cd into the repo and install all dependencies by typing the command "npm install".
4. You will need to install Postgresql onto your machine.  Please follow the instructions for your OS here...
https://www.postgresql.org/download/

5. setup the DB by running the command "npm run setup-dbs"
6. Seed the data by running the command "npm run seed"
7. Start the app by typing the command "npm start"

To get the full functionality of the API you will need to access it using a REST client such as Insomnia.  Navigate to localhost:9090/api to access details of all the endpoints and methods available.

## Running the tests

Testing for this project was completed using mocha, chai and supertest.  Test files can be found in the 'spec' folder.  Running the command 'npm test" will run these tests.

## Built With

* [postgresql](https://www.postgresql.org/) - The database used
* [express](https://expressjs.com/) - Node framework used
* [knex](http://knexjs.org/) - Used to query the database
