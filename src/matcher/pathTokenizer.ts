export const enum TokenType {
  Static,
  Param,
  Group
}

const enum TokenizerState {
  Static,
  Param,
  ParamRegExp, // custom re for a param
  ParamRegExpEnd, // check if there is any ? + *
  EscapeNext
}

interface TokenStatic {
  type: TokenType.Static
  value: string
}

interface TokenParam {
  type: TokenType.Param
  regexp?: string
  value: string
  optional: boolean
  repeatable: boolean
}

interface TokenGroup {
  type: TokenType.Group
  value: Exclude<Token, TokenGroup>[]
}

export type Token = TokenStatic | TokenParam | TokenGroup

const ROOT_TOKEN: Token = {
  type: TokenType.Static,
  value: ''
}

const VALID_PARAM_RE = /[a-zA-Z0-9_]/

export function tokenizePath(path: string): Array<Token[]> {
  const tokens: Array<Token[]> = []

  let state: TokenizerState = TokenizerState.Static
  let previousState: TokenizerState = state
  let segment!: Token[]

  function finalizeSegment() {
    if (segment) tokens.push(segment)
    segment = []
  }

  // index on the path
  let i = 0
  // char at index
  let char: string
  // buffer of the value read
  let buffer: string = ''
  // custom regexp for a param
  let customRe: string = ''

  function consumeBuffer() {
    if (!buffer) return

    if (state === TokenizerState.Static) {
      segment.push({
        type: TokenType.Static,
        value: buffer
      })
    } else if (
      state === TokenizerState.Param ||
      state === TokenizerState.ParamRegExp ||
      state === TokenizerState.ParamRegExpEnd
    ) {
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === '*' || char === '+',
        optional: char === '*' || char === '?'
      })
    }

    buffer = ''
  }

  function addCharToBuffer() {
    buffer += char
  }

  while (i < path.length) {
    char = path[i++]

    switch (state) {
      // 静态路由
      case TokenizerState.Static:
        if (char === '/') {
          if (buffer) {
            consumeBuffer()
          }
          finalizeSegment()
        } else if (char === ':') {
          consumeBuffer()
          state = TokenizerState.Param
        } else {
          addCharToBuffer()
        }
        break

      // 动态路由  /:id
      case TokenizerState.Param:
        if (char === '/') {
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer()
        } else {
          consumeBuffer()
          state = TokenizerState.Static
        }
        break

      case TokenizerState.ParamRegExp:
        if (char === '/') {
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer()
        } else {
          consumeBuffer()
          state = TokenizerState.Static
        }
        break
      default:
        break
    }
  }

  consumeBuffer()
  finalizeSegment()

  return tokens
}
