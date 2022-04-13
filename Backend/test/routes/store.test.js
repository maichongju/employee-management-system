const app = require("../../app")
const session = require("supertest-session")

var agent = session(app);

describe("GET /store log in employee", () => {

    beforeAll((done) => {
        agent = session(app);
        agent.post("/auth/signin")
            .send({ "username": "testemployee", "password": "password" })
            .expect(200)
            .end(done);
    })
    it("valid store number", (done) => {
        agent.get("/store/1")
            .expect(200)
            .expect((res) => {
                expect(res.body.content.store_id).toBe(1)
            })
            .end(done);

    })

    afterAll((done) => {
        agent.get("/auth/signout")
            .end(done);
    })

})

describe("GET /store no log in", () => {
    it("valid store number no auth", (done) => {
        agent.get("/store/1")
            .expect(401)
            .expect((res) => {
                expect(res.body.status).toBe(401);
                expect(res.body.error.code).toBe("V1008");
            })
            .end(done);
    })
})