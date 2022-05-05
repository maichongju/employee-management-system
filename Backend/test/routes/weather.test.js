const app = require("../../app")
const session = require("supertest-session")

var agent = session(app);

describe("GET /weather log in store", () => {

    beforeAll((done) => {
        agent = session(app);
        agent.post("/auth/signin")
            .send({ "username": "testemployee", "password": "password" })
            .expect(200)
            .end(done);
    })
    it("valid store number", (done) => {
        agent.get("/weather/1")
            .expect(200)
            .expect((res) => {
                const result = {
                    store_id: 1,
                    city_id: 1,
                    lat: 4,
                    lon: 2,
                    forecast: cold
                };
                expect(res.body.content.store_id).toBe(result)
            })
            .end(done);

    })

    afterAll((done) => {
        agent.get("/auth/signout")
            .end(done);
    })

})

describe("GET /weather log in store", () => {

    beforeAll((done) => {
        agent = session(app);
        agent.post("/auth/signin")
            .send({ "username": "testemployee", "password": "password" })
            .expect(200)
            .end(done);
    })
    it("bad store number", (done) => {
        agent.get("/weather/02")
            .expect(404)
            .expect((res) => {
                expect(res.body.content.store_id).toBe(404)
            })
            .end(done);

    })

    afterAll((done) => {
        agent.get("/auth/signout")
            .end(done);
    })

})

describe("GET /weather log in store", () => {

    beforeAll((done) => {
        agent = session(app);
        agent.post("/auth/signin")
            .send({ "username": "testemployee", "password": "password" })
            .expect(200)
            .end(done);
    })
    it("bad store number", (done) => {
        agent.get("/weather/#")
            .expect(400)
            .expect((res) => {
                expect(res.body.content.store_id).toBe(400)
            })
            .end(done);

    })

    afterAll((done) => {
        agent.get("/auth/signout")
            .end(done);
    })

})

describe("GET /weather no log in", () => {
    it("valid store number no auth", (done) => {
        agent.get("/weather/1")
            .expect(401)
            .expect((res) => {
                expect(res.body.status).toBe(401);
                expect(res.body.error.code).toBe("V1008");
            })
            .end(done);
    })
})