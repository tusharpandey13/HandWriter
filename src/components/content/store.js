import range from 'lodash/range';

// char : [X, Y, offsetX, offsetY, marginLeft, marginRight, scaleX, scaleY]
const dimMap = {
  0: [34, 31, 0, -20, 0, 2, 1.2, 2.3, {}],
  1: [7, 29, 0, -20, 1, 3, 1.5, 2.4, {}],
  2: [23, 28, 0, -20, 0, 1, 1.5, 2.5, {}],
  3: [25, 31, 0, -20, 0, 2, 1.3, 2.3, {}],
  4: [30, 35, 0, -20, 0, 1, 1.2, 2, {}],
  5: [31, 28, 0, -20, 1, 1, 1.5, 2.5, {}],
  6: [24, 28, 0, -20, 0, 0, 1.5, 2.5, {}],
  7: [27, 35, 0, -20, 0, 2, 1.2, 2, {}],
  8: [27, 33, 0, -19, 0, 1, 1.3, 2.1, {}],
  9: [28, 40, 0, -18, 0, 1, 1.3, 1.8, {}],
  '!': [11, 65, 0, -10, 5, 10, 1, 1, {}],
  '"': [13, 22, 0, -50, 5, 10, 1.5, 1, {}],
  '#': [56, 74, 0, 0, 5, 10, 1, 1, {}],
  $: [48, 101, 0, 0, 5, 10, 1, 0.8, {}],
  '%': [48, 70, 0, 0, 5, 10, 1, 1, {}],
  '&': [44, 63, 0, 0, 5, 10, 1, 1, {}],
  "'": [7, 18, 0, -50, 5, 10, 1, 1, {}],
  '`': [7, 18, 0, -50, 5, 10, 1, 1, {}],
  '(': [18, 66, 0, 0, 5, 10, 1, 1, {}],
  ')': [23, 67, 0, 0, 5, 10, 1, 1, {}],
  '*': [38, 35, 0, -20, 5, 10, 1, 1, {}],
  '+': [38, 32, 0, -20, 5, 10, 1, 1, {}],
  ',': [12, 16, 0, -20, 5, 10, 1.2, 1.5, {}],
  '-': [30, 6, 0, -30, 5, 10, 1, 1, {}],
  '.': [10, 11, 0, -5, 5, 10, 1, 1, {}],
  '/': [33, 61, 0, -10, 5, 10, 1, 1, {}],
  ':': [12, 39, 0, -20, 5, 10, 1, 1, {}],
  ';': [11, 46, 0, -10, 5, 10, 1, 1, {}],
  '<': [36, 33, 0, -20, 5, 10, 1, 1, {}],
  '=': [31, 19, 0, -30, 5, 5, 1, 1, {}],
  '>': [34, 33, 0, -20, 5, 10, 1, 1, {}],
  '?': [27, 65, 0, -10, 5, 10, 1, 1, {}],
  '@': [56, 69, 0, 0, 5, 10, 1, 1, {}],
  '[': [25, 66, 0, 0, 5, 10, 1, 1.2, {}],
  '\\': [42, 52, 0, -10, 5, 10, 1, 1.2, {}],
  ']': [28, 63, 0, -5, 5, 10, 1, 1.2, {}],
  '^': [40, 36, 0, -50, 5, 10, 1, 1, {}],
  _: [56, 8, 0, -10, 5, 10, 1, 1, {}],
  '{': [25, 61, 0, -5, 5, 10, 1, 1.2, {}],
  '|': [10, 62, 0, -10, 5, 10, 1, 1.1, {}],
  '}': [26, 62, 0, -5, 5, 10, 1, 1.2, {}],
  A: [75, 70, 0, 0, 0, 0, 0.9, 1, {}],
  B: [49, 70, 0, 0, 0, 0, 0.9, 1, {}],
  C: [53, 70, 0, 0, 2, 1, 0.9, 1, {}],
  D: [56, 70, 0, 0, 1, 1, 0.9, 1, {}],
  E: [54, 70, 0, 0, 1, 1, 0.9, 1, {}],
  F: [45, 70, 0, 0, 1, 1, 0.9, 1, {}],
  G: [50, 70, 0, 0, 1, 1, 0.9, 1, {}],
  H: [54, 70, 0, 0, 1, 1, 0.9, 1, {}],
  I: [46, 70, 0, 0, 1, 1, 0.9, 1, {}],
  J: [52, 70, 0, 0, 1, 1, 0.9, 1, {}],
  K: [46, 70, 0, 0, 1, 1, 0.9, 1, {}],
  L: [49, 70, 0, 0, 1, 1, 0.9, 1, {}],
  M: [82, 70, 0, 0, 1, 1, 0.9, 1, {}],
  N: [67, 70, 0, 0, 1, 2, 0.9, 1, {}],
  O: [51, 70, 0, 0, 1, 1, 0.9, 1, {}],
  P: [51, 70, 0, 0, 1, 1, 0.9, 1, {}],
  Q: [66, 70, 0, 0, 1, 1, 0.9, 1, {}],
  R: [44, 70, 0, 0, 1, 1, 0.9, 1, {}],
  S: [40, 70, 0, 0, 1, 1, 0.9, 1, {}],
  T: [72, 70, 0, 0, 1, 1, 0.9, 1, {}],
  U: [54, 70, 0, 0, 1, 1, 0.9, 1, {}],
  V: [62, 70, 0, 0, 1, 1, 0.9, 1, {}],
  W: [75, 70, 0, 0, 1, 1, 0.9, 1, {}],
  X: [51, 70, 0, 0, 1, 1, 0.9, 1, {}],
  Y: [52, 70, 0, 0, 1, 1, 0.9, 1, {}],
  Z: [66, 70, 0, 0, 1, 1, 0.9, 1, {}],

  a: [60, 40, 0, 0, 0, 0, 0.9, 1, {}],
  c: [37, 40, 0, 0, 0, 1, 1, 1, {}],
  e: [37, 40, 0, 0, 0, 0, 1, 1, {}],
  m: [87, 40, 0, 0, 0, 0, 1, 1, {}],
  n: [59, 40, 0, 0, 0, 0, 0.9, 1, {}],
  o: [35, 40, 0, 0, 0, 1, 1, 1, {}],
  r: [61, 40, 0, 0, 0, 0, 1, 1, {}],
  s: [35, 40, 0, 0, 0, 0, 1, 1, {}],
  u: [53, 40, 0, 0, 0, 0, 1, 1, {}],
  v: [40, 40, 0, 0, 0, 1, 1, 1, {}],
  w: [50, 40, 0, 0, 0, 0, 1, 1, {}],
  x: [53, 40, 0, 0, 0, 0, 1, 1, {}],

  b: [36, 70, 0, 0, 0, 1, 1, 1, {}],
  d: [43, 70, 0, 0, 0, 1, 1, 1, {}],
  f: [37, 70, 0, 0, 0, 1, 1, 1, {}],
  h: [42, 70, 0, 0, 0, 1, 1, 1, {}],
  i: [32, 70, 0, 0, 0, 1, 1, 1, {}],
  j: [26, 70, 0, 20, 0, 3, 1, 1, {}],
  k: [39, 70, 0, 0, 0, 1, 1, 1, {}],
  l: [33, 70, 0, 0, 0, 1, 1, 1, {}],
  t: [34, 70, 0, 0, 0, 1, 1, 1, {}],

  g: [36, 75, 0, 35, 0, 2, 1, 1, {}],
  p: [30, 75, 0, 35, 0, 1, 1, 1, {}],
  q: [50, 75, 0, 35, 0, 1, 1, 1, {}],
  y: [29, 75, 0, 35, 0, 1, 1, 1, {}],
  z: [54, 75, 0, 35, 0, 1, 1, 1, {}],
};

const initialState = {
  text: 'Example text here',
  bgURLS: [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAtJREFUCFtj+A8EAAn7A/2fHywAAAAAAElFTkSuQmCC',
  ],
  bgURLindex: 0,
  chars: range(33, 126).reduce((obj, i) => {
    const tmpchar = String.fromCharCode(i);
    let tmpimg = new Image(dimMap[tmpchar][0], dimMap[tmpchar][1]);
    tmpimg.src = `${process.env.PUBLIC_URL}/font/${i}_t.png`;
    obj[tmpchar] = tmpimg;
    return obj;
  }, {}),
  commonConfig: {
    scale: 20,
    left: -70,
    top: -66.5,
    linespacing: 101,
    opacity: 0.82,
    width: 480,
    cols: 50,
  },
  stageRef: undefined,
  imageURLS: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGETEXT':
      return { ...state, text: action.text };
    case 'RESETTEXT':
      return { ...state, text: initialState.text };
    case 'ADDBGURLS':
      return { ...state, bgURLS: [...state.bgURLS, action.bgURLS] };
    case 'RESETBGURLS':
      return { ...state, bgURLS: initialState.bgURLS };
    case 'CHANGEBGURLINDEX':
      return { ...state, bgURLindex: action.bgURLindex };
    case 'RESETBGURLINDEX':
      return { ...state, bgURLindex: initialState.bgURLindex };
    case 'CHANGECOMMONCONFIG':
      return { ...state, commonConfig: action.commonConfig };
    case 'SETSTAGEREF':
      return { ...state, stageRef: action.stageRef };
    case 'ADDIMAGEURLS':
      return { ...state, imageURLS: state.imageURLS.concat(action.imageURLS) };
    case 'RESETIMAGEURLS':
      return { ...state, imageURLS: initialState.imageURLS };
    default:
      return state;
  }
};

export { initialState, reducer, dimMap };
