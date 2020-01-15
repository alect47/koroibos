const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Events {

  constructor() {
  }

  async getEvents() {
    let sportData = await database('events').select('sport', database.raw('ARRAY_AGG(DISTINCT events.event) as events'))
                          .groupBy('sport')
    let eventData = {}
    eventData["events"] = await sportData

    return eventData
  }

}

module.exports = Events;
