
const request = require('supertest');
import { app } from "./app";

// Define a helper function to make the request and handle assertions
const makeRequest = (query, expectedStatus, expectedResponseCallback) => {
  return request(app.app)
    .post('/youtube')
    .query(query)
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(expectedStatus)
    .expect((res) => {
      if (expectedResponseCallback) {
        expectedResponseCallback(res.body);
      } else {
        expect(res.body).toHaveProperty('message');
      }
    });
};

describe('GET /youtube', function() {
  test('responds with json', function(done) {
    request(app.app)
      .get('/youtube')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err){
            done(err);
        }
        else {
            expect(res.body).toHaveProperty('message')
            done();
        }
      });
  });
});

// Should return valid video data, otherwise return error
describe('POST /youtube', function() {
  test('responds with json - Missing id parameter', function(done) {
    makeRequest({}, 400, (body)=>expect(body).toEqual({ error: true, message: 'Missing id parameter' }))
      .end(done);
  });

  test('responds with json - Single valid video id / video found', function(done) {
    makeRequest({ id: 'dQw4w9WgXcQ' }, 200, (body)=>{
      expect(body.message).toEqual('success');
      expect(body.data.id).toEqual('dQw4w9WgXcQ');
    }).end(done);
  });

  test('responds with json - Single invalid video id / video not found', function(done) {
    makeRequest({ id: 'not-valid-videoid' }, 200, (body)=>expect(body).toEqual({ error: true, message: 'Video not found' }))
      .end(done);
  });

});
