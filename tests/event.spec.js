var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test GET api/v1/events', () => {
  beforeEach(async () => {
     await database.raw('truncate table events cascade');

     await database('events').insert([
     {sport: 'Running', event: "Running Fast"},
     {sport: 'Running', event: "Running the Fastest"},
     {sport: 'Walking', event: "Speed Walking"}
   ]);
  });

   afterEach(() => {
     database.raw('truncate table events cascade');
   });

    it('should get events', async() => {

      const res = await request(app).get("/api/v1/events")

      expect(res.statusCode).toBe(200)

      expect(res.body.events[0]).toHaveProperty('sport')
      expect(res.body.events[0]['sport']).toBe("Running")

      expect(res.body.events[0]).toHaveProperty('events')
      expect(res.body.events[0].events[0]).toBe("Running Fast")
    })

});
