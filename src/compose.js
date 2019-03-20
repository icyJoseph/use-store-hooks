const identity = e => e;
export const compose = (...funcs) => (...args) =>
  [identity, ...funcs].reduceRight(
    (val, func, i, src) => (i === src.length - 1 ? func(...val) : func(val)),
    args
  );

export default compose;
