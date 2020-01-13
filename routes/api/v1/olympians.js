var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');


async function allOlympians() {
  try {
    let response = await database('olympians').select()
    return response;
  } catch(err) {
    return err;
  }
}

router.get('/', (request, response) => {
  allOlympians()
    .then(olympians => {
      if (olympians.length) {
        response.status(200).send(olympians)
      } else {
        response.status(404).json({
          error: `No olympians found`
        });
      }
    })
  });
