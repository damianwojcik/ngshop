'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'myCtrls' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	// ============ PRODUCTS ============
	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'partials/admin/products.html'
	});

	$routeProvider.when( '/admin/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'partials/admin/product-edit.html'
	});

	$routeProvider.when( '/admin/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/admin/product-create.html'
	});

	// ============ USERS ============
	$routeProvider.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'partials/admin/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/admin/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/admin/user-create.html'
	});

	// ============ ORDERS ============
	$routeProvider.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'partials/admin/orders.html'
	});

	// ============ DEFAULT ============
	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);


