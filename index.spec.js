const request = require('supertest');

const server = require('./api/server')

describe('server.js', () => {
    // http calls made with supertest return promises, we can use async/await if desired
    describe('index route', () => {
      it('should return an OK status code from the index route', async () => {
        const expectedStatusCode = 200;
  
        // do a get request to our api (server.js) and inspect the response
        const response = await request(server).get('/');
  
        expect(response.status).toEqual(expectedStatusCode);
  
        // same test using promise .then() instead of async/await
        // let response;
        // return request(server).get('/').then(res => {
        //   response = res;
  
        //   expect(response.status).toEqual(expectedStatusCode);
        // })
      });
  
      it('should return a JSON object fron the index route', async () => {
        const expectedBody = { api: 'up' };
  
        const response = await request(server).get('/');
  
        expect(response.body).toEqual(expectedBody);
      });
  
      it('should return a JSON object fron the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
      });
    });
  });

  server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });
  
  module.exports = server;

describe('GET /', () => {
    //should return http 200 ok
    it('should return 200 http status code', () => {
        return request(server)
        .get('/')
        .then(response => {
            expect(response.status).toBe(200);
        });
    });

    //should return json
    test('should return JSON', async () => {
        const response = await request(server).get('/');

        //toMatch uses a regula expression to check
        //the value
        expect(response.type).toMatch(/json/i);
    });


    //writing with async whtn a then
    test('should return JSON using .then', () => {
        return request(server)
        .get('/')
        .then(response => {
        expect(response.type).toMatch(/json/i);
        })

        //toMatch uses a regula expression to check
        //the value
    });

    //should return an object 
    //with an api property with the value 'up'

    it('should return {api: "up"}', async () => {
        const response = await request(server).get('/');

        expect(response.body).toEqual({api:'up'});
        expect(response.body.api).toBe('up');
    })
    //object with an api property with the value 'up
});


