import Router from '@core/routes/Router.js';
import './styles/index.css';
import DashboardPage from '@app/pages/DashboardPage.js';
import ConverterPage from '@app/pages/ConverterPage.js';
import ActiveRoute from '@core/routes/ActiveRoute.js';
import EventDispatcher from '@core/services/event/EventDispatcher.js';
import LocalStorage from '@core/services/storage/LocalStorage.js';
import { CurrencyService } from '@core/services/currency/index.js';
import logger from '@core/services/logger/Logger.js';
import nullLogger from '@core/services/logger/NullLogger.js';

const storage = new LocalStorage('app');
const eventDispatcher = new EventDispatcher();

const loggerFn = process.env.NODE_ENV !== 'production' ? logger : nullLogger;

const dataUrl = 'https://openexchangerates.org/api/latest.json?app_id=a4ae16f1dd524bb8bdfd0e20c1897653';
const currencyService = new CurrencyService(
  {
    dataUrl,
  },
  {
    storage,
    logger: loggerFn,
  },
);

const routes = {
  dashboard: DashboardPage,
  converter: ConverterPage,
};
const routeResolver = () => (ActiveRoute.path.includes('converter')
  ? routes.converter
  : routes.dashboard);
const app = new Router(
  '#app',
  routeResolver,
  {
    storage,
    eventDispatcher,
    currencyService,
  },
);
app.init();
