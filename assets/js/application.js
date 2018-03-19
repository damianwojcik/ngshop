'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'angular-storage', 'angular-jwt', 'controllersNavigation', 'controllersAdmin', 'controllersSite', 'myServices' ])

    .filter('pagination', function() {
        return function(input, currentPage, pageSize) {
            if(angular.isArray(input)) {
                var start = (currentPage-1)*pageSize;
                var end = currentPage*pageSize;
                return input.slice(start, end);
            }
        };
    });

app.config( [ '$routeProvider' , '$httpProvider' , '$locationProvider', function( $routeProvider , $httpProvider, $locationProvider ) {

	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	  });

	// ============ ADMIN PRODUCTS ============
	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'partials/admin/products.html'
	})

	.when( '/admin/product/edit/:url' , {
		controller: 'productEdit',
		templateUrl : 'partials/admin/product-edit.html'
	})

	.when( '/admin/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/admin/product-create.html'
	})

    // ============ ADMIN CATEGORIES ============
    .when( '/admin/categories' , {
        controller : 'categories',
        templateUrl : 'partials/admin/categories.html'
    })

    .when( '/admin/category/edit/:id' , {
        controller: 'categoryEdit',
        templateUrl : 'partials/admin/category-edit.html'
    })

    .when( '/admin/category/create' , {
        controller: 'categoryCreate',
        templateUrl : 'partials/admin/category-create.html'
    })

	// ============ ADMIN USERS ============
	.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'partials/admin/users.html'
	})

	.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/admin/user-edit.html'
	})

	.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/admin/user-create.html'
	})

	// ============ ADMIN ORDERS ============
	.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'partials/admin/orders.html'
	})

    // ============ ADMIN CATEGORY ============
    .when( '/admin/:slug' , {
        controller: 'adminCategory',
        templateUrl : 'partials/admin/category.html'
    })

	// ============ SITE PRODUCTS ============
	.when( '/products' , {
		controller : 'siteProducts',
		templateUrl : 'partials/site/products.html'
	})

	.when( '/product/:url' , {
		controller: 'siteProduct',
		templateUrl : 'partials/site/product.html'
	})

	.when( '/cart' , {
		controller: 'cartCtrl',
		templateUrl : 'partials/site/cart.html'
	})

	// ============ SITE ORDERS ============
	.when( '/orders' , {
		controller: 'siteOrders',
		templateUrl : 'partials/site/orders.html'
	})

	// ============ LOGIN & REGISTER ============
	.when( '/login' , {
		controller: 'login',
		templateUrl : 'partials/site/login.html'
	})

	.when( '/register' , {
		controller: 'register',
		templateUrl : 'partials/site/register.html'
	})

    // ============ ADMIN HOME ============
    .when( '/admin' , {
        controller: 'adminHome',
        templateUrl : 'partials/admin/home.html'
    })

    // ============ SITE HOME ============
    .when( '/' , {
        controller: 'siteHome',
        templateUrl : 'partials/site/home.html'
    })

    // ============ 404 ============
	.when( '/404' , {
		controller: '404',
		templateUrl : 'partials/site/404.html'
	})

    // ============ SITE CATEGORY ============
	.when( '/:slug' , {
		controller: 'siteCategory',
		templateUrl : 'partials/site/category.html'
	})

	.otherwise({
		redirectTo: '/404'
	});

}]);


