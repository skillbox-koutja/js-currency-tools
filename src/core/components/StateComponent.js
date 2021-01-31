import Component from '@core/components/Component.js';

export default class StateComponent extends Component {
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(initialState = {}) {
    this.state = { ...initialState };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}
