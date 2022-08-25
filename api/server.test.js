const db = require('../data/dbConfig');
const Hobbit = require('./hobbits/hobbits-model');
const server = require('./server');
const request = require('supertest');

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

    test('Hobbit.getById', async () => {
        let result = await Hobbit.getById(4);
        expect(result).toMatchObject({ name: 'merry' });
        
        result = await Hobbit.getById(999);
        expect(result).not.toBeDefined();
    });

    test('Hobbit.insert', async () => {
        let result = await Hobbit.insert({ name: 'lotho' });
        expect(result).toMatchObject({ id: 5, name: 'lotho' });

        result = await Hobbit.getAll();
        expect(result).toHaveLength(5);
    });

    test('Hobbit.update', async () => {
        let result = await Hobbit.update(3, { name: 'peregrin' });
        expect(result).toMatchObject({ id: 3, name: 'peregrin' });

        result = await Hobbit.getAll();
        expect(result).toHaveLength(4);

        result = await Hobbit.update(999, { name: 'sauron' });
        expect(result).not.toBeDefined();
    });

    test('Hobbit.remove', async () => {
        let result = await Hobbit.remove(3);
        expect(result).toMatchObject({ id: 3, name: 'pippin' });

        result = await Hobbit.getAll();
        expect(result).toHaveLength(3);

        result = await Hobbit.remove(3);
        expect(result).not.toBeDefined();
    });
});

describe('HTTP endpoint tests', () => {
    test('GET /', async () => {
        const result = await request(server).get('/');
        console.log();
    });

    // test('GET /hobbits', async () => {});

    // test('GET /hobbits/:id', async () => {});

    // test('POST /hobbits', async () => {});

    // test('PUT /hobbits/:id', async () => {});

    // test('DELETE /hobbits/:id', async () => {});
});