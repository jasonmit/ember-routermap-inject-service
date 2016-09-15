import Ember from 'ember';

const { Router, getOwner } = Ember;

export function setup() {
  Ember.RouterDSL.prototype.service = function service(serviceName) {
    return this.options.__owner.lookup('service:' + serviceName);
  };

  Router.reopen({
    _buildDSL() {
      const dsl = this._super.apply(this, arguments);
      dsl.options.__owner = getOwner(this);

      return dsl;
    }
  });
}
