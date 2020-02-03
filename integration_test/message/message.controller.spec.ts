import { agent } from "supertest";
import app from "../../src";
import { TestUserGenerator } from "../utils/TestUserGenerator";

let token_parent = "";
describe("controller.message MessageController Test", () => {
  before(async () => {
    const credentials = TestUserGenerator.parent();
    const res = await agent(app)
      .post("/users")
      .query({ role: "parent" })
      .send(credentials)
      .expect(200);
    token_parent = res.body.data.token;
  });
  
  it("GET /message success", async () => {
    const res = await agent(app)
      .get("/message")
      .set('Authorization',token_parent)
      .expect(200);
    console.log("res", res.body);
  });
});
