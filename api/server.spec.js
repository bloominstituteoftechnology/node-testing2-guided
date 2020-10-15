const supertest = require('supertest')
const { intersect } = require('../data/dbConfig')
const server = require('./server')


describe('server', () => {
    describe('GET', () => {
        it ("should return 200", () => {
            return supertest(server).get('/').then (res=> {expect(res.status).toBe(200)})
        })
        // it('should have a body', () => {
        //     return supertest(server).get('/').then(res => {expect(res.body).toEqual({api:"up"})} )
        // })
        it('should have a body api:up', () => {
            return supertest(server).get('/').then(res => {expect(res.body.api).toBe("up")} )
        })

        it("should return JSON", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

    }) 
})