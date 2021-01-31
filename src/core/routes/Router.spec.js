import { describe } from '@jest/globals';
import Page from '@core/Page.js';
import Router from './Router';

class TestPage extends Page {
  getRoot() {
    const $root = document.createElement('div');
    $root.innerHTML = 'test';
    this.$root = $root;
    return $root;
  }
}

describe('Router:', () => {
  let router;
  let $root;

  beforeEach(() => {
    const routeResolver = () => (TestPage);
    $root = document.createElement('div');
    router = new Router($root, routeResolver);
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should render Test Page', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>test</div>');
  });
});
