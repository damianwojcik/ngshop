'use strict';

var controllersSite = angular.module( 'controllersSite' , [ 'myDirectives', 'angular-owl-carousel-2', 'ui.bootstrap' ] );

controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartService', 'productsService', function( $scope , $http, cartService, productsService ){
    
    // get products
    $http.get( 'api/site/products/get' ).
    then( function( data ){

        $scope.products = data.data;

        // pagination
        $scope.currentPage = 1;
        $scope.numPerPage = 8;
        $scope.maxSize = 5;

        angular.forEach($scope.products, function( item ) {

            productsService.getCategoryName( item.category ).then(function( data ) {

                item.categoryName = data.data.replace(/['"]+/g, '');

            });

        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));


    // get cart
    $scope.$watch(function () {

        $scope.cart = cartService.show();
        //todo usuwanie z mini-carta czysci w produktach

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

    // url consists of slug-id
    var url = $routeParams.url;
    // id is string after last '-'
    var id = url.split('-').pop().trim();

    $http.post( 'api/site/products/get/' + id ).

    then( function( data ){

        $scope.product = data.data;
        $scope.checkCart(data.data);

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

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
        then( function( data ){

            $scope.images = data.data;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    }

    getImages();

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/', {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).then( function( data ){

        $scope.orders = data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

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

        }).then( function( data ){

            cartService.empty();
            $scope.alert = {type: 'success', msg: 'Order in process. Dont refresh the page.'};
            $('#paypalForm').submit();

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.$watch(function () {
       cartService.update($scope.cart);
    });

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/site/orders/get/' , {

        token: checkToken.raw(),
        payload: checkToken.payload()

    }).then( function( data ){

        $scope.orders = data.data;

        angular.forEach( $scope.orders , function( order , key ){
            var parsed = JSON.parse( order.items );
            $scope.orders[key].items = parsed;
        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

}]);

controllersSite.controller( 'siteCategory' , [ '$scope' , '$http' , '$routeParams' , 'cartService', 'productsService', 'categoriesService', function( $scope , $http , $routeParams, cartService, productsService, categoriesService ){

    var slug = $routeParams.slug;

    // get products
    productsService.getByCategorySlug(slug).then(function(data) {

        $scope.products = data.data;

        // pagination
        $scope.currentPage = 1;
        $scope.numPerPage = 8;
        $scope.maxSize = 5;

    });

    // get categories
    categoriesService.getByCategorySlug(slug).then(function(data) {

        $scope.category = data.data;

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

controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location', function( $scope , $http, store, checkToken, $location ){

    if(checkToken.loggedIn()) {

        $location.path('/products');

    }

    $scope.user = {};

    $scope.formSubmit = function (user) {
        $http.post( 'api/site/user/login/', {

            email : user.email,
            password : user.password

        }).then( function( data ){

            $scope.submit = true;
            $scope.error = data.error;

            if (!data.error) {

                store.set('token', data.data.token);
                $location.path('/products');

            }

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
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

        }).then( function( errors ){

            $scope.submit = true;
            $scope.user = {};

            if (errors.data) {

                $scope.errors = errors.data;

            } else {

                $scope.errors = {};
                $scope.success = true;

            }

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));
    };

}]);

controllersSite.controller( 'siteHome' , [ '$scope', '$http', 'sliderFactory', 'productsService', function( $scope, $http, sliderFactory, productsService ){

    var owlAPi;

    $scope.owlProperties = {

        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        lazyLoad: true,
        loop: true,
        items: 1,
        autoplay: false,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: [
            "<span class='glyphicon glyphicon-chevron-left'></span>",
            "<span class='glyphicon glyphicon-chevron-right'></span>"
        ]

    };

    $scope.ready = function ($api) {

        owlAPi = $api;

    };

    // get slides
    $scope.$watch(function () {

        $scope.items = sliderFactory.show();

    });

    // get products
    $http.get( 'api/site/products/get' ).
        then( function( data ){

            $scope.products = data.data;

            angular.forEach($scope.products, function( item ) {

                productsService.getCategoryName( item.category ).then(function( data ) {

                    item.categoryName = data.data.replace(/['"]+/g, '');

                });

            });

        }, ( function(){

            console.log( 'Error on communicate with API.' );

    }));

    // get promos
    productsService.getPromos().then(function(data) {

        $scope.promoProducts = data.data;

        angular.forEach($scope.promoProducts, function( item ) {

            productsService.getCategoryName( item.category ).then(function( data ) {

                item.categoryName = data.data.replace(/['"]+/g, '');

            });

        });

    });


}]);

controllersSite.controller( '404' , [ '$scope', '$http', function( $scope, $http ){



}]);