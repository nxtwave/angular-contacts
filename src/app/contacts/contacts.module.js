(function() {
  'use strict';

  angular
    .module('app.contacts', []);

  require('./contact-list/contacts.component.js');
  require('./contact-details/contact-details.component');

})();
