const {
  getRepeatingCharsCount,
  minStepsToMakePasswordStrong,
} = require("./passwordStrength");

describe("getRepeatingCharsCount", () => {
  it("should return 0 for a password without repeating characters", () => {
    const password = "abc123";
    expect(getRepeatingCharsCount(password)).toBe(0);
  });

  it("should return 1 for a password with repeating characters", () => {
    const password = "aaabbb123";
    expect(getRepeatingCharsCount(password)).toBe(1);
  });
});

describe("minStepsToMakePasswordStrong", () => {
  it("should return 0 for a strong password", () => {
    const password = "aBc123";
    expect(minStepsToMakePasswordStrong(password)).toBe(0);
  });

  it("should calculate the correct steps for a weak password", () => {
    const password = "aA1"; // Missing lowercase, length < 6
    expect(minStepsToMakePasswordStrong(password)).toBe(3);
  });

  it("should handle a long password exceeding 20 characters", () => {
    const password = "aBc123defghijklmnopqrstuvwxyz"; // Length > 20
    expect(minStepsToMakePasswordStrong(password)).toBe(1);
  });
});
