function findRotatedIndex(array, num) {
  // Find the index where the rotation occurs (smallest element)
  var pivot = findPivot(array);

  // If the number lies between the first element and the element before the pivot,
  // it must be in the left sorted portion of the array
  if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
    return binarySearch(array, num, 0, pivot - 1);
  } else {
    // Otherwise search in the right sorted portion
    return binarySearch(array, num, pivot, array.length - 1);
  }
}

function binarySearch(array, num, start, end) {
  // Edge cases
  if (array.length === 0) return -1;
  if (num < array[start] || num > array[end]) return -1;

  // Standard binary search
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    if (array[mid] === num) {
      return mid;
    } else if (num < array[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  // Value not found
  return -1;
}

function findPivot(arr) {
  // If array has one element or is not rotated, pivot is index 0
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

  var start = 0;
  var end = arr.length - 1;

  // Binary search to find the rotation point
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    // If mid element is greater than the next element,
    // the next element is the smallest (pivot)
    if (arr[mid] > arr[mid + 1]) return mid + 1;
    // If left side is sorted, pivot must be on the right
    else if (arr[start] <= arr[mid]) {
      start = mid + 1;
    } else {
      // Otherwise pivot is on the left side
      end = mid - 1;
    }
  }
}

module.exports = findRotatedIndex;
