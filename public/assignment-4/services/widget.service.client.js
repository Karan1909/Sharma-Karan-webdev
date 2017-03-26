(function () {
    angular.module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http) {

        // var widgets=[
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E"}
        // ];

        var api={
         "findAllWidgetsForPage": findAllWidgetsForPage,
          "updateWidget": updateWidget,
            "findWidgetById":findWidgetById,
            "setImageWidgetType":setImageWidgetType,
            "setYouTubeWidgetType":setYouTubeWidgetType,
            "setHeaderWidgetType":setHeaderWidgetType,
            "createWidget":createWidget,
            "deleteWidget":deleteWidget,
            "reorderWidget":reorderWidget
     };
        return api;

        
        function reorderWidget(index1,index2,pageId) {
            return $http.put("/page/"+pageId+"/widget?start="+index1+"&end="+index2).
                then(function (response) {
                return response.data;
            });
        }
        function deleteWidget(widgetId) {

            return $http.delete("/api/widget/"+widgetId);

        }

        function createWidget(pageId,newWidget) {

            console.log("create widget service");
            return $http.post("/api/page/"+pageId+"/widget",newWidget);
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
            // var arrayOfWidgets=[];
            // for(var u in widgets)
            // {
            //     if(widgets[u].pageId==pageId)
            //     {
            //         arrayOfWidgets.push(widgets[u]);
            //     }
            // }
            // return arrayOfWidgets;

        }

        // function findWidgetsByPageId(pageId,widgets) {
        //
        //
        //
        //     var widgetList=[];
        //     for (var u in widgets) {
        //         if (widgets[u].pageId == pageId) {
        //             widgetList.push(widgets[u]);
        //         }
        //     }
        //     return widgetList;
        //
        // }

        function findWidgetById(widgetId) {

            return $http.get("/api/widget/"+widgetId);


        }
        
        function updateWidget(widgetId,widget) {

            return $http.put("/api/widget/"+widgetId, widget);

        }

        function setImageWidgetType() {
            var newImage={ "_id": "345","name":"New Image",  "widgetType": "IMAGE", "pageId": "321", "width": "100%","text": "Enter text here",
                "url": "Enter URL"};
            newImage._id=(new Date()).getTime().toString();

            return newImage;

        }
        function setHeaderWidgetType(pageId) {

            return $http.post("/api/page/"+pageId+"/widget/widget");


        }
        function setYouTubeWidgetType() {
            var newYouTubeWidget={"_id": "137","name":"New Video", "widgetType": "YOUTUBE", "pageId": "117", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E","text": "" };
            newYouTubeWidget._id=(new Date()).getTime().toString();


            return newYouTubeWidget;

        }

    }

})();
