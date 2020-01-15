var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test GET api/v1/events', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');
     await database.raw('truncate table events cascade');

     await database('olympians').insert([
       {name: 'You', sex: 'M', age: 1, height: 1680, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Silver'},
       {name: 'Someone Else', sex: 'F', age: 23, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Platinum'},
       {name: 'Me', sex: 'F', age: 24, height: 168, weight: 65, team: 'Australia', games: '2016 Summer', sport: 'Running', event: "Running Fast", medal: 'Gold'}
     ]);
     await database('events').insert([
     {id: 3, sport: 'Running', event: "Running Fast"},
     {id: 2, sport: 'Running', event: "Running the Fastest"},
     {id: 1, sport: 'Walking', event: "Speed Walking"}
    ]);

  });

   afterEach(() => {
     database.raw('truncate table olympians cascade');
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

    it('should get medalists for specific event', async() => {

      const res = await request(app).get("/api/v1/events/3/medalists")

      expect(res.statusCode).toBe(200)

      expect(res.body).toHaveProperty('event')
      expect(res.body.event).toBe("Running Fast")

      expect(res.body).toHaveProperty('medalists')
      expect(res.body.medalists[0].age).toBe(1)
      expect(res.body.medalists[0].medal).toBe("Silver")
      expect(res.body.medalists[0].name).toBe("You")
      expect(res.body.medalists[0].team).toBe("Australia")
    })

    it('should return error message for invalid id', async() => {

      const res = await request(app).get("/api/v1/events/123/medalists")

      expect(res.statusCode).toBe(404)

      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe("Event not Found")
    })
});
