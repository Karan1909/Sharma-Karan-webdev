(function () {
    angular.module("BookLook").config(configuration);
    function configuration ($routeProvider,$httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/",
                {
                    templateUrl: "user/views/login.view.client.html",
                    controller:"LoginController",
                    controllerAs:"model" // within the template, we can access this controller with name model// call me by name model from view
                }
            ).when("/register",
            {
                templateUrl: "user/views/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"

            }
        ).when("/user/:uid",
            {

                templateUrl: "user/views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"

            }
        ).when("/user/:uid/viewProfile",
            {

                templateUrl: "user/views/profile.static.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"

            }
        ).when("/user/:uid/search",
            {
                templateUrl: "booksearch/views/booksearch.view.client.html",
                controller: "GoogleBookSearchController",
                controllerAs:"model"

            }
        ).when("/user/:uid/search/:bid",
            {
                templateUrl: "booksearch/views/bookdetail.view.client.html",
                controller: "BookDetailController",
                controllerAs:"model"

            }
        ).when("/user/:uid/viewLibrary",
            {
                templateUrl: "library/views/viewLibrary.view.client.html",
                controller: "LibraryController",
                controllerAs:"model"

            }
        )


    }
})();