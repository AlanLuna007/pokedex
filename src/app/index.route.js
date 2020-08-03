(function() {
  'use strict';

  angular
    .module('pokedex')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'PokedexController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
