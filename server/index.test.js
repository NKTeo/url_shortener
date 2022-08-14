
const supertest = require("supertest");
const app = require("./index");

describe("[GET /] Endpoint health test", () => {
    test("should return 200 OK", async () => {
        const response = await supertest(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "URL shortener made by": "Nian Kai"
        });
    })
})

describe("[GET /] Return custom JSON", () => {
    test("should return custom JSON response body", async () => {
        const response = await supertest(app).get("/");
        expect(response.body).toEqual({
            "URL shortener made by": "Nian Kai"
        });
    })
})