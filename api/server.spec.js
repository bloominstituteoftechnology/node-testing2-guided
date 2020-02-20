const request = require('supertest');


const server = require('./server.js');

// describe('server.js', ()=> {
//      it('should set testing environment', ()=> {
//          expect(process.env.DB_ENV).toBe('testing')
//      });

     describe('GET /',()=> {
         it ('should retrun 200, ok', async()=> {
             const res = await request(server).get('/')
             request(server).get('/')
             .then(res => {
                 expect(res.status).toBe(200);
             });

             
             })
 
         })
  

     it('should return JSON', async()=> {
        const res= await request(server).get('/');
        expect(res.type).toBe('application/json');
    })

     it ('should retrun {api:up}', async ()=> {
         const res = await request(server).get('/');
         expect(res.body).toEqual({api:'up'});
     })