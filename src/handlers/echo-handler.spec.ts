import {
  handler
} from "./echo-handler";

describe("Echo Handler", () => {
  describe("when handler is called", () => {
    it("should return error if invalid method", () => {
        const req = JSON.parse(`{"method":"put","body":null,"params":{"action":"health"}}`);
        handler(req, null, function(resp) {
            expect(resp.code).toBe("405");
        });

    });

    it("should return 403 error query is not set", () => {
      const req = JSON.parse(`{"method":"get","body":null,"params":{"action":"echo"}, "query": {"abc": 11}}`);
      handler(req, null, function(resp) {
          expect(resp.code).toBe("405");
      });
    });
  });
});


