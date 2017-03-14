'use strict';

var controllersNavigation = angular.module( 'controllersNavigation', [] );

controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartService', 'checkToken',  function( $scope , $location, cartService, checkToken ){

	$scope.navigation = function () {

		if(/^\/admin/.test($location.path())) {

			if (!checkToken.isAdmin()) {

				window.location.href = '#/products?alert=notAdmin';
			}

			return 'partials/admin/navigation.html';

		} else {

			if ($location.search().alert == 'notAdmin') {

				$scope.notAdmin = true;

			} else {

				$scope.notAdmin = false;

			}

			if (checkToken.loggedIn()) {

				$scope.loggedIn = true;

			} else {

				$scope.loggedIn = false;

			}

			if (checkToken.isAdmin()) {

				$scope.isAdmin = true;

			} else {

				$scope.isAdmin = false;

			}

			return 'partials/site/navigation.html';

		}
	};

	$scope.isActive = function(path) {

		return $location.path() === path;

	};

	$scope.$watch(function () {

		$scope.cart = cartService.show().length;

	});

	$scope.logout = function () {

		checkToken.del();
		$location.path('/products');

	};

}]);

