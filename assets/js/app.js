'use strict';

var app = angular.module('ngShop', []);

app.controller('products', ['$scope', function($scope){

    $scope.products = [
        {name: 'iPhone 5s', price: 800, description: 'Powerfull phone by Apple'},
        {name: 'Samsung Galaxy s6', price: 580, description: 'Android system inside'}
    ];

}]);
