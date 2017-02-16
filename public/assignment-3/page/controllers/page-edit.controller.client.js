(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId=$routeParams.pid;
       // vm.website=PageService.updatePage(vm.pageId,website);

        vm.websiteId= $routeParams.wid;
        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();




    }
})();


