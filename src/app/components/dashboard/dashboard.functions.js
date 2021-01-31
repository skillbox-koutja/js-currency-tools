const createFavorite = (currency) => (currency.favorite === true
  ? {
    status: 'favorite',
    glyph: '★',
  }
  : {
    status: '',
    glyph: '☆',
  });
const createCurrencyListItem = (currency, base) => {
  const favorite = createFavorite(currency);
  const exchangeRate = currency.exchangeRate.toFixed(4);
  const baseGlyph = base.glyph;
  const meta = `
    data-type="currency"
    data-symbol='${currency.symbol}'
    data-favorite='${currency.favorite}'
  `;
  return `<li class="currency" id=${currency.symbol} ${meta}>
      <img src=${currency.flagUrl} class="flag" alt="${currency.name}">
      <div class="info" ${meta}>
        <p class="currency-name" ${meta}>${currency.glyph} (${currency.symbol} - ${currency.name}): ${exchangeRate} ${baseGlyph}</p>
      </div>
      <span class="favorite-status ${favorite.status}" ${meta}>${favorite.glyph}</span>
    </li>`;
};
const createCurrenciesListItems = (props) => {
  const {
    displayedCurrencies, baseCurrency, currencies, rates,
  } = props;
  const liCurrencies = [];
  const base = currencies[baseCurrency];
  for (let i = 0; i < displayedCurrencies.length; i += 1) {
    const symbol = displayedCurrencies[i];
    const currency = currencies[symbol];
    if (currency && symbol !== baseCurrency) {
      const exchangeRate = 1 / rates[symbol];
      liCurrencies.push(createCurrencyListItem(
        {
          ...currency,
          exchangeRate,
        },
        base,
      ));
    }
  }
  return liCurrencies;
};
const createCurrenciesList = (items) => `<ul class="currencies">${items.join('')}</ul>`;
const renderDashboard = (props) => {
  if (props.loadingRates) {
    return '<div class="loader">Loading...</div>';
  }
  const items = createCurrenciesListItems(props);
  const currencies = createCurrenciesList(items);

  return `<div class="dashboard">
  <header class="header">
    <a href="#converter">Open Currency Converter</a>
    <h1>Currency Rates</h1>
  </header>
  ${currencies}
  </div>`;
};
export default renderDashboard;
