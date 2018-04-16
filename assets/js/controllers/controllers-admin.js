'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload', 'froala', 'myDirectives', 'ui.select', 'angular-owl-carousel-2', 'ui.bootstrap' ]).
value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Enter Text Here',
    quickInsertTags: [''],
    heightMin: 200,
    htmlAllowedTags: ['.*'],
    htmlRemoveTags: [''],
});

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , 'checkToken', 'productsService', function( $scope , $http, checkToken, productsService ){

    // get products
    $http.post( 'api/admin/products/get', {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.products = data.data;

        // pagination
        $scope.currentPage = 1;
        $scope.numPerPage = 8;
        $scope.maxSize = 5;
        $scope.filteredlist = [];

        angular.forEach($scope.products, function( item ) {

            productsService.getCategoryName( item.category ).then(function( data ) {

                item.categoryName = data.data.replace(/['"]+/g, '');

            });

        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.delete = function(product) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        var index = $scope.products.findIndex(x => x.id==product.id);

        $scope.products.splice(index, 1);


        $http.post( 'api/admin/products/delete/', {

            token: checkToken.raw(),
            product: product

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams', 'FileUploader', '$timeout', 'checkToken', 'categoriesService', function( $scope , $http , $routeParams, FileUploader, $timeout, checkToken, categoriesService ){

    $scope.froalaOptions = {
		toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'color', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertTable' , 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo']
    }

    // url consists of slug-id
    var url = $routeParams.url;
    // id is string after last '-'
    var productId = url.split('-').pop().trim();
    $scope.id = productId;

    // get product
    $http.post( 'api/admin/products/get/' + productId, {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.product = data.data;
        $scope.oldPromoPrice = $scope.product.promoprice;

        // get categories
        categoriesService.getData().then(function(data) {

            $scope.categories = data.data;

            angular.forEach($scope.categories, function(item) {

                if(item.id == $scope.product.category) {

                    $scope.product.category = item;

                }

            });


        });

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // get images
    function getImages() {

        $http.post( 'api/admin/images/get/' + productId , {

            token: checkToken.raw()

        }).then( function( data ){

            $scope.images = data.data;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    }

    getImages();

    // init uploader
    var uploader = $scope.uploader = new FileUploader({

        token: checkToken.raw(),
        url: 'api/admin/images/upload/' + productId

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
        $scope.product.thumbnail = "uploads/" + productId + "/" + fileItem._file.name;

    };

    // delete image
    $scope.delImage = function (image, $index) {

        $scope.images.splice($index, 1);

        $http.post( 'api/admin/images/delete/' , {

            token: checkToken.raw(),
            id : productId,
            image : image

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    // set thumbnail
    $scope.setThumbnail = function (product, image) {

        if($scope.product.thumbnail == image) {

            $scope.product.thumbnail = '';

        } else {

            $scope.product.thumbnail = image;

        }

    };

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // save changes
    $scope.saveChanges = function(product) {

        if(product) {

            product.category = product.category.id;

            // if promoprice changed set new promodate
            if(product.promoprice != $scope.oldPromoPrice) {
                $scope.product.promodate = new Date().toISOString().substring(0, 10);
            }

            if (!product.promoprice) {
                $scope.product.promodate = '';
            }
        }

        // post product
        $http.post( 'api/admin/products/update/', {

            token: checkToken.raw(),
            product: product

        }).then( function(){

            $scope.success = true;

            angular.forEach($scope.categories, function(item) {

                if(item.id == $scope.product.category) {

                    $scope.product.category = item;

                }

            });

            $timeout(function(){

                $scope.success = false;

                $scope.alerts = [
                    { type: 'success', msg: 'Changes saved!' }
                ];

            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

        // post thumbnail
        $http.post( 'api/admin/images/setThumbnail/', {

            token: checkToken.raw(),
            product: product,
            image: product.thumbnail

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };


}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$route', '$timeout', 'checkToken', 'categoriesService', 'FileUploader', function( $scope , $http, $route, $timeout, checkToken, categoriesService, FileUploader ){

    $scope.froalaOptions = {
		toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'color', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertTable' , 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo']
    }
    
    $scope.product = {};

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // get products
    $http.post( 'api/admin/products/get', {

        token: checkToken.raw()

    }).then( function( data ){

        $scope.products = data.data;

        if($scope.products.length > 0) {
            $scope.product['id'] = Number($scope.products[$scope.products.length-1].id)+1;
        } else {
            $scope.product['id'] = 1;
        }

        // init uploader
        var uploader = $scope.uploader = new FileUploader({

            token: checkToken.raw(),
            url: 'api/admin/images/upload/' + $scope.product['id']

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
            $scope.product.thumbnail = "uploads/" + $scope.product['id'] + "/" + fileItem._file.name;

        };

        getImages();

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // get images
    function getImages() {

        $http.post( 'api/admin/images/get/' + $scope.product['id'] , {

            token: checkToken.raw()

        }).then( function( data ){

            $scope.images = data.data;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    }

    // delete image
    $scope.delImage = function (image, $index) {

        $scope.images.splice($index, 1);

        $http.post( 'api/admin/images/delete/' , {

            token: checkToken.raw(),
            id : $scope.product['id'],
            image : image

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    // set thumbnail
    $scope.setThumbnail = function (product, image) {

        if($scope.product.thumbnail == image) {

            $scope.product.thumbnail = '';

        } else {

            $scope.product.thumbnail = image;

        }

    };


    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;
        $scope.product.category = data.data[0];

    });

    // post product
    $scope.createProduct = function(product) {

        if(product) {
            product.category = product.category.id;

            if(product.promoprice) {
                $scope.product.promodate = new Date().toISOString().substring(0, 10);
            }
        }

        $http.post( 'api/admin/products/create/', {

            token: checkToken.raw(),
            product: product

        }).then( function( ){

            $scope.success = true;
            $timeout(function(){
                $scope.success = false;
                $scope.product = {};
                categoriesService.getData().then(function(data) {

                    $scope.categories = data.data;
                    $scope.product.category = data.data[0];

                });

                $scope.alerts = [
                    { type: 'success', msg: 'Product added!' }
                ];

                $scope.uploader = undefined;

                // get products
                $http.post( 'api/admin/products/get', {

                    token: checkToken.raw()

                }).then( function( data ){

                    $scope.products = data.data;

                    if($scope.products.length > 0) {
                        $scope.product['id'] = Number($scope.products[$scope.products.length-1].id)+1;
                    } else {
                        $scope.product['id'] = 1;
                    }

                    // init uploader
                    var uploader = $scope.uploader = new FileUploader({

                        token: checkToken.raw(),
                        url: 'api/admin/images/upload/' + $scope.product['id']

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
                        $scope.product.thumbnail = "uploads/" + $scope.product['id'] + "/" + fileItem._file.name;

                    };

                    getImages();

                }, ( function(){

                    console.log( 'Error on communicate with API.' );

                }));

            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categories' , [ '$scope' , '$http' , 'categoriesService', 'productsService', 'checkToken', function( $scope , $http, categoriesService, productsService, checkToken ){


    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

    });

    // get products from given category
    $scope.products = [];
    $scope.productsCount = [];

    $scope.getProducts = function( id ){

        productsService.getByCategoryId( id ).then(function(data) {

            $scope.products[id] = data.data;
            $scope.productsCount[id] = $scope.products[id].length;

        });

    };

    $scope.delete = function(category, $index) {

        if (!confirm('Are you really want to delete this category?')) {
            return false;
        }

        $scope.categories.splice($index, 1);

        $http.post( 'api/admin/categories/delete/', {

            token: checkToken.raw(),
            category: category

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categoryCreate' , [ '$scope' , '$http' , '$timeout', 'checkToken', 'categoriesService', 'productsService', function( $scope , $http, $timeout, checkToken, categoriesService, productsService ){

    $scope.category = {};

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // get categories
    categoriesService.getData().then(function(data) {

        $scope.categories = data.data;

        if($scope.categories.length > 1) {
            $scope.category['id'] = Number($scope.categories[$scope.categories.length-1].id)+1;
        } else {
            $scope.category['id'] = 2;
        }


    });

    // get products without category - category '1'
    productsService.getByCategoryId(1).then(function(data) {

        $scope.products = data.data;

    });

    // create category
    $scope.createCategory = function(category, products) {

        angular.forEach(products.selected, function(item) {

            item.category = category.id;

            $http.post( 'api/admin/products/update/', {

                token: checkToken.raw(),
                product: item

            }).then( function(){

                $scope.success = true;

            }, ( function(){

                console.log( 'Error on communicate with API.' );

            }));

        });

        $http.post( 'api/admin/categories/create/', {

            token: checkToken.raw(),
            category: category

        }).then( function( ){

            $scope.success = true;
            $scope.category = {};
            categoriesService.getData().then(function(data) {

                $scope.categories = data.data;
                $scope.category['id'] = $scope.categories.length + 1;

            });
            productsService.getByCategoryId(1).then(function(data) {

                $scope.products = data.data;

            });
            $timeout(function(){
                $scope.success = false;

                $scope.alerts = [
                    { type: 'success', msg: 'Category added!' }
                ];
            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'categoryEdit', [ '$scope' , '$http' , '$q', '$timeout', '$routeParams', 'checkToken' , function( $scope , $http, $q, $timeout, $routeParams, checkToken ) {

    // arrays difference
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    var categoryId = $routeParams.id;
    $scope.id = categoryId;

    // get category
    $http.post( 'api/admin/categories/get/' + categoryId, {

        token: checkToken.raw()

    }).then( function( data ){

        $scope.category = data.data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // get products from this category + uncategorized
    $scope.productsUncategorized = $http.get('api/site/products/getByCategoryId/1', {cache: false});
    $scope.productsFromCategory = $http.get('api/site/products/getByCategoryId/' + categoryId, {'cache': false});

    $q.all([$scope.productsUncategorized, $scope.productsFromCategory]).then(function(data) {
        $scope.products = data[0].data.concat(data[1].data);
    });

    $http.get( 'api/site/products/getByCategoryId/' + categoryId).then( function( data ){

        $scope.products.selected = data.data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    // save changes
    $scope.saveChanges = function(category, products) {

        var productsArr = products.filter(function( obj ) {
            return obj.id !== products.length;
        });

        var unselectedProductsArr = [];

        if(productsArr.length === products.selected.length ) {

            unselectedProductsArr = [];

        } else {

            unselectedProductsArr = productsArr.diff(products.selected);

        }

        $http.post( 'api/admin/categories/update/', {

            token: checkToken.raw(),
            category: category

        }).then( function(){

            $scope.success = true;

            $timeout(function(){

                $scope.success = false;

                $scope.alerts = [
                    { type: 'success', msg: 'Category changes saved!' }
                ];

            }, 3000);

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

        // update selected products category
        angular.forEach(products.selected, function(item) {

            item.category = category.id;

            $http.post( 'api/admin/products/update/', {

                token: checkToken.raw(),
                product: item

            }).then( function(){

                $scope.success = true;

            }, ( function(){

                console.log( 'Error on communicate with API.' );

            }));

        });

        if(unselectedProductsArr.length) {

            // update unselected products category
            angular.forEach(unselectedProductsArr, function(item) {

                item.category = 1;

                $http.post( 'api/admin/products/update/', {

                    token: checkToken.raw(),
                    product: item

                }).then( function(){

                    $scope.success = true;

                }, ( function(){

                    console.log( 'Error on communicate with API.' );

                }));

            });

        }

    };


}]);

controllersAdmin.controller( 'users' , [ '$scope' , '$http', 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/admin/users/get', {

        token: checkToken.raw()

    }).then( function( data ){

        $scope.users = data.data;

        angular.forEach($scope.users, function( item ) {

            item['id'] = Number(item.id);

        });

        // pagination
        $scope.currentPage = 1;
        $scope.numPerPage = 20;
        $scope.maxSize = 5;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.changeSort = function (item) {
        $scope.reverse = $scope.reverse =! $scope.reverse;
        $scope.sort = item;
    };

    $scope.delete = function(user) {

        if (!confirm('Are you really want to delete this user?')) {
            return false;
        }

        var index = $scope.users.findIndex(x => x.id==user.id);

        $scope.users.splice(index, 1);

        $http.post( 'api/admin/users/delete/', {

            token: checkToken.raw(),
            user: user

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.changeRole = function(user) {

        if(user.role == 'user') {

            user.role = 'admin';

        } else {

            user.role = 'user';

        }

        $http.post( 'api/admin/users/updateRole/' , {

            token: checkToken.raw(),
            id: user.id,
            role: user.role

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout', 'checkToken', function( $scope , $http , $routeParams, $timeout, checkToken ){

    var userId = $routeParams.id;
    $scope.id = userId;

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $http.post( 'api/admin/users/get/' + userId, {

       token: checkToken.raw()

    }).then( function( data ){

        $scope.user = data.data;

    }, ( function(){

        console.log( 'Error on communicate with API.' );

    }));

    $scope.saveChanges = function(user) {

        $http.post( 'api/admin/users/update/', {

            token: checkToken.raw(),
            id: userId,
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf

        }).then( function(errors){

            $scope.submit = true;

            if (errors.data) {

                $scope.errors = errors.data;

            } else {

                $scope.success = true;
                console.log($scope.success);
                $timeout(function(){
                    $scope.success = false;

                    $scope.alerts = [
                        { type: 'success', msg: 'User updated!' }
                    ];
                }, 3000);

            }

            $scope.submit = true;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , '$timeout', 'checkToken', function( $scope , $http, $timeout, checkToken ){

    $scope.user = {};
    $scope.user.role = 'user';

    // alerts
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.createUser = function(user) {

        $http.post( 'api/admin/users/create/', {

            token: checkToken.raw(),
            user : user,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            passconf : user.passconf

        }).then( function( errors ){

            if (errors.data) {

                $scope.errors = errors.data;

            } else {

                $scope.user = {};
                $scope.success = true;
                $scope.errors = {};

                $timeout(function(){

                    $scope.success = false;

                    $scope.alerts = [
                        { type: 'success', msg: 'User added!' }
                    ];

                }, 3000);

            }

            $scope.submit = true;

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    }

}]);

controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , 'checkToken', function( $scope , $http, checkToken ){

    $http.post( 'api/admin/orders/get/' , {

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

    $scope.delete = function(order, $index) {

        if (!confirm('Are you really want to delete this order?')) {

            return false;

        }

        $scope.orders.splice($index, 1);

        $http.post( 'api/admin/orders/delete/' , {

            token: checkToken.raw(),
            id: order.id

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.changeStatus = function(order) {

        if(order.status == 0) {

            order.status = 1;

        } else {

            order.status = 0;

        }

        $http.post( 'api/admin/orders/update/' , {

            token: checkToken.raw(),
            id: order.id,
            status: order.status

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'adminCategory' , [ '$scope', '$http', '$location', '$window', '$routeParams', 'productsService', 'categoriesService', 'checkToken', function( $scope, $http, $location, $window, $routeParams, productsService, categoriesService, checkToken ){

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

    $scope.deleteProduct = function(product) {

        if (!confirm('Are you really want to delete this product?')) {
            return false;
        }

        var index = $scope.products.findIndex(x => x.id==product.id);

        $scope.products.splice(index, 1);

        $http.post( 'api/admin/products/delete/', {

            token: checkToken.raw(),
            product: product

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

    $scope.deleteCategory = function(category) {

        if (!confirm('Are you really want to delete this category?')) {
            return false;
        }

        $http.post( 'api/admin/categories/delete/', {

            token: checkToken.raw(),
            category: category

        }).then( function(){

            $location.path('/admin/categories');

        }, ( function(){

            console.log( 'Error on communicate with API.' );

        }));

    };

}]);

controllersAdmin.controller( 'adminHome' , [ '$scope', '$http', '$uibModal', 'sliderFactory', 'productsService', '$timeout', function( $scope, $http, $uibModal, sliderFactory, productsService, $timeout ){

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

    $scope.removeItem = function ($index) {

        if (!confirm('Are you really want to delete this promotion?')) {
            return false;
        }

        if($scope.items.length > 1) {

            owlAPi.trigger('next.owl.carousel');
            sliderFactory.delete($scope.items[$index]);
            $(".owl-carousel").trigger('remove.owl.carousel', [$index]).trigger('refresh.owl.carousel');
            $scope.items.splice($index, 1);

        }

    };

    // modal
    $scope.promotion = {};
    $scope.showForm = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'partials/modal.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }

        });

        modalInstance.result.then(function (selectedItem) {

            $scope.promotion = {};

        }, function () {

            $scope.promotion = {};

        });
    };

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

var ModalInstanceCtrl = function ($scope, $http, checkToken, $uibModalInstance, userForm, FileUploader) {

    // init uploader
    var uploader = $scope.uploader = new FileUploader({

        token: checkToken.raw(),
        url: 'api/admin/images/uploadPromo/',
        queueLimit: 1

    });

    uploader.filters.push({

        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }

    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {

        $scope.promotion.src = "uploads/promotions/" + fileItem._file.name;

    };

    // $scope.form = {};
    $scope.submitForm = function (promotion) {

        if ($scope.form.userForm.$valid) {

            $uibModalInstance.close();

            $http.post( 'api/admin/promotions/create/', {

                token: checkToken.raw(),
                promotion: promotion

            }).then( function() {

                var html = '<div class="item"><a href="' + promotion.link + '"><img src="' + promotion.src + '" alt=""></a></div><div class="btn-group"><a class="btn btn-default" href="#/cart"><span class="glyphicon glyphicon-pencil"></span></a><button class="btn btn-default" ng-click="showForm()"><span class="glyphicon glyphicon-upload"></span></button><button type="button" class="btn btn-gray" ng-click="removeItem(' + promotion.position +');"><span class="glyphicon glyphicon-trash"></span></button></div>';

                $(".owl-carousel").trigger('add.owl.carousel', [$('<div class="owl-item" style="width: 100%">' + html + '</div>')]).trigger('refresh.owl.carousel');

                $scope.promotion = {};

            }, ( function() {

                console.log( 'Error on communicate with API.' );

            }));

        } else {

            console.log($scope.form.userForm.error);

        }

    };

    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');

    };

};


