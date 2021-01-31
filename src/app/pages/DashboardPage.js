import Page from '@core/Page.js';
import { createDebounce } from '@core/utils.js';
import normalizeInitialState from '@app/initialState.js';
import createStore from '@core/stateContainer/createStore.js';
import rootReducer from '@app/rootReducer.js';
import DashboardComponent from '@app/components/dashboard/DashboardComponent.js';
import { startFetchRates, finishFetchRates, failedFetchRates } from '@app/state/actions/currencyActions.js';
import $ from '@core/dom';

export default class DashboardPage extends Page {
  constructor(params = {}, { eventDispatcher, currencyService }) {
    super(params);
    this.eventDispatcher = eventDispatcher;
    this.currencyService = currencyService;
  }

  getRoot() {
    const favorites = this.currencyService.getFavorites();
    const initialState = normalizeInitialState({
      favorites,
    });
    const store = createStore(rootReducer, initialState);

    const stateListener = createDebounce((state) => {
      this.currencyService.saveFavorites(state.favorites);
    }, 300);
    store.subscribe(stateListener);

    if (initialState.loadedRates === false) {
      store.dispatch(startFetchRates());
      this.currencyService.fetchRates({
        baseCurrency: initialState.baseCurrency,
        success: (rates) => store.dispatch(finishFetchRates(rates)),
        failure: () => store.dispatch(failedFetchRates('Failed to load currency rates')),
      });
    }

    const $root = $.create('div', DashboardComponent.className);
    this.component = new DashboardComponent($root, {
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
