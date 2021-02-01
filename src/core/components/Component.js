import DomListener from '@core/dom/DomListener.js';

export default class Component extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.eventDispatcher = options.eventDispatcher;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.cumulativeChanges = {};
    this.storeChangesTimer = null;

    this.prepare();
  }

  /* eslint-disable class-methods-use-this */
  prepare() {
    // Настраиваем компонент до init
  }

  toHtml() {
    // Возвращает шаблон компонента
    return '';
  }

  storeChanged() {
    // Сюда приходят только изменения по тем полям, на которые мы подписались
  }

  /* eslint-disable class-methods-use-this */
  storeThrottledChanges(changes) {
    let { storeChangesTimer } = this;
    if (storeChangesTimer !== null) {
      clearTimeout(storeChangesTimer);
    }
    const cumulativeChanges = { ...this.cumulativeChanges, ...changes };
    storeChangesTimer = setTimeout(() => {
      this.setState(cumulativeChanges);
      this.cumulativeChanges = {};
    }, 0);
    this.cumulativeChanges = cumulativeChanges;
    this.storeChangesTimer = storeChangesTimer;
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Уведомляем слушателей про событие event
  $dispatchEvent(event, ...args) {
    this.eventDispatcher.dispatch(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.eventDispatcher.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatchAction(action) {
    this.store.dispatch(action);
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners();
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
