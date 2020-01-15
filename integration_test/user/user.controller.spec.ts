import { agent } from "supertest";
import app from "../../src";
import { TestUserGenerator } from "../utils/TestUserGenerator";
import { expect, assert } from "chai";

describe("controller.user UserController Test", () => {
  it("POST /users/login?role=parent", async () => {
    const credentials = TestUserGenerator.parent();
    const res = await agent(app)
      .post("/users/login")
      .query({ role: "parent" })
      .send(credentials)
      .expect(200);
    assert.isNotEmpty(res.body.data);
    // console.log("res", res.body);
  });

  it("POST /users/login?role=teacher", async () => {
    const credentials = TestUserGenerator.teacher();
    const res = await agent(app)
      .post("/users/login")
      .query({ role: "teacher" })
      .send(credentials)
      .expect(200);
    assert.isNotEmpty(res.body.data);
    // console.log("res", res.body);
  });
});
