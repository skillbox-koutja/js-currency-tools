export default class CurrencyService {
  constructor(props, dependencies) {
    this.dependencies = dependencies;
    this.props = props;
  }

  saveFavorites(favorites) {
    const { storage } = this.dependencies;
    storage.save('favorites', favorites);
  }

  getFavorites() {
    const { storage } = this.dependencies;
    const data = storage.fetch('favorites');
    return Array.isArray(data) ? data : [];
  }

  fetchRates({ baseCurrency, success, failure }) {
    const { logger } = this.dependencies;
    const { dataUrl } = this.props;
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        const { rates, base } = data;
        let result = rates;
        if (base !== baseCurrency) {
          result = CurrencyService.changeRates({
            prevRates: rates,
            nextBase: baseCurrency,
          });
        }
        return success(result);
      })
      .catch((err) => {
        logger(err);
        failure();
      });
  }

  static changeRates({ prevRates, nextBase }) {
    const rates = {};
    const currencies = Object.keys(prevRates);
    const convert = (currency) => {
      rates[currency] = (prevRates[currency] / prevRates[nextBase]);
    };
    currencies.forEach(convert);
    rates[nextBase] = 1;
    return rates;
  }

  static convert({
    value, from, to, rates,
  }) {
    const ratio = rates[to] / rates[from];
    return ratio * value;
  }
}
