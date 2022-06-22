(function(){
    'use strict';

    angular.module('MenuApp')
    .component('items',{
        templateUrl: 'html/items.template.html',
        bindings: {
            items: '<'
        }
    });
}());