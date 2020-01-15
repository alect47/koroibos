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

  async getmedals(id) {
    let data = {}
    let sportData = await database('events').where('id', id).select('event')

    console.log(sportData[0].event)
    let medalists = await database('olympians').where('event', sportData[0].event)
                        .whereNotNull('medal').select('name', 'team', 'age', 'medal')
    data["event"] = await sportData[0]['event']
    data["medalists"] = await medalists
    return data
  }

}

module.exports = Events;
