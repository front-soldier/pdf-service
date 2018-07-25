import * as request from "supertest";
import * as StartApp from "./index";

describe("Index", () => {
  it("should check if app work and return 404", (done) => {
    request(StartApp)
      .post("/wrongRequest")
      .expect(404)
      .end((err) => {
        if (err) { throw err; }
        done();
      });
  });
});
