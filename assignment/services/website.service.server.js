module.exports = function (app,model) {
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findWebsitesForUser); // userId is the path paraameter
    app.put("/api/website/:websiteId",updateWebsite); // userId is the path paraameter
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    // ];
    //

    function findWebsitesForUser(req,res) {

        var userId=req.params.userId;
        console.log("inside service");
        model.WebsiteModel.findAllWebsitesForUser(userId)
            .then(
                function (website,err) {
                    if(website)
                    {
                        res.json(website);
                    }
                    else
                    {
                        res.statusCode(404).send(err);
                    }

                });
            }
    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        model.WebsiteModel.deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);}
            );
    }


    function createWebsite(req, res) {

        var website=req.body;
        var userId=req.params.userId;
        model.WebsiteModel
            .createWebsiteForUser(userId,website)
            .then(function(website){
                res.json(website);
            }, function (err) {
                res.sendStatus(400).send(err);
            });


    }

    function updateWebsite(req,res) {
        var websiteId=req.params.websiteId;
        var website=req.body;
        console.log("update server");
        model.WebsiteModel
            .updateWebsite(websiteId,website)
            .then(function(website){
                res.json(website);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findWebsiteById(req,res) {

        var wid=req.params.websiteId;
        model.WebsiteModel
            .findWebsiteById(wid)
            .then(function(website){
                res.json(website);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }










};