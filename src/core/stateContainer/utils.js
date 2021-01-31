export const applyChanges = (state, action) => ({
  ...state,
  ...action.payload,
});

export const changeState = (stateKey) => (state, action) => ({
  ...state,
  [stateKey]: action.payload,
});
