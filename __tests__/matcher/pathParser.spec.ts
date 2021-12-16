import { tokenizePath, TokenType } from '../../src/matcher/pathTokenizer'

describe('tokenizer', () => {
  it('static single', () => {
    expect(tokenizePath('/home')).toEqual([
      [{ type: TokenType.Static, value: 'home' }]
    ])
  })

  it('static multiple', () => {
    expect(tokenizePath('/one/two/three')).toEqual([
      [{ type: TokenType.Static, value: 'one' }],
      [{ type: TokenType.Static, value: 'two' }],
      [{ type: TokenType.Static, value: 'three' }]
    ])
  })

  it('param single', () => {
    expect(tokenizePath('/:id')).toEqual([
      [
        {
          type: TokenType.Param,
          value: 'id',
          regexp: '',
          repeatable: false,
          optional: false
        }
      ]
    ])
  })
})
