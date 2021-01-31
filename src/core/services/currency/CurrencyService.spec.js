import { describe } from '@jest/globals';
import CurrencyService from '@core/services/currency/CurrencyService.js';

describe('CurrencyService:', () => {
  const rates = {
    USD: 1,
    EUR: 0.823893,
    RUB: 75.955,
    GBP: 0.729661,
    CHF: 0.890916,
    JPY: 104.695,
  };
  const expectedRates = {
    USD: 0.013166,
    EUR: 0.010847,
    RUB: 1,
    GBP: 0.009606,
    CHF: 0.011730,
    JPY: 1.378382,
  };
  const currencies = Object.keys(rates);
  const service = new CurrencyService({}, {});

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should convert correct rates to RUB and then back to USD', () => {
    const rubRates = CurrencyService.changeRates({
      prevRates: rates,
      nextBase: 'RUB',
    });
    currencies.forEach((currency) => {
      test(`should correct rate for ${currency} to RUB`, () => {
        expect(rubRates[currency]).toBeCloseTo(expectedRates[currency]);
      });
    });
    const usdRates = CurrencyService.changeRates({
      prevRates: rubRates,
      nextBase: 'USD',
    });
    currencies.forEach((currency) => {
      test(`should correct back rate for ${currency} to USD`, () => {
        expect(usdRates[currency]).toBeCloseTo(rates[currency]);
      });
    });
  });

  test('should correct convert from "USD" to "RUB"', () => {
    const result = CurrencyService.convert({
      value: 1,
      from: 'USD',
      to: 'RUB',
      rates,
    });
    expect(result).toBeCloseTo(75.955);
  });
  test('should correct convert from "RUB" to "USD"', () => {
    const result = CurrencyService.convert({
      value: 1,
      from: 'RUB',
      to: 'USD',
      rates,
    });
    expect(result).toBeCloseTo(0.0131);
  });
});
