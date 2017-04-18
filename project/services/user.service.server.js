module.exports = function (app,model) {

    var passport=require('passport');
    var LocalStrategy=require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : "557184475880-tokdbetmhekop75uivafr862nnm7rcrl.apps.googleusercontent.com",
        clientSecret : "Og0AMs-3R33kucRAjoO69RU0",
        callbackURL  : "http://sharma-karan-webdev.herokuapp.com/callback"
    };
    app.get("/api/user",findUser);
    app.post("/api/user",passport.authenticate('local'),login);// somebody to take this request, we want passport to take look at request
    app.post("/api/user/createUser",createUser);
    app.delete("/api/admin/user/:userId",deleteUser);
    app.get("/api/user/:userId",findUserById); // userId is the path paraameter
    app.put("/api/user/:userId",updateUser); // userId is the path paraameter
    // app.put("/api/user/:userId/search/:bookId",addToLibrary);
    app.get("/api/user/userId/viewLibrary",getBooksFromLibrary);
    app.get("/api/usingObjects/user/:userId",findUserByIdUsingObjects);
    app.get("/api/get/Image/user/:userId",getImageLinkForUser);
    app.post('/api/user/isadmin',isAdmin);
    app.post('/api/user/isBuyer',isBuyer);

    app.post('/api/user/loggedin',loggedin);
    app.post("/api/user/logout", logout);
    app.post("/api/user/userId/viewLibrary",removeFromLibrary);


    app.get("/api/admin/user",findAllUsers);
    app.post("/api/admin/user/:userId",updateUserByAdmin);
    app.post('/api/user/is/Seller',checkSeller);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    // app.get("/auth/google",function (req,res) {
    //     console.log("login with google");
    // });

    app.get('/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user/viewProfile',
            failureRedirect: '/#'
        }));

    app.get('/api/admin/user/:userId',findByIdUser);


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        model.BookUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.BookUserModel.createThroughGoogleUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function login(req,res) { // next is for chaining the requests unitl somewhere the response is generated
        var user=req.user;
        console.log("inside login it is ");
        res.json(user);

    }

    function updateUserByAdmin(req,res)
    {
        var userId=req.params.userId;
        var user=req.body;
    model.BookUserModel.updateUserByAdmin(userId,user)
        .then(function(status){
            res.json(user);
        });

    }


    function findByIdUser(req,res) {
        var userId=req.params.userId;
        model.BookUserModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user)
                    {
                        res.json(user);
                    }
                    else
                    {
                        res.send(400);
                    }
                }

            );


    }


    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        model.BookUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log('[0]');
                    console.log(user);
                    if (!user) {
                        console.log('[1]');
                        return done(null, false);
                    }
                    console.log('[2]');
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }




    var q=require('q');

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
                res.redirect("/project/#/user/editProfile");
            }
            , function (err) {
                res.sendStatus(500).send(err);

            });
    }

    function getImageLinkForUser(req,res) {
        var userId=req.params.userId;
        var uIds=req.body;
console.log("isnide server "+uIds);
        model.BookUserModel
            .getImageLinkForUser(userId,uIds)
            .then(
            function(arrayLinks){
                res.json(arrayLinks);
            },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }



    function findUserByIdUsingObjects(req,res) {
        var userId=req.params.userId;

        model.BookUserModel
            .findUserByIdUsingObjects(userId)
            .then(function(user){
                res.json(user);
            });

    }
    function getBooksFromLibrary(req,res) {
        var userId=req.user._id;
        console.log("inside getbookfromlib");
        model.BookUserModel.getBooksFromLibrary(userId)
            .then(
                function (books) {
                    console.log("inside server getting user with its library"+books);
                    res.json(books);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }

    function addToLibrary(req,res) {

        var userId=req.params.userId;
        console.log(userId);

        var bookEntry=req.body;
        console.log("inside server add to library"+bookEntry);
        model.BookUserModel.addToLibrary(bookEntry,userId)
            .then(
                function (bookEntry) {

                    console.log("inside server add to library"+bookEntry);
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
            console.log("get only username  and pass");
            findUserByCredentials(req,res);

        }
        else if(username)
        {
            console.log("get only username ");
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
                req.login(newUser,function (err) {
                    if(err)
                    {
                        console.log("inside create user error encountered "+err);
                        res.send(400);
                    }
                    else
                    {
                        res.json(newUser);
                    }
                });

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

        // var userId=req.params.userId;
        var userId=req.user._id;
        var newUser=req.body;
        model.BookUserModel
            .updateUser(userId,newUser)
            .then(function(status){
                res.json(newUser);
            });
    }

    function findUserById(req, res)
    {
        // var userId=req.params.userId;
        var userId=req.user._id;
        console.log("serveer"+userId);
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


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.BookUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    console.log("serial"+user);
                    done(null, user);
                },
                function(err){
                    console.log(err);
                    done(err, null);
                }
            );

        }
    function loggedin(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0');
        // res.send('0');
    }
    
    function logout(req,res) {
        console.log("inside logout");
        req.logout();
        res.send(200);
    }


    function isAdmin(req,res) {
        res.send(req.isAuthenticated() && req.user.role=="ADMIN"? req.user : '0');
    }


    function findAllUsers(req,res) {

        if(req.user && req.user.role=='ADMIN')
        {
            model.BookUserModel
                .findAllUsers()
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.send(400);
                    }
                );

        }
        else
        {
            res.send(401);
        }


    }


    function removeFromLibrary(req,res) {
        var obj=req.body;
        var bookId=obj.bookId;
        var userId=req.user._id;
        console.log("book id is server "+bookId);

        var id=model.BookModel.getIdFromGoogleBookId(bookId);
        // var userid=model.BookUserModel.getUserId(userId);
         console.log("id returned from bookmodel is "+userId);
        console.log("bookid returned from bookmodel is "+id);

        model.BookUserModel.removeFromLibrary(id,userId)
            .then(

                function (user) {
                    res.json(user);
                }
            )

    }

    function isBuyer(req,res) {
        res.send(req.isAuthenticated() && req.user.role=="BUYER"? req.user : '0');

    }

    function checkSeller(req,res)
    {
        res.send(req.isAuthenticated() && req.user.role=="SELLER"? req.user : '0');
    }

    };