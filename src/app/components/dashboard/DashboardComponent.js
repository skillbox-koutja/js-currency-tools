import { preventDefault } from '@core/utils';
import StoreSubscriber from '@core/stateContainer/StoreSubscriber.js';
import StateComponent from '@core/components/StateComponent.js';
import renderDashboard from '@app/components/dashboard/dashboard.functions.js';
import $ from '@core/dom';
import { addFavorite, removeFavorite } from '@app/state/actions/currencyActions.js';

export default class DashboardComponent extends StateComponent {
  static className = 'app__dashboard';

  constructor($root, options) {
    super($root, {
      name: 'Dashboard',
      listeners: [
        'click',
      ],
      subscribe: [
        'loadedRates',
        'loadingRates',
        'rates',
        'currencies',
        'displayedCurrencies',
      ],
      ...options,
    });
    this.components = options.components || [];
    this.store = options.store;
    this.eventDispatcher = options.eventDispatcher;
    this.subscriber = new StoreSubscriber(this.store);
  }

  prepare() {
    const state = this.store.getState();
    this.initState(state);
  }

  get template() {
    return renderDashboard(this.state);
  }

  toHtml() {
    return this.template;
  }

  storeChanged(changes) {
    this.storeThrottledChanges(changes);
  }

  getRoot() {
    const { $root } = this;

    return $root;
  }

  init() {
    this.initDomListeners();

    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    // this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents([this]);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());

    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'currency') {
      const { symbol } = $target.data;
      const favorite = JSON.parse($target.data.favorite);
      const isFavorite = favorite === true;
      const action = isFavorite
        ? removeFavorite(symbol)
        : addFavorite(symbol);

      this.$dispatchAction(action);
    }
  }
}
