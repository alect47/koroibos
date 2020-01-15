var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');


async function allOlympians() {
  try {
    let response = await database('olympians')
      .select('name', 'team', 'age', 'sport')
      .groupBy('name', 'team', 'age', 'sport')
      .count('medal as total_medals_won')
    return response;
  } catch(err) {
    return err;
  }
}

async function oldestOlympian() {
  try {
    let response = await database('olympians')
      .select('name', 'team', 'age', 'sport')
      .groupBy('name', 'team', 'age', 'sport')
      .count('medal as total_medals_won')
      .orderBy('age', 'desc')
      .first()

    return response;
  } catch(err) {
    return err;
  }
}

async function youngestOlympian() {
  try {
    let response = await database('olympians')
      .select('name', 'team', 'age', 'sport')
      .groupBy('name', 'team', 'age', 'sport')
      .count('medal as total_medals_won')
      .orderBy('age')
      .first()

    return response;
  } catch(err) {
    return err;
  }
}

router.get('/', (request, response) => {
  if(request.query.age === 'oldest') {
    oldestOlympian()
      .then(olympians => {
        if (olympians) {
          var data = [olympians]
          response.status(200).send({data})
        } else {
          response.status(404).json({
            error: `No olympians found`
          });
        }
      })
  }
  else if(request.query.age === 'youngest') {
    youngestOlympian()
      .then(olympians => {
        if (olympians) {
          var data = [olympians]
          response.status(200).send({data})
        } else {
          response.status(404).json({
            error: `No olympians found`
          });
        }
      })
  }
  else {
    allOlympians()
    .then(olympians => {
      if (olympians.length) {
        var data = {olympians: olympians}
        response.status(200).send(data)
      } else {
        response.status(404).json({
          error: `No olympians found`
        });
      }
    })
  }
  });

  module.exports = router;
