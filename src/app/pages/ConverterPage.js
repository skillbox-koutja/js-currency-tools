import Page from '@core/Page.js';
import $ from '@core/dom/index.js';
import ConverterComponent from '@app/components/converter/ConverterComponent.js';
import normalizeInitialState from '@app/initialState.js';
import createStore from '@core/stateContainer/createStore.js';
import rootReducer from '@app/rootReducer.js';
import { failedFetchRates, finishFetchRates, startFetchRates } from '@app/state/actions/currencyActions.js';

export default class ConverterPage extends Page {
  constructor(params = {}, { eventDispatcher, currencyService }) {
    super(params);
    this.eventDispatcher = eventDispatcher;
    this.currencyService = currencyService;
  }

  getRoot() {
    const initialState = normalizeInitialState();
    const store = createStore(rootReducer, initialState);

    if (initialState.loadedRates === false) {
      store.dispatch(startFetchRates());
      this.currencyService.fetchRates({
        baseCurrency: initialState.from,
        success: (rates) => store.dispatch(finishFetchRates(rates)),
        failure: () => store.dispatch(failedFetchRates('Failed to load currency rates')),
      });
    }

    const $root = $.create('div', ConverterComponent.className);
    this.component = new ConverterComponent($root, {
      components: [],
      eventDispatcher: this.eventDispatcher,
      currencyService: this.currencyService,
      initialState,
      store,
    });

    return this.component.getRoot();
  }

  afterRender() {
    this.component.init();
  }

  destroy() {
    this.component.destroy();
  }
}
