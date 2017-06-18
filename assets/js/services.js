'use strict';

var myServices = angular.module( 'myServices' , [] );

myServices.factory('cartService', ['store', function (store) {

    if (store.get('cart')) {
        var cart = store.get('cart');
    } else {
        var cart = [];
    }

    cart.show = function () {
        return cart;
    };

    cart.add = function (product) {

        var addNew = true;

        angular.forEach(cart, function(value, key) {
           if (value.name == product.name) {
               addNew = false;
               cart[key].amount++;
           }
        });

        if (addNew) {
            product.amount = 1;
            cart.push(product);
        }

        store.set('cart', cart);

    };

    cart.empty = function () {
        store.remove('cart');
        cart.length = 0;
    };

    cart.update = function (newCart) {
        store.set('cart', newCart)
    };

    return cart;

}]);

myServices.service('checkToken', ['store', 'jwtHelper', function(store, jwtHelper){

    if (store.get('token')) {

        var token = jwtHelper.decodeToken( store.get( 'token' ) );

    } else {

        var token = false;

    }

    this.payload = function () {

        if ( store.get( 'token' ) ){

            return jwtHelper.decodeToken( store.get( 'token' ) );

        } else {

            return false;

        }

    };

    this.loggedIn = function () {

        if(store.get('token')) {

            return true;

        } else {

            return false;

        }

    };

    this.isAdmin = function () {

        if ( store.get( 'token' ) ) {

            var token = jwtHelper.decodeToken( store.get( 'token' ) );

            if ( token.role == 'admin' ) {

                return true;

            } else {

                return false;

            }

        } else {

            return false;

        }

    };

    this.raw = function () {

        return store.get( 'token' );

    };

    this.del = function () {

        store.remove('token');

    };

}]);

myServices.service('productsService', [ '$http' , function ( $http ) {

    this.getByCategoryId = function ( id ) {

        return $http.get('api/site/products/getByCategoryId/' + id)

            .then(function ( data ){

                return data;

            }, (function (){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getCategoryName = function ( id ) {

        return $http.get('api/site/products/getCategoryName/' + id)

            .then(function ( data ){

                return data;

            }, (function (){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getByCategorySlug = function ( slug ) {

        return $http.get('api/site/products/getByCategorySlug/' + slug)

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

}]);

myServices.service('categoriesService', [ '$http' , function ( $http ) {

    this.getData = function() {

        return $http.get('api/site/categories/get')

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

    this.getByCategorySlug = function ( slug ) {

        return $http.get('api/site/categories/getByCategorySlug/' + slug)

            .then(function(data){

                return data;

            }, (function(){

                console.log( 'Error on communicate with API.' );

            }));

    };

}]);

myServices.factory('sliderFactory', ['$http', 'checkToken', function ( $http, checkToken ) {

    var slider = {};

   $http.get('api/site/promotions/get')

        .then(function(data){

            slider = data.data;

        }, (function(){

            console.log( 'Error on communicate with API.' );

        }));

    slider.show = function () {

        return slider;

    };

    slider.delete = function(promotion) {

        $http.post( 'api/admin/promotions/delete/', {

            token: checkToken.raw(),
            promotion: promotion

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    return slider;

}]);