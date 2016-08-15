import dsl from 'ember-routermap-inject-service/dsl';

export default {
  name: 'ember-routermap-inject-service',
  initialize(instance) {
    dsl.setup(instance);
  }
}
