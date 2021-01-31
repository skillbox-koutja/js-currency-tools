import { actions } from '@app/state/actions/currencyActions.js';

const handlers = {};

const filterBySymbol = (symbol) => ((item) => item !== symbol);
handlers[actions.ADD_FAVORITE] = (state, action) => {
  const { favorites, ordinaries, currencies } = state;
  const symbol = action.payload;

  const currency = currencies[symbol];
  const favorite = true;
  const next = {
    currencies: { ...currencies, [symbol]: { ...currency, favorite } },
    favorites: [...favorites, symbol],
    ordinaries: ordinaries.filter(filterBySymbol(symbol)),
  };
  next.displayedCurrencies = [...next.favorites, ...next.ordinaries];

  return {
    ...state,
    ...next,
  };
};
handlers[actions.REMOVE_FAVORITE] = (state, action) => {
  const { favorites, ordinaries, currencies } = state;
  const symbol = action.payload;

  const currency = currencies[symbol];
  const favorite = false;
  const next = {
    currencies: { ...currencies, [symbol]: { ...currency, favorite } },
    favorites: favorites.filter(filterBySymbol(symbol)),
    ordinaries: [...ordinaries, symbol],
  };
  next.displayedCurrencies = [...next.favorites, ...next.ordinaries];

  return {
    ...state,
    ...next,
  };
};
const applyChanges = (state, action) => ({
  ...state,
  ...action.payload,
});
handlers[actions.START_FETCH_RATES] = applyChanges;
handlers[actions.FINISH_FETCH_RATES] = applyChanges;
handlers[actions.FAILED_FETCH_RATES] = applyChanges;

export default handlers;
