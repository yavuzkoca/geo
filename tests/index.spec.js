const request = require("supertest")
const baseURL = "http://localhost:3000"

describe("Sum of two items", () => {
    describe('/', function () {
        it("should return 200", async () => {
            const response = await request(baseURL).get("/");
            expect(response.statusCode).toBe(200);
        });
    });

    describe('/geolocations', function () {
        it("should return 400 if minLat is missing", async () => {
            const response = await request(baseURL).get("/geolocations");
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if maxLong is missing", async () => {
            const response = await request(baseURL).get("/geolocations?min_lat=13.0001");
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if minLong is missing", async () => {
            const response = await request(baseURL).get("/geolocations?min_lat=13.0001&max_long=52.0002");
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if maxLat is missing", async () => {
            const response = await request(baseURL).get("/geolocations?min_lat=13.0001&max_long=52.0002&min_long=52.0001");
            expect(response.statusCode).toBe(400);
        });

        it("should return 200 if all queries sent", async () => {
            const response = await request(baseURL).get("/geolocations?min_lat=13.0001&max_long=52.0002&min_long=52.0001&max_lat=13.0002");
            expect(response.statusCode).toBe(200);
        });
    });
});
