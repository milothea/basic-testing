import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  let account: BankAccount;
  let beneficiary: BankAccount;

  beforeEach(() => (account = getBankAccount(100500)));

  test('should create account with initial balance', () => {
    expect(getBankAccount(0)).toBeInstanceOf(BankAccount);
    expect(getBankAccount(50).getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(100501)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    beneficiary = getBankAccount(0);

    expect(() => account.transfer(100501, beneficiary)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100500, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.getBalance()).toBe(100500);

    account.deposit(1);

    expect(account.getBalance()).toBe(100501);
  });

  test('should withdraw money', () => {
    expect(account.getBalance()).toBe(100500);

    account.withdraw(500);

    expect(account.getBalance()).toBe(100000);
  });

  test('should transfer money', () => {
    beneficiary = getBankAccount(0);

    expect(account.getBalance()).toBe(100500);
    expect(beneficiary.getBalance()).toBe(0);

    account.transfer(500, beneficiary);

    expect(account.getBalance()).toBe(100000);
    expect(beneficiary.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
