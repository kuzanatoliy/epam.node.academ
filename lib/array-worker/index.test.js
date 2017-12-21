const arrayWorker = require('./index');

const test1 = [1, -1, 2, -2, 3, -3, 4, -4, 5, -5];
const test2 = [-5, 7, -1, 4, 15, -3, -7, 2, -11, 13];
const test3 = [0, 0, 0];

describe("[1, -1, 2, -2, 3, -3, 4, -4, 5, -5]", () => {
  test('max = 5', () => expect(arrayWorker.getMaxOfArray(test1)).toBe(5));

  test('min = -5', () => expect(arrayWorker.getMinOfArray(test1)).toBe(-5));

  test('get ascending array [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]', () => {
    expect(arrayWorker.getAscendingArray(test1)).toEqual([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  });

  test('get descending array [5, 4, 3, 2, 1, -1, -2, -3, -4, -5]', () => {
    expect(arrayWorker.getDescendingArray(test1)).toEqual([5, 4, 3, 2, 1, -1, -2, -3, -4, -5]);
  });

  test('get positive items [1, 2, 3, 4, 5]', () => {
    expect(arrayWorker.getPositiveItems(test1)).toEqual([1, 2, 3, 4, 5]);
  });

  test('get negative items [-1, -2, -3, -4, -5]', () => {
    expect(arrayWorker.getNegativeItems(test1)).toEqual([-1, -2, -3, -4, -5]);
  });
});

describe("[-5, 7, -1, 4, 15, -3, -7, 2, -11, 13]", () => {
  test('max = -7', () => expect(arrayWorker.getMaxOfArray(test2)).toBe(15));

  test('min = -11', () => expect(arrayWorker.getMinOfArray(test2)).toBe(-11));

  test('get ascending array [-11, -7, -5, -3, -1, 2, 4, 7, 13, 15]', () => {
    expect(arrayWorker.getAscendingArray(test2)).toEqual([-11, -7, -5, -3, -1, 2, 4, 7, 13, 15]);
  });

  test('get descending array [15, 13, 7, 4, 2, -1, -3, -5, -7, -11]', () => {
    expect(arrayWorker.getDescendingArray(test2)).toEqual([15, 13, 7, 4, 2, -1, -3, -5, -7, -11]);
  });

  test('get positive items [7, 4, 15, 2, 13]', () => {
    expect(arrayWorker.getPositiveItems(test2)).toEqual([7, 4, 15, 2, 13]);
  });

  test('get negative items [-5, -1, -3, -7, -11]', () => {
    expect(arrayWorker.getNegativeItems(test2)).toEqual([-5, -1, -3, -7, -11]);
  });
});

describe("[0, 0, 0]", () => {
  test('max = 0', () => expect(arrayWorker.getMinOfArray(test3)).toBe(0));

  test('min = 0', () => expect(arrayWorker.getMinOfArray(test3)).toBe(0));

  test('get ascending array [0, 0, 0]', () => {
    expect(arrayWorker.getAscendingArray(test3)).toEqual([0, 0, 0]);
  });

  test('get descending array [0, 0, 0]', () => {
    expect(arrayWorker.getDescendingArray(test3)).toEqual([0, 0, 0]);
  });

  test('get positive items []', () => {
    expect(arrayWorker.getPositiveItems(test3)).toEqual([]);
  });

  test('get negative items []', () => {
    expect(arrayWorker.getNegativeItems(test3)).toEqual([]);
  });
});