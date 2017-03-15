(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId= $routeParams.wid;
       // vm.pageId=$routeParams.pid;
        //vm.page=findPageByPageId;
        function init() {

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            console.log("aaya fpttp");
            promise.success(
                function (page) {
                    vm.pages = page;
                }
            );
        }init();



        // function findPageByPageId(pageId) {
        //     PageService.findPageById(vm.pageId);
        //
        // }


    };
})();

