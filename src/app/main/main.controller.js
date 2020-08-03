(function() {
  'use strict';

  angular
    .module('pokedex')
    .factory('PokedexService', Service)
    .controller('PokedexController', PokedexController);

  Service.$inject = ['$log', '$http'];
  PokedexController.$inject = ['$log', 'PokedexService', '$scope'];
  function PokedexController($log, PokedexService, $scope) {
    var vm = this;
    vm.scope = $scope;
    vm.scope.status = false;
    vm.scope.types = [];
    vm.scope.customFullscreen = false;
      vm.init = init;
      vm.showAdvanced = showAdvanced;
      vm.closePokedex = closePokedex;

      vm.pokedex = [];
      vm.imagePath = 'img/washedout.png';
      function init() {
          PokedexService.findAll(0, 151).then(function(response) {
              $log.debug(response);
              vm.pokedex = response.data.results;
          });
      }

      function showAdvanced(ev) {
        vm.scope.status = true;
        PokedexService.findAll(0, 0, ev).then(function(response) {
          $log.debug(response);
          vm.scope.namePokemon = response.data.name;
          vm.scope.weightPokemon = response.data.weight;
          vm.scope.heightPokemon = response.data.height;
          vm.scope.types = response.data.types;
          vm.scope.abilities = response.data.abilities;
      });
      }
      function closePokedex() {
        vm.scope.status = false;
      }
  }

  function Service($log, $http) {
    return {
      findAll: findAll
    };
    
    function findAll(offset, limit, ev) {
      var baseUrl = "";
      if (limit == 0) {
        baseUrl = "https://pokeapi.co/api/v2/pokemon/"+ev;
        return $http.get(baseUrl);
      } else {
        baseUrl = "https://pokeapi.co/api/v2/pokemon/";
        var data = {
          params: {
            offset: offset,
            limit: limit
          }
        };
        return $http.get(baseUrl, data);
      }
    }
  }
  
})();
