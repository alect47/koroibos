var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const Events = require('../../../models/events')

router.get('/', async function (request, response) {
  let eventsModel = await new Events()
  await eventsModel.getEvents()
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  })
})

router.get('/:id/medalists', async function (request, response) {
  let id = request.params.id
  let eventsModel = await new Events()

  await eventsModel.getmedals(id)
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(404).json({ error: "Event not Found" })
  })
})

  module.exports = router;
