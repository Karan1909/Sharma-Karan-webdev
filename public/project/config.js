(function () {
    angular.module("BookLook",['ngRoute']).config(configuration);
    function configuration ($routeProvider,$httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';


        $routeProvider
            // login page route change do add it
            .when("/",
                {
                    templateUrl: "user/views/login.view.client.html",
                    controller:"LoginController",
                    controllerAs:"model" // within the template, we can access this controller with name model// call me by name model from view
                }).when("/home",
                {
                    templateUrl: "homepage/views/home.view.client.html",
                    controller:"HomePageViewController",
                    controllerAs:"model" // within the template, we can access this controller with name model// call me by name model from view
                }
            ).when("/home/search/:bid",
            {
                templateUrl: "homepage/views/homebookdetail.view.client.html",
                controller:"DetailsHomePageViewController",
                controllerAs:"model" // within the template, we can access this controller with name model// call me by name model from view
            }
        )


            .when("/admin",
            {
                templateUrl: "admin/views/admin.view.client.html",
                controller:"AdminController",
                controllerAs:"model", // within the template, we can access this controller with name model// call me by name model from view
                resolve:{
                    someName: checkLogin,
                    checkAdmin:isAdmin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route

                }
            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/admin/viewUser/:uid",
            {
                templateUrl: "admin/views/viewUser.view.client.html",
                controller:"AdminUserViewController",
                controllerAs:"model", // within the template, we can access this controller with name model// call me by name model from view
                resolve:{
                    someName: checkLogin,
                    checkAdmin:isAdmin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route

                }
            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/register",
            {
                templateUrl: "user/views/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"

            }
        ).
            when("/user/editProfile",
            {

                templateUrl: "user/views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route

                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/viewProfile",
            {

                templateUrl: "user/views/profile.static.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route

                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
        .when("/user/userId/search",
            {
                templateUrl: "booksearch/views/booksearch.view.client.html",
                controller: "GoogleBookSearchController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin

                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })

            .when("/user/:uid/search/:bid",
            {
                templateUrl: "booksearch/views/bookdetail.view.client.html",
                controller: "BookDetailController",
                controllerAs:"model"  ,
                resolve:{
                someName: checkLogin
                //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }})
            .otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/userId/viewLibrary",
            {
                templateUrl: "library/views/viewLibrary.view.client.html",
                controller: "LibraryController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }}
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/:uid/viewLibrary/:bid",
            {
                templateUrl: "library/views/sellbook.view.client.html",
                controller: "BookDetailController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/userId/buyBooks",
            {
                templateUrl: "buyer/views/buyer.view.client.html",
                controller: "GoogleBookSearchController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin,
                    checkBuyer:checkBuyer//you can put checkAdmin means are they admin, if yes then we let them through with that route
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/userId/buyBooks/:bid",
            {
                templateUrl: "buyer/views/seeallsellers.view.client.html",
                controller: "ViewSellersController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin,
                    checkBuyer:checkBuyer//you can put checkAdmin means are they admin, if yes then we let them through with that route
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }})
            .otherwise(
                {
                    redirectTo:'/login'
                })
            .when("/user/:uid/buyBooks/:bid/:sid",
            {
                templateUrl: "buyer/views/viewseller.view.client.html",
                controller: "ViewBookToBuyController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin,
                    checkBuyer:checkBuyer//you can put checkAdmin means are they admin, if yes then we let them through with that route
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route

                }

            }
        ).otherwise(
            {
                redirectTo:'/login'
            })
            .when("/user/userId/viewAllSellers",
            {
                templateUrl: "preferredSellers/views/preferredseller.view.client.html",
                controller: "ViewAllSellersController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }

            })
            .otherwise(
                {
                    redirectTo:'/login'
                })
            .when("/user/userId/viewAllOrders",
            {
                templateUrl: "orders/views/vieworders.view.client.html",
                controller: "OrdersController",
                controllerAs:"model",
                resolve:{
                    someName: checkLogin,
                    checkBuyer:checkBuyer//you can put checkAdmin means are they admin, if yes then we let them through with that route
                    //you can put checkAdmin means are they admin, if yes then we let them through with that route
                }

            }).otherwise(
            {
                redirectTo:'/login'
            });

        function checkLogin($q, UserService,$location) {

            var deffered=$q.defer();

            UserService.logggedIn()
                .then(
                    function (user) {
                        if(user=='0'){
                            deffered.reject();
                            $location.url('/');
                        }
                        if(user)

                        {
                            deffered.resolve(user);
                        }
                    }
                );
            return deffered.promise;

        }


        function isAdmin($q, UserService,$location) {

            var deffered=$q.defer();

            UserService.isAdmin()
                .then(
                    function (user) {
                        if(user==0){
                            deffered.reject();
                            $location.url('/user/viewProfile');
                        }
                        if(user)

                        {
                            deffered.resolve(user);
                        }
                    }
                );
            return deffered.promise;

        }


        function checkBuyer($q, UserService,$location) {

            var deffered=$q.defer();
            UserService.checkBuyer()
                .then(
                    function (user) {

                            if(user==0){
                                deffered.reject();
                                $location.url('/user/viewProfile');
                            }
                            if(user)

                            {
                                deffered.resolve(user);
                            }
                        }

                );
            return deffered.promise;

        }




    }
})();