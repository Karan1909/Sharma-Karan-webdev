module.exports = function (app,model) {
    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);
    app.get("/api/user/:userId",findUserById); // userId is the path paraameter
    app.put("/api/user/:userId",updateUser); // userId is the path paraameter
    app.put("/api/user/:userId/search/:bookId",addToLibrary);
    app.get("/api/user/:userId/viewLibrary",getBooksFromLibrary);


    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var myFile = req.file;
        var filename = myFile.filename;
        var widget = {};
        widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
        console.log(widget.url);
        widget.width = req.body.width;
        var uId = req.body.userId;
        model.BookUserModel.updateImage(uId, widget).then(
            function (widget) {
                res.redirect("/project/#/user/" + req.body.userId);
            }
            , function (err) {
                res.sendStatus(500).send(err);

            });
    }


    function getBooksFromLibrary(req,res) {
        var userId=req.params.userId;
        model.BookUserModel.getBooksFromLibrary(userId)
            .then(
                function (books) {
                    console.log("inside server"+books);
                    res.json(books);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }

    function addToLibrary(req,res) {
        // var author=req.body.author;
        // var title=req.body;
        var userId=req.params.userId;
        // var bookId=req.params.bookId;
        // console.log("inside server before json"+bookEntry);
        // var bookEntry={};
        // // bookEntry.author=author;
        // bookEntry.title=title;
        // bookEntry.bookId=bookId;
        var bookEntry=req.body;
        console.log("inside server"+bookEntry);
        model.BookUserModel.addToLibrary(bookEntry,userId)
            .then(
                function (bookEntry) {

                    console.log("inside server"+bookEntry);
                    res.json(bookEntry);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }
    function deleteUser(req,res) {
        var userId=req.params.userId;

        model.BookUserModel.deleteUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }
    function findUser(req,res) {

        var username=req.query.username;
        var password=req.query.password;

        if(username && password)
        {
            findUserByCredentials(req,res);

        }
        else if(username)
        {
            findUserByUsername(req,res);

        }


    }
    function createUser(req, res) {

        var newUser=req.body;
        newUser.firstName="New User";
        newUser.lastName="New User lastname";
        model.BookUserModel
            .createUser(newUser)
            .then(function(newUser){
                res.json(newUser);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }

    function findUserByUsername(req,res) {
        var username=req.query.username;
        model.BookUserModel
            .findUserByUsername(username)
            .then(function(user,err){
                if(user)
                {
                    console.log("in this succ"+user);
                    res.json(user);
                }
                else
                {
                    console.log("in this fail"+err);
                    res.sendStatus(400).send(err);
                }

            });

    }
    function updateUser(req,res) {

        var userId=req.params.userId;
        var newUser=req.body;
        model.BookUserModel
            .updateUser(userId,newUser)
            .then(function(status){
                res.json(newUser);
            });
    }

    function findUserById(req, res)
    {
        var userId=req.params.userId;
        model.BookUserModel
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            });

    }
    function findUserByCredentials(req, res) {

        //res is the object used to genenrate the response
        //req represents everything coming from client

        var username=req.query.username;
        var password=req.query.password;

        console.log("Get the user by credentials");
        model.BookUserModel
            .findUserByCredentials(username,password).then(
            function (user) {
                res.json(user);
            },function (err) {
                res.send(err);
            }
        );}
};