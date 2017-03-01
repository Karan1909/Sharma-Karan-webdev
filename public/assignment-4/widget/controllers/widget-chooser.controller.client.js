(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)

    function WidgetChooserController($sce,$routeParams,$location,WidgetService) {

        var vm=this;
        vm.userId=$routeParams.uid;
        vm.pageId=$routeParams.pid;
        var piid=vm.pageId;
        // vm.widgetId=$routeParams.wgid;
        vm.websiteId=$routeParams.wid;

        vm.widgets =WidgetService.findWidgetsByPageId(vm.pageId);

        vm.doYouTrustUrl=doYouTrustUrl;
      //  vm.setHeaderWidgetType=setHeaderWidgetType;
        vm.setImageWidgetType=setImageWidgetType;
        vm.createWidget=createWidget;
        vm.setYouTubeWidgetType=setYouTubeWidgetType;
        // vm.deleteWidget=deleteWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }


                var pageId=vm.pageId;
            //     var promise=WidgetService.setHeaderWidgetType(piid);
            // console.log(promise);
            //     promise.success(
            //         function (widget) {
            //             vm.widget=widget;
            //             vm.widgetId=widget._id;
            //         }
            //     );


            // var pageId=vm.pageId;
            // vm.widget=WidgetService.setHeaderWidgetType();
            // vm.widgetId=vm.widget._id;
            //
            // WidgetService.createWidget(pageId,vm.widget);
            // //WidgetService.findWidgetById(vm.widgetId);
            //
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
            //



                // var promise=WidgetService.setHeaderWidgetType(pageId);
                // promise.success(
                //     function (newHeader) {

                // }

        function createWidget(piid,type) {
            if(type=="HEADING")
            {
                // var newHeader={ "_id": "123","name":" New Header","widgetType": "HEADING", "pageId": "321", "size": 2, "text": "Enter Text here"};

                   var widgetType= {widgetType: 'HEADING'};

            }
            else if(type=="IMAGE")
            {
                var widgetType= {widgetType: 'IMAGE'};

            }
            else if(type=="YOUTUBE")
            {
                var widgetType= {widgetType: 'YOUTUBE'};
            }

            var promise=WidgetService.createWidget(piid,widgetType);
            promise.success(
                function (widget) {
                    vm.widget=widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
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
