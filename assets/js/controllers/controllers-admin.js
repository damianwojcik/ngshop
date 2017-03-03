'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [] );

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/products.json' ).
    success( function( data ){
        $scope.products = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(product, $index) {

        //TODO: save data by API
        $scope.products.splice($index, 1);

    }

}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

    $http.post( 'model/products.json' ).
    success( function( data ){
        var products = data;
        $scope.product = products[$routeParams.id];
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.saveChanges = function(product) {

        //TODO: save data by API

    }

}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.createProduct = function() {

        //TODO: send data by API

        console.log($scope.product);

    }

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/users.json' ).
    success( function( data ){
        $scope.users = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(user, $index) {

        //TODO: save data by API
        $scope.users.splice($index, 1);

    }

}]);

controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

    $http.post( 'model/users.json' ).
    success( function( data ){
        var users = data;
        $scope.user = users[$routeParams.id];
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.saveChanges = function(users) {

        //TODO: save data by API

    }

}]);

controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.createUser = function() {

        //TODO: send data by API

        console.log($scope.user);

    }

}]);

controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/orders.json' ).
    success( function( data ){
        $scope.orders = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(order, $index) {

        //TODO: save data by API
        $scope.orders.splice($index, 1);

    }

    $scope.changeStatus = function(order) {

        //TODO: send data by API
        if(order.status == 0) {
            order.status = 1;
        } else {
            order.status = 0;
        }

    }

}]);