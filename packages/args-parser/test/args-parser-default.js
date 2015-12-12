/**
 * @module natron-args-parser
 * test
 */
import {parse} from "../";

describe("[natron-args-parser] default", () => {
  describe("parse", () => {

    it("aaa --bbb=bbb ccc", () => {
      assert.deepEqual(parse(["aaa", "--bbb=bbb", "ccc"]), {
        "_": ["aaa", "ccc"],
        "bbb": "bbb",
      });
    });

    it("--num=42 --str=foo --bool=true", () => {
      assert.deepEqual(parse(["--num=42", "--str=foo", "--bool=true"]), {
        "_": [],
        "num": 42,
        "str": "foo",
        "bool": true,
      });
    });

    it("--bool=foo", () => {
      let args = parse(["--bool=foo"], {
        flags: {
          "bool": {
            type: "boolean",
          },
        },
      });
      assert.deepEqual(args, {
        "_": [],
        "bool": true,
      });
    });

    it("--foo bar foo (greedy = true)", () => {
      let args = parse(["--foo", "bar", "foo"], {
        greedy: true,
      });
      assert.deepEqual(args, {
        "_": ["foo"],
        "foo": "bar",
      });
    });

  });
});
