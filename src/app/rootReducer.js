import reducerFactory from '@core/stateContainer/reducerFactory.js';
import currencyHandlers from '@app/state/handlers/currencyHandlers.js';
import normalizeInitialState from './initialState.js';

const handlers = {
  ...currencyHandlers,
};

if (process.env.NODE_ENV === 'development') {
  // const initAction = '__INIT__';
  // handlers[initAction] = (state) => {return state};
  window.stateContainer = {
    handlers,
  };
}

export default reducerFactory(normalizeInitialState(), handlers);
