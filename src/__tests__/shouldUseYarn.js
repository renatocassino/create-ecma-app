describe('#shouldUseYarn', () => {
  beforeEach(() => jest.resetModules());

  test('should return successfull and return true', () => {
    jest.mock('child_process', () => ({
      execSync: () => 'Some return',
    }));
    const shouldUseYarn = require('../shouldUseYarn');

    expect(shouldUseYarn()).toBeTruthy();
  });

  test('should return false if return an error', () => {
    jest.mock('child_process', () => ({
      execSync: () => {
        throw new Error('Some error here');
      },
    }));
    const shouldUseYarn = require('../shouldUseYarn');

    expect(shouldUseYarn()).toBeFalsy();
  });
});
