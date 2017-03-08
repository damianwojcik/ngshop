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

    function getImages () {
        $http.get( 'api/index.php/admin/images/get/' + productId ).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Error on loading json file.' );
        });
    }

    getImages();

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

    $http.get( 'api/index.php/admin/users/get' ).
    success( function( data ){
        $scope.users = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.delete = function(user, $index) {

        if (!confirm('Are you really want to delete this user?')) {
            return false;
        }

        $scope.users.splice($index, 1);

        $http.post( 'api/index.php/admin/users/delete/', {
            user: user
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

    }

}]);

controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout', function( $scope , $http , $routeParams, $timeout ){

    var userId = $routeParams.id;
    $scope.id = userId;

    $http.get( 'api/index.php/admin/users/get/' + userId ).
    success( function( data ){
        $scope.user = data;
    }).error( function(){
        console.log( 'Error on loading json file.' );
    });

    $scope.saveChanges = function(user) {

        $http.post( 'api/index.php/admin/users/update/', {
            id: userId,
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf
        }).success( function(errors){

            $scope.submit = true;

            if (errors) {
                $scope.errors = errors;
            } else {
                $scope.success = true;
                $timeout(function(){
                    $scope.success = false;
                }, 3000);
            }

            $scope.submit = true;
        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

    };

}]);

controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , '$timeout', function( $scope , $http, $timeout ){

    $scope.user = {};
    $scope.user.role = 'user';

    $scope.createUser = function(user) {

        $http.post( 'api/index.php/admin/users/create/', {
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf
        }).success( function( errors ){

            $scope.submit = true;

            if (errors) {
                $scope.errors = errors;
            } else {
                $scope.user = {};
                $scope.success = true;
                $timeout(function(){
                    $scope.success = false;
                }, 3000);
            }

            $scope.submit = true;

        }).error( function(){
            console.log( 'Error on communicate with API.' );
        });

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