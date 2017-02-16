(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)

    function WidgetChooserController($sce,$routeParams,$location,WidgetService) {

        var vm=this;
        vm.userId=$routeParams.uid;
        vm.pageId=$routeParams.pid;
        // vm.widgetId=$routeParams.wgid;
        vm.websiteId=$routeParams.wid;

        vm.widgets =WidgetService.findWidgetsByPageId(vm.pageId);

        vm.doYouTrustUrl=doYouTrustUrl;
        vm.setHeaderWidgetType=setHeaderWidgetType;
        vm.setImageWidgetType=setImageWidgetType;
        vm.setYouTubeWidgetType=setYouTubeWidgetType;
        // vm.deleteWidget=deleteWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function setHeaderWidgetType(){

            var pageId=vm.pageId;
            vm.widget=WidgetService.setHeaderWidgetType();
            vm.widgetId=vm.widget._id;

            WidgetService.createWidget(pageId,vm.widget);
            //WidgetService.findWidgetById(vm.widgetId);

            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }

        function setImageWidgetType(){

            var pageId=vm.pageId;
            vm.widget=WidgetService.setImageWidgetType();
            vm.widgetId=vm.widget._id;

            WidgetService.createWidget(pageId,vm.widget);
            //WidgetService.findWidgetById(vm.widgetId);

            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }

        function setYouTubeWidgetType(){

            var pageId=vm.pageId;
            vm.widget=WidgetService.setYouTubeWidgetType();
            vm.widgetId=vm.widget._id;

            WidgetService.createWidget(pageId,vm.widget);
            //WidgetService.findWidgetById(vm.widgetId);

           // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }



    }

})();
