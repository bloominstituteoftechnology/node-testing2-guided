const request = require('supertest');
const server = require('./server');
    describe('server', () => {
        it('should set the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing')
        });
    describe('GET /', () => {
        it('should return status 200', async () => {
            const res = await request(server).get('/');
            expect (res.status).toBe(200);
        });
        it('should return jason format', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });
        it('should return { api: "up" }', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: "up" })
        });
    })    
    describe('GET /', () => {
        it('should return status 200', () => {
            return request(server).get('/')
            .then(res => {
                expect (res.status).toBe(200);
            })
        })
    })  
       

    })