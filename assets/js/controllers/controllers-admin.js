'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , ['angularFileUpload', 'myDirectives'] );

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){

    $http.get( 'api/index.php/admin/products/get' ).
    success( function( data ){
        $scope.products = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(product, $index) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        $scope.products.splice($index, 1);

        $http.post( 'api/index.php/admin/products/delete/', {
            product: product
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

    }

}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams', 'FileUploader', '$timeout', function( $scope , $http , $routeParams, FileUploader, $timeout ){

    var productId = $routeParams.id;
    $scope.id = productId;

    $http.get( 'api/index.php/admin/products/get/' + productId ).
    success( function( data ){
        $scope.product = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    function getImages () {
        $http.get( 'api/index.php/admin/images/get/' + productId ).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Error on loading json file.' );
        });
    }

    getImages();

    $scope.saveChanges = function(product) {

        $http.post( 'api/index.php/admin/products/update/', {
            product: product
        }).success( function(){
            $scope.success = true;

            $timeout(function(){
                $scope.success = false;
            }, 3000);
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

    };

    var uploader = $scope.uploader = new FileUploader({
       url: 'api/index.php/admin/images/upload/' + productId
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };

    $scope.delImage = function (imageName, $index) {

        $scope.images.splice($index, 1);

        $http.post( 'api/index.php/admin/images/delete/', {

            id : productId,
            image: imageName

        }).error( function(){
            console.log( 'Error on loading json file.' );
        });

    };

}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout', function( $scope , $http, $timeout ){

    $scope.createProduct = function(product) {

        $http.post( 'api/index.php/admin/products/create/', {
            product: product
        }).success( function( ){
            $scope.success = true;
            $scope.product = {};
            $timeout(function(){
                $scope.success = false;
            }, 3000);
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

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