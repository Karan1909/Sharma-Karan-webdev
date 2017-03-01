module.exports=function (app) {

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    // app.delete("/api/user/:userId",deleteUser);
    //app.get("/api/page/:pageId",findPageById); // userId is the path paraameter
    //app.put("/api/user/:userId",updateUser); // userId is the path paraameter

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 4", "websiteId": "456", "description": "Lorem" }
    ];


    function deletePage(req,res) {

        var pageId=req.params.pageId;

        for(var w in pages) {
            if(pages[w]._id === pageId) {
                pages.splice(w, 1);
            }
        }
        res.json(pages);

    }

    
    function findPageByWebsiteId(req,res) {
        var multipages = [];

        var websiteId=req.params.websiteId;
        for(var w in pages) {
            if(pages[w].websiteId == websiteId) {
                multipages.push(pages[w]);
            }
        }
            res.json(multipages);
        
    }


    function updatePage(req,res) {

        var page=req.body;
        var pageId=req.params.pageId;

        for(var u in pages)
        {
            if(pages[u]._id==pageId)
            {
                pages[u].name=page.name;
                pages[u].description=page.description;
                pages[u].title=page.title;
                res.json(pages[u]);
            }

        }

    }

    function createPage(req,res) {
        console.log('hello jijijiij');

        var websiteId=req.params.websiteId;
        console.log(req.body);
        var page=req.body;
        page._id = (new Date()).getTime().toString();
        page.websiteId=websiteId;
        pages.push(page);
        res.json(pages);

    }

    function findPageById(req,res) {

        var pid=req.params.pageId;
        for(var w in pages) {
            if(pages[w]._id == pid) {
                res.json((pages[w]));
            }
        }

    }

};
