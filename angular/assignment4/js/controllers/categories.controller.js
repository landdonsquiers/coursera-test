(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesCtrl',CategoriesCtrl);

    CategoriesCtrl.$inject = ['categories'];
    function CategoriesCtrl(categories) {
        let ctrl = this;
        ctrl.categories = categories;
    }
}());