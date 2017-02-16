(function () {
    angular.module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService() {

        var widgets=[
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"}
        ];

        var api={
         "findAllWidgets": findAllWidgets,
          "updateWidget": updateWidget,
            "findWidgetById":findWidgetById,
            "setImageWidgetType":setImageWidgetType,
            "setYouTubeWidgetType":setYouTubeWidgetType,
            "setHeaderWidgetType":setHeaderWidgetType,
            "findWidgetsByPageId":findWidgetsByPageId,
            "createWidget":createWidget,
            "deleteWidget":deleteWidget
     };
        return api;

        function deleteWidget(widgetId) {
                for(var w in widgets) {
                    if(widgets[w]._id === widgetId) {
                        widgets.splice(w, 1);
                    }
                }
        }

        function createWidget(pageId,widget) {
            widget.pageId=pageId;

            widgets.push(widget);

        }

        function findAllWidgets(pageId) {
            var arrayOfWidgets=[];
            for(var u in widgets)
            {
                if(widgets[u].pageId==pageId)
                {
                    arrayOfWidgets.push(widgets[u]);
                }
            }
            return arrayOfWidgets;

        }

        function findWidgetsByPageId(pageId) {

            var widgetList=[];
            for (var u in widgets) {
                if (widgets[u].pageId == pageId) {
                    widgetList.push(widgets[u]);
                }
            }
            return widgetList;

        }

        function findWidgetById(widgetId) {

            for(var u in widgets)
            {

                if(widgets[u]._id==widgetId)
                {
                    return widgets[u];
                }

            }

        }
        
        function updateWidget(widgetId,widget) {

            if(widget.widgetType=="HEADING")
            {

                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].text=widget.text;
                        widgets[u].size=widget.size;

                    }
                }

            }
            else if (widget.widgetType=="IMAGE")
            {

                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].url=widget.url;
                    }
                }

            }
            else if (widget.widgetType=="YOUTUBE")
            {
                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].url=widget.url;
                        widgets[u].text=widget.text;

                    }
                }

            }

        }

        function setImageWidgetType() {
            var newImage={ "_id": "345","name":"New Image",  "widgetType": "IMAGE", "pageId": "321", "width": "100%","text": "Enter text here",
                "url": "Enter URL"};
            newImage._id=(new Date()).getTime().toString();

            return newImage;

        }
        function setHeaderWidgetType() {
            var newHeader={ "_id": "123","name":" New Header", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "Enter Text here"};
            var id=(new Date()).getTime();
            newHeader._id=id.toString();



            return newHeader;

        }
        function setYouTubeWidgetType() {
            var newYouTubeWidget={"_id": "137","name":"New Video", "widgetType": "YOUTUBE", "pageId": "117", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E","text": "" };
            newYouTubeWidget._id=(new Date()).getTime().toString();


            return newYouTubeWidget;

        }

    }

})();
