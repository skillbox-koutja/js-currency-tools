class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  un(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  find(selector) {
    const $el = this.$el.querySelector(selector);
    return new Dom($el);
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  append(node) {
    const $el = node instanceof Dom ? node.$el : node;

    if (Element.prototype.append) {
      this.$el.append($el);
    } else {
      this.$el.appendChild($el);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    const $el = this.$el.closest(selector);
    return new Dom($el);
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    Object
      .keys(styles)
      .forEach((key) => {
        this.$el.style[key] = styles[key];
      });
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
