(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider']
    function RoutesConfig($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                templateUrl: 'html/home.template.html'
            })
            .state('categories',{
                url: '/categories',
                templateUrl: 'html/categories.template.html',
                controller: 'CategoriesCtrl as $ctrl',
                resolve: {
                    categories: ['MenuDataService', (MenuDataService) => {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items',{
                url: '/{category}/items',
                templateUrl: 'html/items.template.html',
                controller: 'itemsCtrl as $ctrl',
                resolve: {
                    items: ['MenuDataService','$stateParams', (MenuDataService,$stateParams) => {
                        return MenuDataService.getItemsForCategory($stateParams.category);
                    }]
                }
            });
    }
}());