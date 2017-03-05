'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , ['angularFileUpload', 'myDirectives'] );

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/products.json' ).
    success( function( data ){
        $scope.products = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(product, $index) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        //TODO: save data by API
        $scope.products.splice($index, 1);

    }

}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams', 'FileUploader', function( $scope , $http , $routeParams, FileUploader ){

    $http.post( 'model/products.json' ).
    success( function( data ){
        var products = data;
        $scope.product = products[$routeParams.id];
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.saveChanges = function(product) {

        //TODO: save data by API

    }

    var uploader = $scope.uploader = new FileUploader({
       url: 'api/index.php/admin/images/upload/' + $routeParams.id
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };

}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.createProduct = function() {

        //TODO: send data by API

        console.log($scope.product);

    }

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/users.json' ).
    success( function( data ){
        $scope.users = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(user, $index) {

        if (!confirm('Are you really want to delete this user?')) {
            return false;
        }

        //TODO: save data by API
        $scope.users.splice($index, 1);

    }

}]);

controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , function( $scope , $http , $routeParams ){

    $http.post( 'model/users.json' ).
    success( function( data ){
        var users = data;
        $scope.user = users[$routeParams.id];
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.saveChanges = function(users) {

        //TODO: save data by API

    }

}]);

controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , function( $scope , $http ){

    $scope.createUser = function() {

        //TODO: send data by API

        console.log($scope.user);

    }

}]);

controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'model/orders.json' ).
    success( function( data ){
        $scope.orders = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(order, $index) {

        if (!confirm('Are you really want to delete this order?')) {
            return false;
        }

        //TODO: save data by API
        $scope.orders.splice($index, 1);

    }

    $scope.changeStatus = function(order) {

        //TODO: send data by API
        if(order.status == 0) {
            order.status = 1;
        } else {
            order.status = 0;
        }

    }

}]);