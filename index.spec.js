const supertest = require("supertest");
const server = require("./index");

test("Welcome"), async() => {
    const res = await supertest(server.get("/"));

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("Welcome");
}