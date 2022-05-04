import { describe, it } from "mocha";
import { expect } from "chai";
import { isOlsonTimezone } from "../src/index";

describe('isOlsonTimezone', () => {
  it('should return false if it is not a string', () => {
    expect(isOlsonTimezone(42)).to.be.equal(false);
  });
  
  it('should return false if it is not a OlsonTimezone', () => {
    expect(isOlsonTimezone('Europe/Leipzig')).to.be.equal(false);
  });
  
  it('should return true if it is a OlsonTimezone', () => {
    expect(isOlsonTimezone('Europe/Berlin')).to.be.equal(true);
  });
});
