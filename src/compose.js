/**
 *
 * @param {*} e any type of argument
 * @returns {*} the same argument
 */
const identity = e => e;

/**
 *
 * @param  {...Functions} funcs a group of functions to compose
 * @param {...any} arguments to apply to the first function from the right
 * @returns the result of evaluation the arguments onto the functions, from right to left
 */
export const compose = (...funcs) => (...args) =>
  [identity, ...funcs].reduceRight(
    (val, func, i, src) => (i === src.length - 1 ? func(...val) : func(val)),
    args
  );

export default compose;
