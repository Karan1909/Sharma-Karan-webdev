(function () {
    angular.module("WebAppMaker").config(configuration);
    function configuration ($routeProvider){
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
        ).
        when("/user/:uid/website",{
            templateUrl: 'website/views/website-list.view.client.html',
            controller: 'WebsiteListController',
            controllerAs: 'model'
        }).
        when("/user/:uid/website/new",
            {
                templateUrl: 'website/views/website-new.view.client.html',
                controller:'WebsiteNewController',
                controllerAs:'model'
            }
        ).
        when("/user/:uid/website/:wid",
            {
                templateUrl: 'website/views/website-edit.view.client.html',
                controller:'WebsiteEditController',
                controllerAs: 'model'
            }).
        when("/user/:uid/website/:wid/page/:pid/widget",
            {
                templateUrl: 'widget/views/widget-list.view.client.html',
                controller:'WidgetListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",
                {
                    templateUrl: 'widget/views/widget-chooser.view.client.html',
                    controller:'WidgetChooserController',
                    controllerAs: 'model'
                }).
            when("/user/:uid/website/:wid/page/:pid/widget/:wgid",
                {
                    templateUrl: 'widget/views/widget-edit.view.client.html',
                    controller:'WidgetEditController',
                    controllerAs: 'model'
                })
            .when("/user/:uid/website/:wid/page",
            {
                templateUrl: 'page/views/page-list.view.client.html',
                controller:'PageListController',
                controllerAs: 'model'
            }).when("/user/:uid/website/:wid/page/new",
            {
                templateUrl: 'page/views/page-new.view.client.html',
                controller:'PageNewController',
                controllerAs: 'model'
            }).when("/user/:uid/website/:wid/page/:pid",
            {
                templateUrl: 'page/views/page-edit.view.client.html',
                controller:'PageEditController',
                controllerAs: 'model'
            });

    }
})();