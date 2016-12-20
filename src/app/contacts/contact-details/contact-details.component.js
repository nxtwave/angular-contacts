(function() {
  'use strict';

  angular
    .module('app.contacts')
    .component('contact', {
      template: require('./contact-details.view.html'),
      controller: ContactDetailsController,
      controllerAs: 'vm'
    });

  ContactDetailsController.$inject = ['$state', '$stateParams', 'Dataservice'];

  function ContactDetailsController($state, $stateParams, Dataservice) {
    var vm = this;

    // the contact id to display:
    vm.contactId = $stateParams.contactId;

    // the contact object:
    vm.contact = undefined;

    /**
     * initialize component
     */
    vm.$onInit = function activate() {
      Dataservice.getContact(vm.contactId)
        .then(function(contact) {
          vm.contact = contact;
        });
    };

    /**
     * form submit handler
     */
    vm.onSubmit = function() {
      $state.go('contacts');
    };

  }

})();
