/**
 * @module natron
 * test
 */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "./polyfills/v0.10";

chai.use(chaiAsPromised);

Object.assign(global, {
  assert: chai.assert,
});
