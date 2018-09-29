export default class ResponseReducer {
  constructor(switchCase) {
    this.switchCase = switchCase;
  }

  execute(state, payload) {
    const makeChange = this.switchCase[payload.status] || this.switchCase.default;
    return (makeChange)
      ? {...state, ...makeChange()}
      : null;
  }
}

export function response(switchCase) {
  return new ResponseReducer(switchCase);
}
