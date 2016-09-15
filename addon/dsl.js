import Ember from 'ember';

const { Router, getOwner } = Ember;

export function setup() {
  Ember.RouterDSL.prototype.service = function service(serviceName) {
    return this.__owner.lookup('service:' + serviceName);
  };

  Router.reopen({
    _buildDSL() {
      const dsl = this._super.apply(this, arguments);
      dsl.__owner = getOwner(this);

      return dsl;
    }
  });
}
