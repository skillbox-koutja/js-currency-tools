const createConverterCard = (props) => {
  const {
    currency,
    from = false,
    fromSymbol,
    value,
  } = props;

  const exchangeRate = props.exchangeRate.toFixed(4);
  const inputValue = value ? (value * exchangeRate).toFixed(4) : '';
  const meta = `
    data-type="currency"
    data-key='${from === false ? 'to' : 'from'}'
  `;
  return `<li class="currency ${from ? 'from-currency' : ''}" id=${currency.symbol} ${meta}>
      <img src=${currency.flagUrl} class="flag" alt="${currency.name}" ${meta}>
      <div class="info" ${meta}>
        <p class="input" ${meta}>
          <span class="currency-symbol" ${meta}>${currency.glyph}</span>
          <input id="${from ? 'from-currency-input' : 'to-currency-input'}" 
                value=${inputValue}
                ${from ? '' : 'disabled'}
          >
        </p>
        <p class="currency-name" ${meta}>${currency.symbol} - ${currency.name}</p>
        ${from ? '' : `<p class="base-currency-rate" ${meta}>1 ${fromSymbol} = ${exchangeRate} ${currency.symbol}</p>`}
        
      </div>
    </li>`;
};
const createConverterItems = (props) => {
  const {
    displayedCurrencies, from, to, rates, value, currencies,
  } = props;

  const fromCard = createConverterCard({
    displayedCurrencies,
    from: true,
    value,
    currency: currencies[from],
    exchangeRate: rates[from],
    fromSymbol: from,
  });
  const toCard = createConverterCard({
    displayedCurrencies,
    value,
    currency: currencies[to],
    exchangeRate: rates[to],
    fromSymbol: from,
  });

  return [fromCard, toCard].join('');
};
const createSelectorCard = (currency) => {
  const meta = `
    data-type="select-currency"
    data-symbol='${currency.symbol}'
  `;
  return `<li class="currency" id=${currency.symbol} ${meta}>
      <img src=${currency.flagUrl} class="flag" alt="${currency.name}" ${meta}>
      <div class="info" ${meta}>
        <p class="currency-name" ${meta}>${currency.glyph} (${currency.symbol} - ${currency.name})</p>
      </div>
    </li>`;
};
const createSelectorItems = (props) => {
  const {
    displayedCurrencies, currencies,
  } = props;
  const liCurrencies = [];
  for (let i = 0; i < displayedCurrencies.length; i += 1) {
    const symbol = displayedCurrencies[i];
    const currency = currencies[symbol];
    const card = createSelectorCard(currency);
    liCurrencies.push(card);
  }
  return liCurrencies.join('');
};
const createDashboard = (items) => `<div class="dashboard">
  <header class="header">
    <a href="#dashboard">Open Currency Rates</a>
    <h1>Currency Converter</h1>
  </header>
    <ul class="currencies">${items}</ul>
  </div>`;
const renderConverter = (props) => {
  if (props.loadingRates) {
    return '<div class="loader">Loading...</div>';
  }
  if (props.openedCurrencySelector) {
    const selectorItems = createSelectorItems(props);
    return createDashboard(selectorItems);
  }
  const converterItems = createConverterItems(props);
  return createDashboard(converterItems);
};
export default renderConverter;
