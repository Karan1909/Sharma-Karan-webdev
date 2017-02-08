(function () {
    angular.module("WebAppMaker").config(configuration);
    function configuration ($routeProvider){
        $routeProvider
            .when("/login",
                {
                    templateUrl: "user/login.view.client.html",
                    controller:"LoginController",
                    controllerAs:"model" // within the template, we can access this controller with name model
                }
                )
            .when("/register",
                {

                    templateUrl: "user/register.view.client.html"
                }
            ).when("/profile",
            {

                templateUrl: "user/profile.view.client.html"
            }
        ).when("/websites",
                {

                    templateUrl: "website/website-list.view.client.html"
                }
            );

    }
})();