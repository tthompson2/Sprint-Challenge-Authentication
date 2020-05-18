const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("jokes integration tests", () => {
    it("GET /jokes", async () => {
        const res = await supertest(server).get("/jokes");
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4);
        expect(res.body[0].joke).toBe("Spacewar!")
    })

    it("GET /jokes/:id", async () => {
        const res = await supertest(server).get("/cabinets/0")
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.joke).toBe("Spacewar!")

    })

    it ("GET /jokes/:id (not found", async () => {
        const res = await supertest(server).get("/hobbits/50");
        expect(res.statusCode).toBe(404)
    })
    it("POST /jokes", async () => {
        const data = { joke: "space invaders"}
        const res = await supertest(server).post("/jokes").send(data)
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe("application/json")
        expect(res.body.joke).toBe("space invaders")
    })

})

describe("register endpoint", () => {
    
    it ("GET /register (not found)", async () => {
        const res = await supertest(server).get("/register/50");
        expect(res.statusCode).toBe(404)
    })

    it ("GET /register/:id (not found", async () => {
        const res = await supertest(server).get("/register/");
        expect(res.statusCode).toBe(404)
    })

})

describe("login endpoint", () => {
    it ("GET /login (not found)", async () => {
        const res = await supertest(server).get("/login/50");
        expect(res.statusCode).toBe(404)
    })

    it ("GET /login/:id (not found", async () => {
        const res = await supertest(server).get("/login/");
        expect(res.statusCode).toBe(404)
    })
})