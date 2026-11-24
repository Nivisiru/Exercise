const { parseNums, findMean, findMedian, findMode } = require('./helpers');

describe('#parseNums', function () {
  it('parses a comma-separated list', function () {
    expect(parseNums('1,2.5,-3')).toEqual([1, 2.5, -3]);
  });

  it('tolerates whitespace around numbers', function () {
    expect(parseNums('1, 2 ,3')).toEqual([1, 2, 3]);
  });

  it('throws 400 when input is missing', function () {
    expect(() => parseNums(undefined)).toThrow('nums are required.');
    expect(() => parseNums('')).toThrow('nums are required.');
    try {
      parseNums(undefined);
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });

  it('throws 400 on a non-number', function () {
    expect(() => parseNums('foo,2,3')).toThrow('foo is not a number.');
    try {
      parseNums('foo,2,3');
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });

  it('rejects empty values instead of treating them as 0', function () {
    expect(() => parseNums('1,,3')).toThrow('not a number');
    expect(() => parseNums('1,2,')).toThrow('not a number');
    expect(() => parseNums('1, ,3')).toThrow('not a number');
  });
});

describe('#findMean', function () {
  it('finds the mean of an empty array', function () {
    expect(findMean([])).toEqual(0);
  });
  it('finds the mean of an array of numbers', function () {
    expect(findMean([1, -1, 4, 2])).toEqual(1.5);
  });
  it('finds the mean of a single number', function () {
    expect(findMean([7])).toEqual(7);
  });
  it('handles decimals', function () {
    expect(findMean([0.5, 1.5])).toBeCloseTo(1);
  });
});

describe('#findMedian', function () {
  it('finds the median of an even set', function () {
    expect(findMedian([1, -1, 4, 2])).toEqual(1.5);
  });
  it('finds the median of an odd set', function () {
    expect(findMedian([1, -1, 4])).toEqual(1);
  });
  it('sorts numerically, not alphabetically', function () {
    expect(findMedian([10, 9, 100])).toEqual(10);
  });
  it('finds the median of a single number', function () {
    expect(findMedian([5])).toEqual(5);
  });
  it('returns 0 for an empty array', function () {
    expect(findMedian([])).toEqual(0);
  });
  it('does not mutate its input', function () {
    const nums = [3, 1, 2];
    findMedian(nums);
    expect(nums).toEqual([3, 1, 2]);
  });
});

describe('#findMode', function () {
  it('finds the mode', function () {
    expect(findMode([1, 1, 1, 2, 2, 3])).toEqual(1);
  });
  it('works with negatives and decimals', function () {
    expect(findMode([-1.5, 2, -1.5])).toEqual(-1.5);
  });
  it('returns the first-seen value on a tie', function () {
    expect(findMode([3, 3, 1, 1])).toEqual(3);
  });
  it('returns a number, not a string', function () {
    expect(typeof findMode([4, 4, 2])).toBe('number');
  });
});
