'use strict';

var myCtrls = angular.module( 'myCtrls' , [ 'ngRoute' ] );

myCtrls.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'model/products.json' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Error on loading json file.' );
	});

}]);

myCtrls.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

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

myCtrls.controller( 'productCreate' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.createProduct = function(product) {

        //TODO: send data by API

        console.log($scope.product);

    }

}]);