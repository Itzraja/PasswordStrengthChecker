// function to get repeating characters count
function getRepeatingCharsCount(password) {
  let count = 1;
  let maxRepeatingCharsCount = 0;
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      count++;
      if (count === 3) {
        maxRepeatingCharsCount = 1;
        count = 1; // Reset count after finding a set of 3 repeating characters
      }
    } else {
      count = 1;
    }
  }

  return maxRepeatingCharsCount;
}

// Function to calculate the minimum steps
function minStepsToMakePasswordStrong(password) {
  let missingRequirements = 0;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (!hasLowerCase) missingRequirements++;
  if (!hasUpperCase) missingRequirements++;
  if (!hasDigit) missingRequirements++;
  if (password.length > 20) missingRequirements++;

  const lengthDiff = Math.max(0, 6 - password.length);

  const repeatingCharsCount = getRepeatingCharsCount(password);

  const stepsToMakeStrong = Math.max(
    missingRequirements,
    lengthDiff,
    repeatingCharsCount
  );
  return stepsToMakeStrong;
}

module.exports = {
  getRepeatingCharsCount,
  minStepsToMakePasswordStrong,
};
