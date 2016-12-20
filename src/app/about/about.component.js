(function() {
  'use strict';

  angular
    .module('app.about')
    .component('about', {
      template: require('./about.view.html'),
      controller: AboutController
    });

  function AboutController() {
    var vm = this;

    vm.$onInit = function() {

    };

  }

})();
