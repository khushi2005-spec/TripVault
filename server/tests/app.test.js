
const request = require("supertest");
const app = require("../index");

describe("TripVault backend health checks", () => {
  test("GET / should return a successful health response", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "TripVault backend is running"
    );
  });

  test("GET /health should confirm the server is healthy", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "TripVault server is healthy"
    );
  });
});
