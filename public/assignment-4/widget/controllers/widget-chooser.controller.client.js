(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController);

    function WidgetChooserController($sce,$routeParams,$location,WidgetService) {

        var vm=this;
        vm.userId=$routeParams.uid;
        vm.pageId=$routeParams.pid;
        vm.websiteId=$routeParams.wid;
        var pageId=vm.pageId;
        vm.widgets =WidgetService.findAllWidgetsForPage(vm.pageId);

        vm.doYouTrustUrl=doYouTrustUrl;

        vm.setImageWidgetType=setImageWidgetType;
        vm.createWidget=createWidget;
        vm.setYouTubeWidgetType=setYouTubeWidgetType;


        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }




        function createWidget(type) {

            var newWidget={};
            newWidget.type=type;
            console.log("inside chooser widget outside promise "+type);
            var promise=WidgetService.createWidget(pageId,newWidget);
            promise.success(
                function (widget) {
                    vm.widget=widget;
                    console.log("create widget controller");
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+pageId+"/widget/"+vm.widget._id);
                }
            );

            //WidgetService.findWidgetById(vm.widgetId);


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

           $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }



    }

})();
