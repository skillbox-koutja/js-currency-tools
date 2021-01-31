import $ from '@core/dom/index.js';
import ActiveRoute from './ActiveRoute.js';

export default class Router {
  constructor(selector, resolve, dependencies) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.resolve = resolve;
    this.dependencies = dependencies;

    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();

    const { resolve } = this;
    const Page = resolve();

    this.page = new Page(ActiveRoute.param, this.dependencies);

    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
