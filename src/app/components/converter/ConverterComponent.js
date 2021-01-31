import { preventDefault } from '@core/utils';
import StoreSubscriber from '@core/stateContainer/StoreSubscriber.js';
import StateComponent from '@core/components/StateComponent.js';
import renderConverter from './converter.functions.js';

export default class ConverterComponent extends StateComponent {
  static className = 'app__converter';

  constructor($root, options) {
    super($root, {
      name: 'Converter',
      listeners: [],
      subscribe: [
        'loadedRates',
        'loadingRates',
        'rates',
      ],
      ...options,
    });
    this.$root = $root;
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
