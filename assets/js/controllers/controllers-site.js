'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );

controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartService', function( $scope , $http, cartService ){

    $http.get( 'api/site/products/get' ).
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

    $http.post( 'api/site/products/get/' + id ).
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
        $http.get( 'api/site/products/getImages/' + id ).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });
    }

    getImages();

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/', {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).success( function( data ){

        $scope.orders = data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }).error( function(){
        console.log( 'Error on communicate with API.' );
    });

}]);

controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter', 'cartService', 'checkToken', function( $scope , $http, $filter, cartService, checkToken ){

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

        $event.preventDefault();

        if (!checkToken.loggedIn()) {
            $scope.alert = {type: 'warning', msg: 'You have to be logged in.'};
            return false;
        }

        $http.post( 'api/site/orders/create/', {

            token: checkToken.raw(),
            payload: checkToken.payload(),
            items: $scope.cart,
            total: $scope.total()

        }).success( function( data ){

            cartService.empty();
            $scope.alert = {type: 'success', msg: 'Order in process. Dont refresh the page.'};
            $('#paypalForm').submit();

        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

    };

    $scope.$watch(function () {
       cartService.update($scope.cart);
    });

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/' , {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).success( function( data ){

        $scope.orders = data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }).error( function(){
        console.log( 'Error on communicate with API.' );
    });

}]);

controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location', function( $scope , $http, store, checkToken, $location ){

    if(checkToken.loggedIn()) {

        $location.path('/products');

    }

    $scope.user = {};

    $scope.formSubmit = function (user) {
        $http.post( 'api/site/user/login/', {
            email : user.email,
            password : user.password
        }).success( function( data ){

            $scope.submit = true;
            $scope.error = data.error;

            if (!data.error) {

                store.set('token', data.token);
                $location.path('/products');

            }

        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });
    };

}]);

controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.user = {};

    $scope.formSubmit = function (user) {

        $http.post( 'api/site/user/create/', {
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