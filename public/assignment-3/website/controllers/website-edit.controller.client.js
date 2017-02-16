(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;// wid we get from the config
        vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
        vm.website=WebsiteService.findWebsiteById(vm.websiteId);

        vm.updateWebsite=updateWebsite;
        vm.deleteWebsite=deleteWebsite;

        function updateWebsite(websites) {
            WebsiteService.updateWebsite(vm.websiteId,websites);
            $location.url("/user/"+vm.userId+"/website/");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website/");

        }




    }
})();

