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

router.get('/', async function (request, response) {
  await allOlympians()
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  })
})

  module.exports = router;
