'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );

controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartService', function( $scope , $http, cartService ){

    $http.get( 'api/index.php/site/products/get' ).
    success( function( data ){
        $scope.products = data;
    }).error( function(){
        console.log( 'Error on communicate with API.' );
    });

    $scope.addToCart = function (product) {
        cartService.add(product);
    };

    $scope.checkCart = function (product) {
        if (cartService.show().length) {
            angular.forEach(cartService.show(), function(item) {
                if (item.id == product.id) {
                    product.amount = item.amount;
                }
            });
        }
    };

}]);

controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartService', function( $scope , $http , $routeParams, cartService ){

    var id = $routeParams.id;

    $http.post( 'api/index.php/site/products/get/' + id ).
    success( function( data ){
        $scope.product = data;
        $scope.checkCart(data);
    }).error( function(){
        console.log( 'Error on communicate with API.' );
    });

    $scope.addToCart = function (product) {
        cartService.add(product);
    };

    $scope.checkCart = function (product) {
        if (cartService.show().length) {
            angular.forEach(cartService.show(), function(item) {
                if (item.id == product.id) {
                    product.amount = item.amount;
                }
            });
        }
    };

    function getImages () {
        $http.get( 'api/index.php/site/products/getImages/' + id ).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });
    }

    getImages();

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/orders.json' ).
    success( function( data ){
        $scope.orders = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

}]);

controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter', 'cartService', function( $scope , $http, $filter, cartService ){

    $scope.cart = cartService.show();

    $scope.emptyCart = function () {
        cartService.empty();
    };

    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.cart, function(item) {
            total += item.amount * item.price;
        });
        total = $filter('number')(total, 2);
        return total;
    };

    $scope.removeItem = function ($index) {
        $scope.cart.splice($index, 1);
        cartService.update($scope.cart);
    };

    $scope.setOrder = function ($event) {

        //TODO: chceck if user is logged in
        var loggedIn = true;

        if (!loggedIn) {
            $scope.alert = {type: 'warning', msg: 'You have to be logged in.'};
            $event.preventDefault();
            return false;
        }

        //TODO: save order to db
        console.log($scope.total());
        console.log($scope.cart);

        $scope.alert = {type: 'success', msg: 'Order in process. Dont refresh the page.'};
        cartService.empty();

        $event.preventDefault();
        $('#paypalForm').submit();
    };

    $scope.$watch(function () {
       cartService.update($scope.cart);
    });

}]);

controllersSite.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/orders.json' ).
    success( function( data ){
        $scope.orders = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

}]);

controllersSite.controller( 'login' , [ '$scope' , '$http' , function( $scope , $http ){

    //TODO: get data from form and send to db(authorization)

    $scope.input = {};

    $scope.formSubmit = function () {
        $scope.errors = {};
        $scope.errors.login = 'Given password and email address does not match.';
        console.log($scope.input);
    };

}]);

controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.user = {};

    $scope.formSubmit = function (user) {

        $http.post( 'api/index.php/site/user/create/', {
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf
        }).success( function( errors ){

            $scope.submit = true;
            $scope.user = {};

            if (errors) {
                $scope.errors = errors;
            } else {
                $scope.errors = {};
                $scope.success = true;
            }

        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });
    };

}]);