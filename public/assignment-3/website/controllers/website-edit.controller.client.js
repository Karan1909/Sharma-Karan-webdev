(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;// wid we get from the config
        vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        vm.website=WebsiteService.findWebsiteById(vm.websiteId);


    }
})();

