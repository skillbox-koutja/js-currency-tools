export const actions = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  START_FETCH_RATES: 'START_FETCH_RATES',
  FINISH_FETCH_RATES: 'FINISH_FETCH_RATES',
  FAILED_FETCH_RATES: 'FAILED_FETCH_RATES',
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
