const createNoop =
  <T>(value: T) =>
  (): T =>
    value;

const noop = () => {
  return;
};

const numNoop = createNoop(0);
const strNoop = createNoop("");
const boolNoop = createNoop(false);

const asyncNoop = async () => {
  return;
};

const asyncNullNoop = createNoop(Promise.resolve(null));
const asyncNumNoop = createNoop(Promise.resolve(0));
const asyncStrNoop = createNoop(Promise.resolve(""));
const asyncBoolNoop = createNoop(Promise.resolve(false));
const asyncObjNoop = <T = object>(obj: T) => createNoop(Promise.resolve(obj));

export {
  asyncBoolNoop,
  asyncNoop,
  asyncNullNoop,
  asyncNumNoop,
  asyncObjNoop,
  asyncStrNoop,
  boolNoop,
  noop,
  numNoop,
  strNoop,
};
