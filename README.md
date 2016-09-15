# ember-routermap-inject-service

Enables being able to lookup services from within the Router.map callback.

This is useful for conditionally registering routes or localizing paths based upon state known at app boot time.

This serves as a monkey patch for:
https://github.com/emberjs/ember.js/issues/13840

```js
Router.map(function() {
  let session = this.service('session');

  if (session.get('isAdmin')) {
    this.route('admin', { path: '/' });
  } else {
    this.route('home', { path: '/' });
  }

  this.route('about', { path: '/' + session.translate('urls.about') });
  this.route('contact', { path: '/' + session.translate('urls.contact') });
});
```

All of this is based on the assumption translations are loaded into the app instance
during initialization.  This is can be done using an instance initializer.

```js
import fetch from 'ember-network/fetch';

export default {
  name: 'translation-loader',
  initialize(instance) {
    let session = instance.lookup('service:session');
    let user = JSON.parse(document.querySelector("meta[name='user-data']").content);

    session.hydrate(user);
  }
}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
# ember-routermap-inject-service
