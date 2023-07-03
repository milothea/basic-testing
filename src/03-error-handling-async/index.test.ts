import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValues = ['test', 10, false];

    expect(await resolveValue(testValues[0])).toBe(testValues[0]);
    expect(await resolveValue(testValues[1])).toBe(testValues[1]);
    expect(await resolveValue(testValues[2])).toBe(testValues[2]);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('test')).toThrow('test');
    expect(() => throwError('test 1')).toThrow('test 1');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
