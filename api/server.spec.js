const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
    describe('GET /', () => {
        it('should return 200 ok', async () => {
        const response = await request(server).get('/')     
        expect(response.status).toBe(200)
        })

        it('should return JSON', async () => {
            const response = await request(server).get('/')
            expect(response.type).toMatch(/json/i)
        })

        it('should respond with object {api: "up"', async () => {
            const response = await request(server).get('/')
            expect(response.body.api).toBe("up")
        })
    })
})