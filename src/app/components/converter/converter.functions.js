const createCard = (props) => {
  const {
    currency,
    from = false,
    fromSymbol,
    value,
  } = props;

  const exchangeRate = props.exchangeRate.toFixed(4);
  const inputValue = value ? (value * exchangeRate).toFixed(4) : '';

  return `<li class="currency ${from ? 'from-currency' : ''}" id=${currency.symbol}>
      <img src=${currency.flagUrl} class="flag" alt="${currency.name}">
      <div class="info">
        <p class="input">
          <span class="currency-symbol">${currency.glyph}</span>
          <input id="${from ? 'from-currency-input' : 'to-currency-input'}" 
                value=${inputValue}
                ${from ? '' : 'disabled'}
          >
        </p>
        <p class="currency-name">${currency.symbol} - ${currency.name}</p>
        <p class="base-currency-rate">1 ${fromSymbol} = ${exchangeRate} ${currency.symbol}</p>
      </div>
    </li>`;
};
const renderConverter = (props) => {
  if (props.loadingRates) {
    return '<div class="loader">Loading...</div>';
  }
  const {
    displayedCurrencies, from, to, rates, value, currencies,
  } = props;
  const { baseCurrency } = props;

  const fromCard = createCard({
    displayedCurrencies,
    from: true,
    value,
    currency: currencies[from],
    exchangeRate: rates[from],
    fromSymbol: from,
  });
  const toCard = createCard({
    displayedCurrencies,
    baseCurrency,
    value,
    currency: currencies[to],
    exchangeRate: rates[to],
    fromSymbol: from,
  });
  return `<div class="dashboard">
  <header class="header">
    <a href="#dashboard">Open Currency Rates</a>
    <h1>Currency Rates</h1>
  </header>
    <ul class="currencies">${[fromCard, toCard].join('')}</ul>
  </div>`;
};
export default renderConverter;
