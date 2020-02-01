import message from '../message'

describe('#message', () => {
  test('should return a successfull message', () => {
    expect(message('world')).toBe('Hello world!')
  })
})
