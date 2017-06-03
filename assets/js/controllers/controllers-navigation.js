'use strict';

var controllersNavigation = angular.module( 'controllersNavigation', [ 'myDirectives' ] );

controllersNavigation.controller( 'navigation' , [ '$scope' , '$http' , '$location' , 'checkToken', 'store', 'cartService', 'categoriesService',  function( $scope , $http, $location, checkToken, store, cartService, categoriesService ){

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

        $scope.cart = cartService.show();

	});

	$scope.logout = function () {

		checkToken.del();
		$location.path('/products');

	};

    $scope.removeItem = function ($index) {

        $scope.cart.splice($index, 1);
        cartService.update($scope.cart);

    };

	// get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

    });

    // navigation magic line jquery
    $scope.$on('ngRepeatFinished', function() {

        var $mainNav = $(".nav-bottom .nav");

        if($(".nav-bottom .nav li.active").length) {

            $mainNav.append("<li id='magic-line'></li>");
            $scope.magicLine = $("#magic-line");

            $scope.magicLine
                .width($(".nav-bottom .nav li.active").width())
                .css("left", $(".nav-bottom .nav li.active").position().left)
                .data("origLeft", $scope.magicLine.position().left)
                .data("origWidth", $scope.magicLine.width());

            $(".nav-bottom .nav li").hover(function() {
                $scope.el = $(this);
                $scope.leftPos = $scope.el.position().left;
                $scope.newWidth = $scope.el.width();
                $scope.magicLine.stop().animate({
                    left: $scope.leftPos,
                    width: $scope.newWidth
                });
            }, function() {
                $scope.magicLine.stop().animate({
                    left: $scope.magicLine.data("origLeft"),
                    width: $scope.magicLine.data("origWidth")
                });

            });

            $(".nav-bottom .nav li").click(function() {
                $scope.el = $(this);
                $scope.leftPos = $scope.el.position().left;
                $scope.newWidth = $scope.el.width();
                $scope.magicLine
                    .data("origLeft", $scope.el.position().left)
                    .data("origWidth", $scope.el.width());
                $scope.magicLine.stop().animate({
                    left: $scope.leftPos,
                    width: $scope.newWidth
                });
            });

        }

	});

}]);