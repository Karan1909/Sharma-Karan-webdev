module.exports=function (app) {
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    var widgets=[
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%","url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"}
    ];

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var myFile = req.file;
        var filename = myFile.filename;
        for (var w in widgets) {
            if (widgets[w]._id ==req.body.widgetId) {
                widgets[w].url = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
                widgets[w].width=req.body.width;
            }
        }
        res.redirect("/assignment-4/#/user/"+req.body.userId+"/website/"+req.body.websiteId + "/page/" + req.body.pageId +"/widget");
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.json(widgets);
    }

    function findWidgetById(req,res) {

        var widgetId=req.params.widgetId;
            for (var u in widgets) {
            if (widgets[u]._id == widgetId) {
                res.json(widgets[u]);
                break;
            }
        }

    }
    function createWidget(req,res) {

        var pageId=req.params.pageId;
        // var widget=req.body;
        // widget.pageId=pageId;
        var newHeader={ "_id": "123","name":" New Header","widgetType": "HEADING", "pageId": "321", "size": 2, "text": "Enter Text here"};
        var type=req.body;
        var id=(new Date()).getTime();
        newHeader.pageId=pageId;
        newHeader._id=id.toString();
        if(type.widgetType=="HEADING")
        {
            newHeader.widgetType="HEADING";

            console.log("hello inside heading")
        }

        else if(type.widgetType=="IMAGE")
        {
            newHeader.widgetType="IMAGE";
        }
        else if(type.widgetType=="YOUTUBE")
        {
            newHeader.widgetType="YOUTUBE";
        }

        widgets.push(newHeader);
        console.log(newHeader);
        res.json(newHeader);

    }

    function updateWidget(req,res) {
         var widget=req.body;
        var widgetId=req.params.widgetId;

        console.log("inside update");
        if(widget.widgetType=="HEADING")
        {

            for(var u in widgets)
            {
                if(widgets[u]._id==widgetId)
                {

                    widgets[u].text=widget.text;
                    widgets[u].size=widget.size;
                    res.json(widgets);
                    break;

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
                    res.json(widgets);
                    break;
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
                    res.json(widgets);
                    break;

                }
            }

        }

    }

    function findAllWidgetsForPage(req,res) {
        var arrayOfWidgets=[];
        var pageId=req.params.pageId;
        for(var u in widgets)
        {
            if(widgets[u].pageId==pageId)
            {
                arrayOfWidgets.push(widgets[u]);
            }
        }
        res.json(arrayOfWidgets) ;

    }



};





