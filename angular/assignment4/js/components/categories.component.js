(function(){
    'use strict';

    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'html/categories.template.html',
        bindings: {
            categories: '<'
        }
    });

}());