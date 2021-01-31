import { clone } from '@core/utils';
import { currencies as defaultCurrencies } from '@core/services/currency/index.js';

const initialDisplayedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'RUB'];
const createCurrencies = ({ displayedCurrencies, favorites }) => {
  const fn = (acc, item) => {
    const currency = {
      ...item,
      favorite: favorites.includes(item.symbol),
    };
    if (displayedCurrencies.includes(currency.symbol)) {
      acc[currency.symbol] = currency;
    }
    return acc;
  };
  return defaultCurrencies.reduce(fn, {});
};
const defaultState = {
  displayedCurrencies: initialDisplayedCurrencies,
  ordinaries: initialDisplayedCurrencies,
  favorites: [],
  loadedRates: false,
  loadingRates: true,
  baseCurrency: 'RUB',
  rates: {},
  value: 1,
  from: 'USD',
  to: 'RUB',
  error: null,
  currencies: {},
};
defaultState.currencies = createCurrencies(defaultState);

const normalize = (input) => {
  const { favorites } = input;
  const state = clone(defaultState);

  const excludeFavorites = (symbol) => !favorites.includes(symbol);
  const ordinaries = initialDisplayedCurrencies.filter(excludeFavorites);

  const displayedCurrencies = [...favorites, ...ordinaries];
  const currencies = createCurrencies({ displayedCurrencies, favorites });

  return {
    ...state,
    currencies,
    displayedCurrencies,
    favorites,
    ordinaries,
  };
};

const normalizeInitialState = (state) => (state ? normalize(state) : clone(defaultState));

export default normalizeInitialState;
