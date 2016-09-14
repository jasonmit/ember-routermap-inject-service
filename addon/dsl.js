import Ember from 'ember';

const { Router, getOwner } = Ember;

export function setup() {
  let isEnabled = Ember.__loader.require('ember-metal/features').default;
  let proto = Ember.RouterDSL.prototype;

  Router.reopen({
    _buildDSL() {
      let moduleBasedResolver = this._hasModuleBasedResolver();
      let owner = getOwner(this);
      let router = this;

      let options = {
        owner: owner,
        enableLoadingSubstates: !!moduleBasedResolver
      };

      options.enableLoadingSubstates = !!moduleBasedResolver;

      options.resolveRouteMap = function(name) {
        return owner._lookupFactory('route-map:' + name);
      };

      options.addRouteForEngine = function(name, engineInfo) {
        if (!router._engineInfoByRoute[name]) {
          router._engineInfoByRoute[name] = engineInfo;
        }
      };

      return new Ember.RouterDSL(null, options);
    }
  });

  proto.service = function service(serviceName) {
    return this.options.owner.lookup('service:' + serviceName);
  };
}
