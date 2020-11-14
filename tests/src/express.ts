import * as request from "supertest";
import app from "../../src/express";

describe("the / route", () => {
  it("returns a 200", async () => {
    await request(app).get("/").expect(200);
  });
});
