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
          name: 'about',
          url: '/about',
          component: 'about'
        })

        .state({
          abstract: true,
          name: 'contacts',
          url: '/contacts',
          template: '<ui-view></ui-view>'
        })

        .state({
          name: 'contacts.list',
          url: '/list',
          component: 'contacts'
        })

        .state({
          name: 'contacts.detail',
          url: '/{contactId}',
          component: 'contact'
        })

    }

})();
