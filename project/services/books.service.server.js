/**
 * Created by kkara on 4/13/2017.
 */

module.exports = function (app,model) {



    // app.put("/api/user/:userId/search/:bookId",addToLibrary);
    app.put("/api/user/:userId/search/:bookId",findBookPresentLibrary);
    // app.get("/api/user/:userId/viewLibrary",getBooksFromLibrary);


    function findBookPresentLibrary(req,res) {
        var userId=req.params.userId;
        console.log(userId);

        var bookEntry=req.body;
        console.log("inside server add to library"+bookEntry);
        model.BookModel.findBookPresentLibrary(bookEntry,userId)
            .then(
                function (book) {
                    if(book==null)
                    {
                        addToLibrary(req,res);
                    }
                    else
                    {
                        console.log("value"+book);
                        model.BookUserModel.addToLibrary(book._id,userId)
                            .then(
                                function (user) {
                                    res.json(user);
                                }
                            );

                        // res.json(book);
                    }


                }
            );
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

        var bookEntry=req.body;
        var userId=req.params.userId;

        model.BookModel.addToLibrary(bookEntry,userId)
            .then(
                function (book) {

                    console.log("inside server add to library"+book);
                    model.BookUserModel.addToLibrary(book._id,userId)
                        .then(
                            function (user) {
                                res.json(user);
                            }
                        );

                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }


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
};
