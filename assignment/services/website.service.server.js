module.exports = function (app) {
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findWebsitesForUser); // userId is the path paraameter
    app.put("/api/website/:websiteId",updateWebsite); // userId is the path paraameter
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];
    

    function findWebsitesForUser(req,res) {
        console.log('hello');
        var sites = [];
        var userId=req.params.userId;
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);

    }

    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;

        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
            }
        }
        return res.json(websites);

    }

    function createWebsite(req, res) {

        var website=req.body;
        var userId=req.params.userId;
        website.developerId = userId;
        website._id = (new Date()).getTime().toString();
        websites.push(website);
        res.json(website);


    }


    function updateWebsite(req,res) {

        var websiteId=req.params.websiteId;
        var website=req.body;

        for (var u in websites) {
            if (websites[u]._id == websiteId) {

                websites[u].name = website.name;
                websites[u].description = website.description;
                return res.json(websites[u]);
            }

        }


    }

    function findWebsiteById(req,res) {

        var wid=req.params.websiteId;
             for (var w in websites) {
            if (websites[w]._id === wid) {
                return res.json(websites[w]);
            }
        }

    }










};