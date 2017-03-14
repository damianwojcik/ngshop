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