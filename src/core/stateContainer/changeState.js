export default function changeState(stateKey) {
  return (state, action) => ({
    ...state,
    [stateKey]: action.payload,
  });
}
