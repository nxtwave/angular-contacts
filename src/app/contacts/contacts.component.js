(function() {
  'use strict';

  angular
    .module('app.contacts')
    .component('contacts', {
      template: '<ui-view></ui-view>',
      controllerAs: 'vm'
    });

})();
