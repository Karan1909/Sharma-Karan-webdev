module.exports=function (app,model) {


    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    // app.delete("/api/user/:userId",deleteUser);
    //app.get("/api/page/:pageId",findPageById); // userId is the path paraameter
    //app.put("/api/user/:userId",updateUser); // userId is the path paraameter

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 4", "websiteId": "456", "description": "Lorem" }
    // ];


    function deletePage(req,res) {

        var pageId=req.params.pageId;
        model.PageModel.deletePage(pageId)
            .then(
                function (page,err) {
                    if(page)
                    {
                        res.json(page);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

                });
    }

    
    function findPageByWebsiteId(req,res) {
        var websiteId=req.params.websiteId;
        console.log("find page by website server");
        model.PageModel.findAllPagesForWebsite(websiteId)
            .then(
                function (page,err) {
                    if(page)
                    {
                        console.log("find page by website server success");
                        res.json(page);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

                });
    }


    function updatePage(req,res) {

        var page=req.body;
        var pageId=req.params.pageId;

        model.PageModel.updatePage(pageId,page)
            .then(
                function (page,err) {
                    if(page)
                    {
                        res.json(page);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

                });


    }

    function createPage(req,res) {
        var websiteId=req.params.websiteId;
        console.log(req.body);
        var page=req.body;
        model.PageModel
            .createPage(websiteId,page)
            .then(function(page){
                res.json(page);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }

    function findPageById(req,res) {

        var pid=req.params.pageId;
        model.PageModel
            .findPageById(pid)
            .then(function(page){
                res.json(page);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }

};
