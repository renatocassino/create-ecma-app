const getListOfFile = require('../getListOfFiles');

describe('#getListOfFile', () => {
  test('should match the list of files', () => {
    expect(getListOfFile(`${process.cwd()}/src/templates`)).toMatchSnapshot();
  });
});
