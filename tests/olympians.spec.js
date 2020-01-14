var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test GET api/v1/olympians', () => {
  beforeEach(async () => {
     await database.raw('truncate table olympians cascade');

     await database('olympians').insert([
     {name: 'You', sex: 'M', age: 1, height: 1680, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Silver'},
     {name: 'Someone Else', sex: 'F', age: 23, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running the Fastest", medal: 'Platinum'},
     {name: 'Me', sex: 'F', age: 24, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Gold'}
   ]);
  });

   afterEach(() => {
     database.raw('truncate table olympians cascade');
   });

    it('should get all olympians', async() => {

      const res = await request(app).get("/api/v1/olympians")

      expect(res.statusCode).toBe(200)

      expect(res.body.olympians[2]).toHaveProperty('name')
      expect(res.body.olympians[2].name).toBe("You")

      expect(res.body.olympians[2]).toHaveProperty('age')
      expect(res.body.olympians[2].age).toBe(1)

      expect(res.body.olympians[2]).toHaveProperty('team')
      expect(res.body.olympians[2].team).toBe("Australia")


      expect(res.body.olympians[2]).toHaveProperty('sport')
      expect(res.body.olympians[2].sport).toBe("Running")

      expect(res.body.olympians[2]).toHaveProperty('total_medals_won')
      expect(res.body.olympians[2].total_medals_won).toBe('1')
    })

    it('should get oldest olympian', async() => {

      const res = await request(app).get("/api/v1/olympians?age=oldest")

      expect(res.statusCode).toBe(200)

      expect(res.body.data[0]).toHaveProperty('name')
      expect(res.body.data[0].name).toBe("Me")

      expect(res.body.data[0]).toHaveProperty('age')
      expect(res.body.data[0].age).toBe(24)

      expect(res.body.data[0]).toHaveProperty('team')
      expect(res.body.data[0].team).toBe("Australia")


      expect(res.body.data[0]).toHaveProperty('sport')
      expect(res.body.data[0].sport).toBe("Running")

      expect(res.body.data[0]).toHaveProperty('total_medals_won')
      expect(res.body.data[0].total_medals_won).toBe('1')



    })
});
