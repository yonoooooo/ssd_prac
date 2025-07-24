let expect;
let isPasswordValid, isCommonPassword;

before(async function () {
  const chai = await import('chai');
  expect = chai.expect;

  const pwdFuncs = await import('../src/utils/pwd_functions.js');
  isPasswordValid = pwdFuncs.isPasswordValid;
  isCommonPassword = pwdFuncs.isCommonPassword;
});

describe('Password Validation Tests', function () {
  it('should reject passwords shorter than 8 characters', function () {
    expect(isPasswordValid('Ab1!')).to.be.false;
  });

  it('should reject passwords with no uppercase letters', function () {
    expect(isPasswordValid('ab1!abcd')).to.be.false;
  });

  it('should reject passwords with no lowercase letters', function () {
    expect(isPasswordValid('AB1!ABCD')).to.be.false;
  });

  it('should reject passwords with no digits', function () {
    expect(isPasswordValid('Abc!defg')).to.be.false;
  });

  it('should reject passwords with no special characters', function () {
    expect(isPasswordValid('Abc1defg')).to.be.false;
  });

  it('should reject a known common password', function () {
    expect(isCommonPassword('123456')).to.be.true;
    expect(isPasswordValid('123456')).to.be.false;
  });

  it('should accept a strong, uncommon password', function () {
    expect(isPasswordValid('My$ecureP@ssw0rd')).to.be.true;
  });
});
