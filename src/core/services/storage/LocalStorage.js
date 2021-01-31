import Storage from '@core/services/storage/Storage.js';

export default class LocalStorage extends Storage {
  // префикс БД для отделения ее от остальных
  constructor(prefix) {
    super();
    this.prefix = `${prefix}@`;
  }

  createKey(key) {
    return this.prefix + key;
  }

  fetch(key) {
    const data = localStorage.getItem(this.createKey(key));

    return JSON.parse(data);
  }

  save(key, data = null) {
    localStorage.setItem(this.createKey(key), JSON.stringify(data));
  }
}
