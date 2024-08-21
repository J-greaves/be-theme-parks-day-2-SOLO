const request = require("supertest");
const app = require("../app");

// afterAll(() => {
//   return db.end();
// });

describe("healthcheck API", () => {
  describe("/api/healthcheck", () => {
    test("200: responds with a 200 status code", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });
});

describe("parks API", () => {
  describe("/api/parks", () => {
    test("200: responds with body with properties of park_id, park_name and year_opened", () => {
      return request(app)
        .get("/api/parks")
        .expect(200)
        .then((response) => {
          const {
            body: { parkData },
          } = response;

          expect(parkData.length > 0).toBe(true);

          parkData.forEach((park) => {
            expect(park).toHaveProperty("park_id", expect.any(Number));
            expect(park).toHaveProperty("park_name", expect.any(String));
            expect(park).toHaveProperty("year_opened", expect.any(Number));
          });
        });
    });
  });
});

describe("ride API", () => {
  describe("/api/ride/:ride_id", () => {
    test("200: responds with body with properties of those expected", () => {
      return request(app)
        .get("/api/ride/1")
        .then((response) => {
          const {
            body: { rideData },
          } = response;

          console.log(rideData, "ride data in test");

          expect(rideData).toHaveProperty("ride_id", expect.any(Number));
          expect(rideData).toHaveProperty("ride_name", expect.any(String));
          expect(rideData).toHaveProperty("year_opened", expect.any(Number));
          expect(rideData).toHaveProperty("park_name", expect.any(String));
          expect(rideData).toHaveProperty("votes", expect.any(Number));
        });
    });
  });
});
