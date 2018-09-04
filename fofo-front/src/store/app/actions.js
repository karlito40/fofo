/**
 * should be convert to {
 *  type: 'APP.TEST',
 *  something
 * }
 */
export function test(something) {
  return {
    something
  };
}

/**
 * should be convert to {
 *  type: 'APP.HELLO_WORLD',
 *  hello
 * }
 */
export function helloWorld(hello) {
  return {
    hello
  };
}

/**
 * should be convert to {
 *  type: 'APP.OTHER_EVENT',
 *  lorem
 * }
 */
export function otherEvent(lorem) {
  return {
    lorem
  };
}

