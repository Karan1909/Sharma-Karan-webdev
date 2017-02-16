(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId= $routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.page=findPageByPageId;
        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();


        function findPageByPageId(pageId) {
            PageService.findPageById(vm.pageId);

        }


    };
})();

