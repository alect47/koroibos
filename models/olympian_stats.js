const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class OlympianStats {

  constructor() {
  }

  async makeStats() {
    let statData = {}
    let olympianCount = await database('olympians').select('name', 'team', 'age', 'sport', 'sex', 'height', 'weight')
                              .groupBy('name', 'team', 'age', 'sport', 'sex', 'height', 'weight')
    await console.log(olympianCount.length, "Olympian count")
    statData["total_competing_olympians"] = await olympianCount.length

    let avgAge = await database('olympians').avg('age')
    let formattedAvgAge = await parseFloat(avgAge[0]["avg"])
    let finalAvg = await Math.round(formattedAvgAge * 10) / 10;
    statData["average_age"] = await finalAvg
    return statData
  }

}

module.exports = OlympianStats;
