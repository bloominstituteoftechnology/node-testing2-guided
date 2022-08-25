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
        expect(result.body).toEqual({ api: 'up' });
        expect(result.status).toBe(200);
    });

    test('GET /hobbits', async () => {
        let result = await request(server).get('/hobbits');
        expect(result.body).toHaveLength(4);
        expect(result.body[2]).toHaveProperty('name', 'pippin');
        expect(result.status).toBe(200);
    });

    test('GET /hobbits/:id', async () => {
        let result = await request(server).get('/hobbits/4');
        expect(result.body).toMatchObject({ name: 'merry' });
        expect(result.status).toBe(200);
        
        result = await request(server).get('/hobbits/999');
        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({ message: 'hobbit not found' });
    });

    test('POST /hobbits', async () => {
        let result = await request(server).post('/hobbits').send({ name: 'lotho' });
        expect(result.body).toMatchObject({ id: 5, name: 'lotho' });
        expect(result.status).toBe(201);

        result = await request(server).post('/hobbits').send({ blah: 'foobar' });
        expect(result.body).toMatchObject({ message: 'invalid request' });
        expect(result.status).toBe(400);

        result = await Hobbit.getAll();
        expect(result).toHaveLength(5);
    });

    test('PUT /hobbits/:id', async () => {
        let result = await request(server).put('/hobbits/3').send({ name: 'peregrin' });
        expect(result.body).toMatchObject({ id: 3, name: 'peregrin' });
        expect(result.status).toBe(200);

        result = await request(server).put('/hobbits/3').send({ blah: 'foobar' });
        expect(result.body).toMatchObject({ message: 'invalid request' });
        expect(result.status).toBe(400);

        result = await Hobbit.getAll();
        expect(result).toHaveLength(4);

        result = await request(server).put('/hobbits/999').send({ name: 'sauron' });
        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({ message: 'hobbit not found' });
    });

    test('DELETE /hobbits/:id', async () => {
        let result = await request(server).delete('/hobbits/3');
        expect(result.body).toMatchObject({ id: 3, name: 'pippin' });
        expect(result.status).toBe(200);

        result = await Hobbit.getAll();
        expect(result).toHaveLength(3);

        result = await Hobbit.remove(3);
        expect(result).not.toBeDefined();

        result = await request(server).delete('/hobbits/3');
        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({ message: 'hobbit not found' });
    });
});