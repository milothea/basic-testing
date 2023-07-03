import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const mockCallback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, 0);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockCallback, 0);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, 10);

    expect(mockCallback).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
    }, 11);
  });
});

describe('doStuffByInterval', () => {
  const mockCallback = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 0);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockCallback, 0);
  });

  test('should call callback multiple times after multiple intervals', () => {
    let count = 0;

    doStuffByInterval(mockCallback, 10);

    expect(mockCallback).toHaveBeenCalledTimes(count);

    setInterval(() => {
      count += 1;

      expect(mockCallback).toHaveBeenCalledTimes(count);
    }, 11);
  });
});

describe('readFileAsynchronously', () => {
  const filePath = './index.ts';

  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    const fileContent = await readFileAsynchronously(`${filePath}/trololo`);

    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = await readFileAsynchronously(filePath);

    expect(typeof fileContent).toBe('string');
  });
});
