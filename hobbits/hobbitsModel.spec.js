const db = require('../data/dbConfig.js');

const Hobbits = require('./hobbitsModel');

describe('hobbits model', ()=> {
    describe('insert', ()=> {
        it ('should insert the provided hobbits into the db', async()=> {
            await Hobbits.insert({name: 'gaffer'})
            await Hobbits.insert({name: 'sam'})

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(6)

            it('should return the new Hobbit', async()=> {
                let hobbit = await Hobbits.insert({name: 'gaffer'});
                expect(hobbit.name).toBe('gaffer')
            })

        })
    })
})

beforeEach(async ()=> {
    await db('hobbits').truncate
})