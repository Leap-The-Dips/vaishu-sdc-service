const request = require('supertest');
const server = require('../server/index');

describe('Testing server API', () => {
  it('API responds with correct data format', async () => {
    const res = await request(server).get('/images?id=5');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('images');
  });
  it('API responds with the correct product ID', async () => {
    const res = await request(server).get('/images?id=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual('Star Wars Super Deluxe 24" Talking Plush: Chewbacca');
  });
});
