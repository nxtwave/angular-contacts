(function() {
  'use strict';

  angular
    .module('app.contacts')
    .component('contacts', {
      template: '<section><ui-view></ui-view></section>',
      controllerAs: 'vm'
    });

})();
