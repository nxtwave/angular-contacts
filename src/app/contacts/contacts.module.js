(function() {
  'use strict';

  angular
    .module('app.contacts', []);

  require('./contacts.component.js');
  require('./contacts-list/contacts-list.component.js');
  require('./contacts-details/contacts-details.component');

})();
