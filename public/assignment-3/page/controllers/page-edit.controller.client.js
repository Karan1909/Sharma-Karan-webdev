(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController);

    function PageEditController($routeParams, PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId=$routeParams.pid;
       // vm.website=PageService.updatePage(vm.pageId,website);
        //vm.page=findPageByPageId;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;

        function updatePage(paged){
            PageService.updatePage(vm.pageId,paged);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }

        function deletePage(pageId) {

            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        vm.websiteId= $routeParams.wid;
        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.paged=PageService.findPageById(vm.pageId);
        }
        init();



      /*  function findPageByPageId(pageId) {
            PageService.findPageById(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page"+vm.pageId);

        }
*/



    }
})();


