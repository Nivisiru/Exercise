const ExpressError = require('./expressError');

/**
 * Parse a comma-separated string into an array of numbers.
 * @param {string} numsString e.g. "1,2,3"
 * @returns {number[]}
 * @throws {ExpressError} 400 if missing or any value is not a number
 */
function parseNums(numsString) {
  if (!numsString) {
    throw new ExpressError('nums are required.', 400);
  }

  return numsString.split(',').map(function (str) {
    const num = Number(str);
    // Number("") and Number(" ") are 0, so reject blanks explicitly
    if (str.trim() === '' || Number.isNaN(num)) {
      throw new ExpressError(`${str === '' ? '(empty value)' : str} is not a number.`, 400);
    }
    return num;
  });
}

/**
 * Build a frequency counter from an array. A Map keeps insertion order
 * and keeps the numbers as numbers (object keys would become strings).
 * @param {Array} arr any array
 * @returns {Map}
 */
function createFrequencyCounter(arr) {
  const counts = new Map();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}

/**
 * Find the most common number. On a tie, the value that appears first wins.
 * @param {number[]} nums
 */
function findMode(nums) {
  let mostFrequent;
  let count = 0;

  for (const [num, freq] of createFrequencyCounter(nums)) {
    if (freq > count) {
      mostFrequent = num;
      count = freq;
    }
  }

  return mostFrequent;
}

/**
 * Find the average of an array of numbers. Returns 0 for an empty array.
 * @param {number[]} nums
 */
function findMean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
}

/**
 * Find the middle value of an array of numbers without mutating it.
 * Returns 0 for an empty array.
 * @param {number[]} nums
 */
function findMedian(nums) {
  if (nums.length === 0) return 0;

  const sorted = [...nums].sort((a, b) => a - b);
  const middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middleIndex] + sorted[middleIndex - 1]) / 2;
  }
  return sorted[middleIndex];
}

module.exports = {
  parseNums,
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
};
