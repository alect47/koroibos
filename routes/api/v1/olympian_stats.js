var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const OlympianStats = require('../../../models/olympian_stats')
// const olympianData = OlympianStats.makeStats()

router.get('/', async function (request, response) {
  let olympianStatsModel = await new OlympianStats()
  await olympianStatsModel.makeStats()
  // console.log(olympianStatsModel)
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  })
})

  module.exports = router;
