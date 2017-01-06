# angular-contacts

Angular Contacts application demonstrates 'component routing' using Angular-UI-Router and
Angular 1.5+ Components. 

## Application Routes
The application has three primary routes and one secondary route. Each route is based on a
component which contains a controller and a view.

### Primary Routes
* Home
* Contacts.list
* About

### Secondary Route
* Contacts.detail

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
          <li ui-sref-active="active"><a ui-sref="contacts.list">Contacts</a></li>
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
The home component is very simple, and its basic purpose is to establish the source of
the markup for the view template.

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
The contact component is a bit more complex. It uses a new Angular 1.5+ lifecycle method
called: $onInit for initializing the data for the controller. When the controller has
been initialized, the $onInit method is called automatically.
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

### Contacts View
The contacts view is significant because it contains links to the contacts detail state.
The anchor tag for the contact name column contains a special routing directive
<ui-sref> which points to the target state of "contact", and it includes a parameter value
of the contactId.

```
<section>

  <div class="page-header">
    <h1><span class="glyphicon glyphicon-list-alt icon-header" aria-hidden="true"></span>&nbsp;Contacts List</h1>
  </div>

  <ui-view></ui-view>

  <div class="table-responsive">
    <table class="table">
      <caption>List of your contacts</caption>
      <thead>
      <tr>
        <th scope="col">Contact</th>
        <th scope="col">Company</th>
        <th scope="col">City</th>
        <th scope="col">Phone</th>
        <th scope="col">Email</th>
      </tr>
      </thead>
      <tbody>
      <tr ng-repeat="contact in vm.contacts">
        <td><a ui-sref="contacts.detail({contactId: contact.id})">{{contact.lastName}}, {{contact.firstName}}</a></td>
        <td>{{contact.company}}</td>
        <td>{{contact.city}}, {{contact.state}}</td>
        <td>{{contact.phone}}</td>
        <td>{{contact.email}}</td>
      </tr>
      </tbody>
    </table>
  </div>

</section>
```

### About Component
The about component is very simple, and its basic purpose is to establish the source of
the markup for the view template.
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
The contact-details component is the most complex relatively speaking. Notice that the
controller of the component injects the following properties:

* $state - the state object to use for navigation
* $stateParams - the parameters object contains the properties passed to this component

First it retrieves the contactId parameter value from $stateParams so we know which
contact to retrieve. Then in the $onInit method, the contactId value is used to retrieve
the contact to display. When the contact form is submitted, the onSubmit method is invoked,
and it uses the $state.go method to navigate back to the contact list.

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

    // the state list:
    vm.states = undefined;

    /**
     * initialize component
     */
    vm.$onInit = function activate() {
      console.log('contact-detail.init', vm.contactId);

      Dataservice.getContact(vm.contactId)
        .then(function(contact) {
          vm.contact = contact;
        });

      Dataservice.getStates()
        .then(function(states) {
          vm.states = states;
        });
    };

    /**
     * form submit handler
     */
    vm.onSubmit = function() {
      $state.go('contacts.list');
    };

    /**
     * Cancel edit
     */
    vm.cancel = function() {
      $state.go('contacts.list');
    }

  }

})();
```
