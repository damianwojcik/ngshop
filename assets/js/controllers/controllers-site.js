'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );

controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartService', function( $scope , $http, cartService ){

    $http.get( 'model/products.json' ).
    success( function( data ){
        $scope.products = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.addToCart = function (product) {
        cartService.add(product);
    };

}]);

controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartService', function( $scope , $http , $routeParams, cartService ){

    $http.post( 'model/products.json' ).
    success( function( data ){
        var products = data;
        $scope.product = products[$routeParams.id];
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.addToCart = function (product) {
        cartService.add(product);
    };

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/orders.json' ).
    success( function( data ){
        $scope.orders = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

}]);

controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , 'cartService', function( $scope , $http, cartService ){

    $scope.cart = cartService.show();

    $scope.emptyCart = function () {
        cartService.empty();
    };

}]);