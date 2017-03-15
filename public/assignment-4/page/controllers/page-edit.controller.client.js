(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController);

    function PageEditController($routeParams, PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId=$routeParams.pid;
        vm.websiteId= $routeParams.wid;
        //vm.paged=PageService.findPageById(vm.pageId);

       // vm.website=PageService.updatePage(vm.pageId,website);
        //vm.page=findPageByPageId;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;





        function updatePage(paged){
            var promise= PageService.updatePage(vm.pageId,paged);
            console.log("updatpage"+paged);
            promise.success(
              function (paged) {
                  $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
              }
            );

        }

        function deletePage(pageId) {


            var promise=PageService.deletePage(vm.pageId);
            promise.success(
                function (pages) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                }
            );

        }


        function init() {

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(
                function (page) {
                    vm.pages = page;
                }
            );
            promise=PageService.findPageById(vm.pageId);
            promise.success(
              function (page) {
                  console.log("pages lala"+page._id);
                  vm.paged=page;
              });

            // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        }
        init();



      /*  function findPageByPageId(pageId) {
            PageService.findPageById(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page"+vm.pageId);

        }
*/



    }
})();


