import { agent } from "supertest";
import app from "../../src";
import { TestUserGenerator } from "../utils/TestUserGenerator";
import { expect, assert } from "chai";
import { ICredentials } from "../../src/core/domain/entity/user/ICredentials";
import { USER_ROLE } from "../../src/app/common/constants";

let token_parent = "";
let token_teacher = "";
describe("controller.user UserController Test", () => {
  it("POST /users/login?role=parent success", async () => {
    const credentials = TestUserGenerator.parent();
    const res = await agent(app)
      .post("/users/login")
      .query({ role: "parent" })
      .send(credentials)
      .expect(200);
    assert.isNotEmpty(res.body.data);
    token_parent = res.body.data.token;
    // console.log("res", res.body);
  });

  it("POST /users/login?role=teacher success", async () => {
    const credentials = TestUserGenerator.teacher();
    const res = await agent(app)
      .post("/users/login")
      .query({ role: "teacher" })
      .send(credentials)
      .expect(200);
    assert.isNotEmpty(res.body.data);
    token_teacher = res.body.data.token;
    // console.log("res", res.body);
  });

  it("POST /users/login?role=parent failed", async () => {
    const credentials: ICredentials = {
      password: "unknown",
      role: USER_ROLE.PARENT,
      username: "unknown"
    };
    const res = await agent(app)
      .post("/users/login")
      .query({ role: "teacher" })
      .send(credentials)
      .expect(401);
    // console.log("res", res.body);
  });

  it("GET /users/profile Parent success", async () => {
    const res = await agent(app)
      .get("/users/profile")
      .set("Authorization", token_parent)
      .expect(200);
    // console.log("res", res.body);
  });

  it("GET /users/profile Teacher success", async () => {
    const res = await agent(app)
      .get("/users/profile")
      .set("Authorization", token_teacher)
      .expect(200);
    // console.log("res", res.body);
  });
});
