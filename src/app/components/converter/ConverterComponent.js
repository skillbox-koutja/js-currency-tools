import { preventDefault } from '@core/utils';
import StoreSubscriber from '@core/stateContainer/StoreSubscriber.js';
import StateComponent from '@core/components/StateComponent.js';
import $ from '@core/dom';
import {
  changeCurrencySelector,
  changeFromValue,
  openCurrencySelector,
} from '@app/state/actions/currencyActions.js';
import renderConverter from './converter.functions.js';

export default class ConverterComponent extends StateComponent {
  static className = 'app__converter';

  constructor($root, options) {
    super($root, {
      name: 'Converter',
      listeners: [
        'input',
        'click',
      ],
      subscribe: [
        'value',
        'loadedRates',
        'loadingRates',
        'rates',
        'from',
        'to',
        'openedCurrencySelector',
      ],
      ...options,
    });
    this.$root = $root;
    this.components = options.components || [];
    this.store = options.store;
    this.eventDispatcher = options.eventDispatcher;
    this.currencyService = options.currencyService;
    this.subscriber = new StoreSubscriber(this.store);
  }

  prepare() {
    const state = this.store.getState();
    this.initState(state);
  }

  get template() {
    return renderConverter(this.state);
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

  onInput(event) {
    const text = $(event.target).text();

    const { inputTimer } = this;
    if (!inputTimer) {
      clearTimeout(inputTimer);
    }
    this.inputTimer = setTimeout(() => {
      this.$dispatchAction(changeFromValue(text));
    }, 1000);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'currency') {
      const { key } = $target.data;
      const action = openCurrencySelector(key);
      this.$dispatchAction(action);
    }
    if ($target.data.type === 'select-currency') {
      const { symbol } = $target.data;
      const state = this.store.getState();
      const { openedCurrencySelector } = state;
      const payload = { symbol };
      if (openedCurrencySelector === 'from') {
        payload.rates = this.currencyService.changeRates({
          prevRates: state.rates,
          nextBase: symbol,
        });
      }
      const action = changeCurrencySelector(payload);

      this.$dispatchAction(action);
    }
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
}
