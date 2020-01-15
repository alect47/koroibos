# Koroibos

#### Contributors:
* [Alec Wells](https://github.com/alect47)

A solo project completed in 2 days during Module 4 of Backend Engineering at Turing School of Software and Design.

This Express api uses olympic data to exposes endpoints that return olympians data as well as events data.  The data format adheres to project specs provided by our instructors for each sprint.

## Areas of focus:
* Create an Express API given specified endpoints and response formats
* Testing using Jest, with coverage at or above 95%
* Project management using [GitHub Projects](https://github.com/alect47/koroibos/projects)
* Advanced git workflow using development, staging and production environments
* Agile workflow - building project in sprints, writing detailed user stories
* Deploying to staging and production environments each feature only after it was fully tested and functional in development.

## Tech Stack

* [Express for Node.js](https://expressjs.com/)
* [JavaScript](https://devdocs.io/javascript/)
* [Jest](https://jestjs.io/)
* [Knex.js](http://knexjs.org/)
* [PostgreSQL](https://www.postgresql.org/)

## Local Setup

Before cloning the repository:
* Download [Postman](https://www.getpostman.com/)

To get set up:
* `git clone git@github.com:alect47/koroibos.git`
* `npm install` to install necessary dependencies
* Install all dependences by navigating to the root directory in your terminal and running npm install
* Run psql in your terminal and run CREATE DATABASE olympians_dev; to create your PostgreSQL database
* Run the following command in psql to import the Olympians' data into the database
```
psql
\c olympians_dev
copy olympians (name, sex, age, height, weight, team, games, sport, event, medal) FROM 'oly
mpic_data_2016.csv' WITH (FORMAT CSV, DELIMITER',', null 'NA')


\copy events (sport, event) FROM 'new_new_new_events.csv' WITH (FORMAT CSV, DELIMITER',', null 'NA');Run table migrations with
```

To run the server: `npm start`
* Local server: `http://localhost:3000`
* Production site: `https://koroibos-final-alec.herokuapp.com/`

#### Migrations
Once you have your database setup, you’ll need to run some migrations. You can do this by running the following command:

`knex migrate:latest` for development


#### Set up your test database
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q
```

`knex migrate:latest --env test`


#### Running your tests
Running tests are simple and require you to run the following command below:

`npm test`

When the tests have completed, you’ll get a read out of how things panned out.

## Running in Postman
In Postman, append the url to expose the below endpoints or click the `Run in Postman` button.


### Endpoints

* GET api/v1/olympians

* Expected Ressponse:
```
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
      {...}
    ]
}
```

* `GET api/v1/olympians?age=youngest`

```javascript
//Response Format
{
  [
    {
      "name": "Ana Iulia Dascl",
      "team": "Romania",
      "age": 13,
      "sport": "Swimming"
      "total_medals_won": 0
    }
  ]
}
```

* `GET api/v1/olympians?age=oldest`

```javascript
//Response Format
{
  [
    {
      "name": "Julie Brougham",
      "team": "New Zealand",
      "age": 62,
      "sport": "Equestrianism"
      "total_medals_won": 0
    }
  ]
}
```

* `GET api/v1/olympian_stats`

```javascript
  {
    "olympian_stats": {
      "total_competing_olympians": 3120
      "average_weight:" {
        "unit": "kg",
        "male_olympians": 75.4,
        "female_olympians": 70.2
      }
      "average_age:" 26.2
    }
  }
```

* `GET api/v1/events`

```javascript
//Response Format
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}
```

* `GET api/v1/events/:id/medalists`

```javascript
//Response Format
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```

## Database Schema

<a name="db-schema"/>

![db_diagram.png](./db/schema_diagram/db_diagram.png)

