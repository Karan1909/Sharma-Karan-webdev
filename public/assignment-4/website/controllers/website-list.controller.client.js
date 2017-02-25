(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            var promise=WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(
                function (websites) {//whichever websites the other page returns, assign it to vm.websites.
                    vm.websites=websites;
                }
            );
        } init();

    }
})();