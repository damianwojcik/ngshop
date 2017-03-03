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