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
    statData["total_competing_olympians"] = await olympianCount.length

    let avgAge = await database('olympians').avg('age')
    let formattedAvgAge = await parseFloat(avgAge[0]["avg"])
    let finalAvg = await Math.round(formattedAvgAge * 10) / 10;
    statData["average_age"] = await finalAvg
    statData["average_weight"] = await {}
    statData["average_weight"]["unit"] = "kg"

    let maleAvgWeight = await database('olympians').where('sex', 'M').whereNotNull('weight').avg('weight')
    let femaleAvgWeight = await database('olympians').where('sex', 'F').whereNotNull('weight').avg('weight')
    let maleFormattedAvgWeight = await parseFloat(maleAvgWeight[0]["avg"])
    let femaleFormattedAvgWeight = await parseFloat(femaleAvgWeight[0]["avg"])
    let finalMaleAvg = await Math.round(maleFormattedAvgWeight * 10) / 10;
    let finalFemaleAvg = await Math.round(femaleFormattedAvgWeight * 10) / 10;

    statData["average_weight"]["male_olympians"] = await finalMaleAvg
    statData["average_weight"]["female_olympians"] = await finalFemaleAvg

    let finalStatData = {}
    finalStatData["olympian_stats"] = await statData
    return finalStatData
  }

}

module.exports = OlympianStats;
