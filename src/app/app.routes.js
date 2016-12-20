(function() {
  'use strict';

  angular
    .module('app')
    .config(Config);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state({
          name: 'home',
          url: '/home',
          component: 'home'
        })

        .state({
          name: 'contacts',
          url: '/contacts',
          component: 'contacts'
        })

        .state({
          name: 'contact',
          url: '/contact/{contactId}',
          component: 'contact'
        })

        .state({
          name: 'about',
          url: '/about',
          component: 'about'
        })
    }

})();




