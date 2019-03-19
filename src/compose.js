export const compose = (...funcs) => (...args) =>
  funcs.reduceRight(
    (val, func, i) => (i === funcs.length ? func(...val) : func(val)),
    args
  );

export default compose;
