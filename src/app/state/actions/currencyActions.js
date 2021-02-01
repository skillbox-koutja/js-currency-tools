export const actions = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  START_FETCH_RATES: 'START_FETCH_RATES',
  FINISH_FETCH_RATES: 'FINISH_FETCH_RATES',
  FAILED_FETCH_RATES: 'FAILED_FETCH_RATES',
  CHANGE_FROM_VALUE: 'CHANGE_FROM_VALUE',
  OPEN_CURRENCY_SELECTOR: 'OPEN_CURRENCY_SELECTOR',
  CHANGE_CURRENCY_CONVERTER: 'CHANGE_CURRENCY_CONVERTER',
};

export const startFetchRates = () => ({
  type: actions.START_FETCH_RATES,
  payload: {
    loadingRates: true,
    loadedRates: false,
    rates: {},
    error: null,
  },
});

export const finishFetchRates = (rates) => ({
  type: actions.FINISH_FETCH_RATES,
  payload: {
    loadingRates: false,
    loadedRates: true,
    rates,
    error: null,
  },
});

export const failedFetchRates = (error) => ({
  type: actions.FAILED_FETCH_RATES,
  payload: {
    loadingRates: false,
    loadedRates: true,
    rates: {},
    error,
  },
});

export const addFavorite = (symbol) => ({
  type: actions.ADD_FAVORITE,
  payload: symbol,
});

export const removeFavorite = (symbol) => ({
  type: actions.REMOVE_FAVORITE,
  payload: symbol,
});
export const changeFromValue = (value) => ({
  type: actions.CHANGE_FROM_VALUE,
  payload: value,
});
export const openCurrencySelector = (key) => ({
  type: actions.OPEN_CURRENCY_SELECTOR,
  payload: {
    openedCurrencySelector: key,
  },
});
export const changeCurrencySelector = (payload) => ({
  type: actions.CHANGE_CURRENCY_CONVERTER,
  payload,
});
