const db = require('../data/dbConfig');
const Hobbit = require('./hobbits/hobbits-model');

test('check environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('hobbit model tests', () => {
    test('Hobbit.getAll', async () => {
        let result = await Hobbit.getAll();
        expect(result).toBeDefined();
        expect(result).toHaveLength(4);
        expect(result[2]).toHaveProperty('name', 'pippin');
    });

    // test('Hobbit.getById', async () => {});
    // test('Hobbit.insert', async () => {});
    // test('Hobbit.update', async () => {});
    // test('Hobbit.remove', async () => {});
});