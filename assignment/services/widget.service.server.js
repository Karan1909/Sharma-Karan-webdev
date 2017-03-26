module.exports=function (app,model) {
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put('/page/:pageId/widget',reorderWidget);

    // var widgets=[
    //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%","url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"}
    // ];

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var myFile = req.file;
        var filename = myFile.filename;
        var widget={};
        widget.url=req.protocol+'://'+req.get('host')+"/uploads/"+filename;
        widget.type="IMAGE";
        widget._id=req.body.widgetId;
        widget.width=req.body.width;
        widget._page=req.body.pageId;
        widget.text=req.body.text;
        widget.name=req.body.name;
        model.
        WidgetModel.
        updateWidget(widget._id,widget).
        then(
            function (widget) {
                res.redirect("/assignment-4/#/user/"+req.body.userId+"/website/"+req.body.websiteId + "/page/" + req.body.pageId +"/widget");
            }
        ,function (err) {
            res.sendStatus(500).send(err);

        });
        // for (var w in widgets) {
        //     if (widgets[w]._id ==req.body.widgetId) {
        //         widgets[w].url = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
        //         widgets[w].width=req.body.width;
        //     }
        // }
        // res.redirect("/assignment-4/#/user/"+req.body.userId+"/website/"+req.body.websiteId + "/page/" + req.body.pageId +"/widget");
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;

        model.WidgetModel
            .deleteWidget(widgetId)
            .then(function(widget){
                res.json(widget);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
 }

    function findWidgetById(req,res) {

        var widgetId=req.params.widgetId;
        model.WidgetModel
            .findWidgetById(widgetId)
            .then(function(widget){
                res.json(widget);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }
    function createWidget(req,res) {

        var pageId=req.params.pageId;
        var newWidget=req.body;
        console.log("create widget service server"+newWidget.type);
        console.log("placeholder "+newWidget.placeholder);
        console.log("rows "+newWidget.rows);
        model.WidgetModel
            .createWidget(pageId,newWidget)
            .then(function(widget)
            {
                model.PageModel
                    .addWidget(pageId, widget._id)
                    .then(function (page) {
                        res.send(widget);
                    })
            }, function (err) {
                res.sendStatus(500).send(err);
            });}

    function updateWidget(req,res) {
         var widget=req.body;
        var widgetId=req.params.widgetId;

        model.WidgetModel
            .updateWidget(widgetId,widget)
            .then(function(widget){
                res.json(widget);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findAllWidgetsForPage(req,res) {

        var pageId = req.params.pageId;
        model.WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function reorderWidget(req,res) {
        var pageId=req.params.pageId;
        var start=parseInt(req.query.start);
        var end=parseInt(req.query.end);
        console.log("reorder server");
        model.WidgetModel.reorderWidget(start,end,pageId).then(function (widgets) {
            res.send(widgets);

        },function (err) {
            res.sendStatus(500).send(err);
        });}
};





