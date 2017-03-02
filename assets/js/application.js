'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'myCtrls' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	$routeProvider.when( '/products' , {
		controller : 'products',
		templateUrl : 'partials/products.html'
	});

	$routeProvider.when( '/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'partials/product-edit.html'
	});

	$routeProvider.when( '/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/product-create.html'
	});

	$routeProvider.when( '/users' , {
		controller: 'users',
		templateUrl : 'partials/users.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);


