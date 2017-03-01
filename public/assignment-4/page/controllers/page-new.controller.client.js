(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.createPage = createPage;

        function init() {

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(
                function (page) {
                    vm.pages = page;
                }
            );
        }init();

        function createPage (paged) {
            var promise= PageService.createPage(vm.websiteId,paged);
            promise.success(
              function (paged) {
                  $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
              }
            );

        }
    }
})();