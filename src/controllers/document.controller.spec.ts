import * as request from "supertest";
import * as StartApp from "../index";

describe("DocumentController", () => {
  it("should return File not found", (done) => {
    request(StartApp)
      .post("/convert")
      .expect(404, { error: "File not found" })
      .end((err) => {
        if (err) { throw err; }
        done();
      });
  });

  it("should return Wrong file type", (done) => {
    request(StartApp)
      .post("/convert")
      .attach("file",
        __dirname + "/test-resources/user-face.jpg")
      .expect(400, { error: "Wrong file type" })
      .end((err) => {
        if (err) { throw err; }
        done();
      });
  });

  it("should send file and get blob", (done) => {
    const files = [
      "/test-resources/sample.doc",
      "/test-resources/sample.docx",
    ];
    const sendFile = (file: string) => {
      request(StartApp)
        .post("/convert")
        .attach("file",
          __dirname + file)
        .expect("Content-Type", "application/octet-stream")
        .expect(200)
        .end((err) => {
          if (err) {
            throw err;
          }
          done();
        });
    };
    sendFile(files[Math.floor(Math.random() * files.length)]);
  });
});
