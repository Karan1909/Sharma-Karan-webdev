(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;// wid we get from the config

        vm.website=WebsiteService.findWebsiteById(vm.websiteId);

        vm.updateWebsite=updateWebsite;
       vm.deleteWebsite=deleteWebsite;

        function init() {
            var promise=WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(
                function (websites) {//whichever websites the other page returns, assign it to vm.websites.
                    vm.websites=websites;
                }
            );

            promise=WebsiteService.findWebsiteById(vm.websiteId);
            promise.success(
                function (website) {
                    vm.website=website;

                }
            );

        } init();



        function updateWebsite(websites) {
            var promise=WebsiteService.updateWebsite(vm.websiteId,websites);
            promise.success(
                function (website) {
                    $location.url("/user/"+vm.userId+"/website/");
                }
            )
            // WebsiteService.updateWebsite(vm.websiteId,websites);

        }

        function deleteWebsite() {

            var promise=WebsiteService.deleteWebsite(vm.websiteId);
            promise.success(
                function (websites) {
                    vm.websites=websites;
                    $location.url("/user/"+vm.userId+"/website/");
                }
            );

        }




    }
})();

