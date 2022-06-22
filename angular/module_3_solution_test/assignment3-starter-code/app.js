(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController',NarrowItDownController)
        .service('MenuSearchService',MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems',foundItems);

    function foundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: '$narrow',
            bindToController: true
        };

        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        var $narrow = this;
        $narrow.isShowTable = false;
        $narrow.searchTerm = '';
        $narrow.found = [];      
        $narrow.error = false;
        $narrow.getMatchedMenuItems = function(searchTerm) {
            if (searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function (items) {
                    if (items.length > 0){
                        $narrow.found = items;
                        $narrow.isShowTable = true;
                        $narrow.error = false;
                    }else{
                        $narrow.isShowTable = false;
                        $narrow.error = true;
                    }
                });
            }else{
                $narrow.isShowTable = false;
                $narrow.error = true;
            }
        }
        $narrow.removeItem = function(index) {
            $narrow.found.splice(index,1);
        }
    }

    MenuSearchService.$inject = ['$http','ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then(function(response) {
                var foundItems = [];

                for (var i = 0; i < response.data['menu_items'].length; i++) {
                    if (searchTerm.length > 0 && response.data['menu_items'][i]['description']
                    .toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(response.data['menu_items'][i]);
                    }
                }

                return foundItems;
            });
        };
    }
}());