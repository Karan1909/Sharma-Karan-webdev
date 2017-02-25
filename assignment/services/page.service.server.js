module.exports=function (app) {


    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
       // app.post("/api/website/:websiteId/page",createUser);
    // app.delete("/api/user/:userId",deleteUser);
    //app.get("/api/page/:pageId",findPageById); // userId is the path paraameter
    //app.put("/api/user/:userId",updateUser); // userId is the path paraameter

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 4", "websiteId": "456", "description": "Lorem" }
    ];

    
    function findPageByWebsiteId(req,res) {
        var multipages = [];
        console.log('hello jijijiij');
        var websiteId=req.params.websiteId;
        for(var w in pages) {
            if(pages[w].websiteId == websiteId) {
                multipages.push(pages[w]);
            }
        }
            res.json(multipages);
        
    }

    function findPageById(req,res) {
        var pid=req.params.pageId;
        for(var w in pages) {
            if(pages[w]._id == pid) {
                return res.json((pages[w]));
            }
        }

    }

};
