(function () {
    angular.module("WebAppMaker").config(configuration);
    function configuration ($routeProvider){
        $routeProvider
            .when("/login",
                {
                    templateUrl: "user/views/login.view.client.html",
                    controller:"LoginController",
                    controllerAs:"model" // within the template, we can access this controller with name model// call me by name model from view
                }
                )
            .when("/register",
                {

                    templateUrl: "user/views/register.view.client.html"
                }
            ).when("/user/:uid",
            {

                templateUrl: "user/views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"

            }
        ).when("/user/:uid/website",{
            templateUrl: 'website/views/website-list.view.client.html',
            controller: 'WebsiteListController',
            controllerAs: 'model'
        }).when("/user/:uid/website/new",
            {
                templateUrl: 'website/views/website-new.view.client.html'
            }
        ).when("/user/:uid/website/:wid",
            {
                templateUrl: 'website/views/website-edit.view.client.html',
                controller:'WebsiteEditController',
                controllerAs: 'model'
            });

    }
})();