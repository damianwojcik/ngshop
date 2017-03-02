'use strict';

var myCtrls = angular.module( 'myCtrls' , [ 'ngRoute' ] );

myCtrls.controller( 'navigation' , [ '$scope' , '$location' , function( $scope , $location ){

	$scope.isActive = function(path) {
		return $location.path() === path;
	};

}]);

myCtrls.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
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


myCtrls.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

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