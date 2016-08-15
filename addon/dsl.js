import Ember from 'ember';

export function setup(instance) {
  const proto = Ember.RouterDSL.prototype;

  proto.service = function service(serviceName) {
    return instance.lookup('service:' + serviceName);
  };
}
