(function() {
  'use strict';

  angular
    .module('app.contacts')
    .component('contacts.list', {
      template: require('./contacts-list.view.html'),
      controller: ContactsController,
      controllerAs: 'vm'
    });

  ContactsController.$inject = ['Dataservice'];

  function ContactsController(Dataservice) {
    var vm = this;

    // model list of contacts:
    vm.contacts = undefined;

    /**
     * Initialize component
     */
    vm.$onInit = function activate() {
      Dataservice.getContacts()
        .then(function(contacts) {
          vm.contacts = contacts;
        });
    };

  }

})();
