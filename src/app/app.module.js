(function() {
  'use strict';

  angular.module('app', [
    'ui.router',
    'app.home',
    'app.contacts',
    'app.about',
    'app.layout',
    'app.services'
  ]);

  require('bootstrap/dist/css/bootstrap.css');
  require('../sass/app.scss');

  require('./app.routes');

  require('./home/home.module.js');
  require('./contacts/contacts.module.js');
  require('./about/about.module');
  require('./services/services.module');
  require('./layout/layout.module.js');

})();

