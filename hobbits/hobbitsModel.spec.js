const db = require('../data/dnConfig.js');
const { intersect } = require('../data/dbConfig.js');
const Hobbits = ('./hobbitsModel.js');

describe('hobbits model', () => {
  describe('insert()', () => {
    it('should insert the provided hobbits into th DB', async => {
      await Hobbits.insert({name: 'gaffer'});
      await Hobbits.insert({name: 'sam'});

      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(2)
    })
  })
})