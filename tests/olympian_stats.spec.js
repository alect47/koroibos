var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test GET api/v1/olympian_stats', () => {
  beforeEach(async () => {
     await database.raw('truncate table olympians cascade');

     await database('olympians').insert([
     {name: 'You', sex: 'M', age: 1, height: 1680, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Silver'},
     {name: 'Someone Else', sex: 'F', age: 23, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running the Fastest", medal: 'Platinum'},
     {name: 'Me', sex: 'F', age: 24, height: 168, weight: 65, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Gold'}
   ]);
  });

   afterEach(() => {
     database.raw('truncate table olympians cascade');
   });

    it('should get olympian_stats', async() => {

      const res = await request(app).get("/api/v1/olympian_stats")

      expect(res.statusCode).toBe(200)

      expect(res.body.olympian_stats).toHaveProperty('total_competing_olympians')
      expect(res.body.olympian_stats['total_competing_olympians']).toBe(3)

      expect(res.body.olympian_stats).toHaveProperty('average_age')
      expect(res.body.olympian_stats.average_age).toBe(16)

      expect(res.body.olympian_stats).toHaveProperty('average_weight')
      expect(res.body.olympian_stats.average_weight['unit']).toBe("kg")
      expect(res.body.olympian_stats.average_weight['male_olympians']).toBe(55)
      expect(res.body.olympian_stats.average_weight['female_olympians']).toBe(60)
    })

});
