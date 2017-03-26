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
        vm.widgets=WidgetService.findAllWidgetsForPage(vm.pageId);
        vm.getWidgetTemplateUrl=getWidgetTemplateUrl;
        
        function deleteWidget() {

            var promise= WidgetService.deleteWidget(vm.widgetId);
            promise.success(
                function (widgets) {
                    vm.widgets=widgets;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                }
            );

        }

        function init() {

            var promise=WidgetService.findWidgetById(vm.widgetId);
            promise.success(
                function (widget) {
                    vm.widget =widget;
                }
            );

        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'widget/views/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function updateWidget(widget){


            var promise= WidgetService.updateWidget(vm.widgetId,widget);
            console.log("inside updatecont");
            promise.success(
                function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                }
            );

        }


            }
})();
