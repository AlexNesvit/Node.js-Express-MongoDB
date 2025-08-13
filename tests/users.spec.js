const request = require('supertest');
const { app } = require('../server');

describe('tester API users', () => {
    test('[Users] Get All', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
});