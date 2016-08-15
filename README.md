# Ember-routermap-inject-service

Enables being able to lookup services from within the Router.map callback.

This is useful for conditionally registering routes or localizing paths.

```js
Router.map(function() {
  let i18n = this.service('i18n');
  let session = this.service('session');

  if (session.get('isAdmin')) {
    this.route('admin', { path: '/' });
  } else {
    this.route('home', { path: '/' });
  }

  this.route('about', { path: '/' + i18n.t('urls.about') });
  this.route('contact', { path: '/' + i18n.t('urls.contact') });
});
```

All of this is based on the assumption translations are loaded into the app instance
during initialization.  This is can be done using an instance initializer.

```js
import fetch from 'ember-network/fetch';

export default {
  name: 'translation-loader',
  initialize(instance) {
    let i18n = instance.lookup('service:i18n');
    let session = instance.lookup('service:session');
    let user = JSON.parse(document.querySelector("meta[data-user]").content);

    session.load(user);
    i18n.addTranslations(user.locale, user.translations);
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
