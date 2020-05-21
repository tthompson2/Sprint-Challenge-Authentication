const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")
const auth = require("../auth/auth-router");

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("jokes integration tests", () => {
    it("GET /jokes", async () => {
        const res = await supertest(server).get("/jokes");
        expect(res.statusCode).toBe(404);
        expect(res.type).toBe("text/html")
    })

    // it("GET /jokes/:id", async () => {
    //     const res = await supertest(server).get("/jokes/0")
    //     expect(res.statusCode).toBe(404);
    //     expect(res.type).toBe("text/html");

    // })

    // it("GET /jokes/:id (not found", async () => {
    //     const res = await supertest(server).get("/jokes/50");
    //     expect(res.statusCode).toBe(404)
    // })
    // it("POST /jokes", async () => {
    //     const data = { joke: "space invaders"}
    //     const res = await supertest(server).post("jokes").send(data)
    //     expect(res.statusCode).toBe(201);
    //     expect(res.type).toBe("application/json")
    //     expect(res.body.joke).toBe("space invaders")
    // })

})

describe("register endpoint", () => {

    beforeEach(async () => {
        await db("users").truncate();
    })

    it("POST /register add new user", async () => {

        const data = { username: "trev108", password: "88888888" }
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.status).toBe(201)
    })

    it("POST /register (not found)", async () => {
        const res = await supertest(server).get("/register/50");
        const data = { username: "trev108", password: "88888888" }
        expect(res.statusCode).toBe(404);
        expect(res.type).toBe("text/html")
        expect(data.username).toBe("trev108")
    })

    it("GET /register/:id (not found", async () => {
        const res = await supertest(server).get("/register/");
        expect(res.statusCode).toBe(404)
    })

})

describe("login endpoint", () => {

    beforeEach(async () => {
        await db("users").truncate();
    })

    it("POST /login", async () => {
        try {


            const data = { username: "trev4", password: "4155478713" }
            const register = await supertest(server).post("/api/auth/register").send(data)
            const res = await supertest(server).post("/api/auth/login").send(data)
            expect(res.statusCode).toBe(200);
        } catch(err) {
            throw(err)
        }

    })

    it("POST /login failure", async () => {
        const data = { username: "trev4", password: "41554787===13" }
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(401);

    })
})