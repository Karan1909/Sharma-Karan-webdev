(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($sce, $routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;
        
        function deleteWidget() {
         WidgetService.deleteWidget(vm.widgetId);
         $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

        function init() {

            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget){

            WidgetService.updateWidget(vm.widgetId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }


            }
})();
