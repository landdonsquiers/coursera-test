(function (){
    'use strict';

    angular.module('LunchChecker', [])
    .controller('LunchCheckerController', 
    LunchCheckerController);

    LunchCheckerController.$inject = ['$scope'];

    function LunchCheckerController($scope){
        $scope.textBox = '';

        function numberCheck(numberOfWords){
            if(numberOfWords > 3){
                $scope.messageBox = "Too much!";
            }else{
                $scope.messageBox = "Enjoy!";
            }
        }

        $scope.onClick = function (){
            var words = $scope.textBox.split(',').length;
            numberCheck(words);
        }
    }

})();