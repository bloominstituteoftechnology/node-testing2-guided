const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
    describe('GET /', () => {
        it('should return 200 ok', () => {
            return request(server)
            .get('/')
            .expect(200)
        })

        it.todo('should return JSON')

        it.todo('should respond with object {api: "up"')
    })
})