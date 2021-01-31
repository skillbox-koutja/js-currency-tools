import { capitalize } from '@core/utils.js';

// input => onInput
function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

export default class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
    this.name = '';
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`,
        );
      }
      this[method] = this[method].bind(this);
      // Тоже самое что и addEventListener;
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.un(listener, this[method]);
    });
  }
}
