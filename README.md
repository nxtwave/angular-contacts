# angular-contacts

Angular Contacts application demonstrates 'component routing' using Angular-UI-Router and
Angular 1.5+ Components. 

## Application Routes
The application has three primary routes and one secondary route. Each route is based on a
component which contains a controller and a view.

### Primary Routes
* Home
* Contacts
* About

### Secondary Route
* Contact

## Route Configuration
The application routes are configured in /src/app/app.routes.js. The four routes are
configured as states that the application can transition to. When transitioning to a state,
the component of the state is activated, and the view of the component is rendered within
the <ui-view></ui-view> tags of the main view.

```
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
```

## Layout and Navigation
The anchor tag links use the ui-sref directive for navigation to the route state. The
ui-sref-active directive on the list item tag sets the active class on the active link. The 
<ui-view></ui-view> directive is the space where the view of the active state will 
display. 

When the user selects a menu item, the state is set, and the corresponding view is displayed
in the view area.

```
<div>

  <!-- Fixed navbar -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">I-Contact</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li ui-sref-active="active"><a ui-sref="home">Home</a></li>
          <li ui-sref-active="active"><a ui-sref="contacts">Contacts</a></li>
          <li ui-sref-active="active"><a ui-sref="about">About</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <ui-view></ui-view>
  </div>

</div>
```

## Route Implementation

### Home Component

```
(function() {
  'use strict';

  angular
    .module('app.home')
    .component('home', {
      template: require('./home.view.html'),
      controller: HomeController,
      controllerAs: 'vm'
    });

  function HomeController() {
    var vm = this;

    vm.title = 'Home';

    vm.$onInit = function() {
      console.log('app.home.oninit');
    };

  }

})();

```

### Contacts Component
```
(function() {
  'use strict';

  angular
    .module('app.contacts')
    .component('contacts', {
      template: require('./contacts.view.html'),
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

```

### About Component
```
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
```

### Contact-Details Component
```
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

```
