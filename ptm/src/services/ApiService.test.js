import ApiService from "./ApiService";
import axios from "axios";

jest.mock("axios");

describe("ApiService calls APIs via axios", () => {
  it("Api call test", () => {
    let resp = { statusOfApi: "Success" };
    axios.get.mockResolvedValue(resp);
    ApiService.call().then(d => expect(d.statusOfApi).toEqual("Success"));
    expect(axios.get).toBeCalledWith("/api/myApi");
  });
});
