module.exports = function (app,model) {
    app.post("/api/user/userId/viewLibrary/:bookId",sellBook);
    app.get("/api/user/userId/buyBooks/:bookId",viewSellers);
    app.delete("/api/user/:userId/buyBooks/:bookId/:sellerId",removeFromSeller);
    // app.get("/api/user/:userId/getAllSellers/:bookId/isSelling",isSelling);
    app.get("/api/user/:userId/getAllSellers",getAllSellers);
    app.get("/api/user/userId/soldItems",viewMyItems);





    function viewMyItems(req,res) {
        // var userId=req.body;
        var userId=req.user._id;
        console.log("selling user id viewmyitems"+userId);

        model.BookUserModel.findUserById(userId).then(
            function (user) {
                console.log("user is "+user);
                console.log(user.username);
                model.SellerModel.viewMyItems(user.username)
                    .then(

                        function (user) {
                            res.json(user);
                        },
                        function (error) {
                            res.sendStatus(400).send(error);
                        }
                    );});




        // model.SellerModel.viewMyItems(userId)
        //     .then(
        //         function (values) {
        //
        //             res.json(values);
        //         },
        //         function (error) {
        //             res.sendStatus(400).send(error);
        //         }
        //     )


    }



    function getAllSellers(req,res) {


        model.SellerModel.getAllSellers()
            .then(
                function (values) {

                    console.log("At server "+values);
                    res.json(values);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );

    }

    function viewSellers(req,res) {
        var userId=req.user._id;
        var bookId=req.params.bookId;
        model.SellerModel.viewSellers(bookId)
            .then(
                function (values) {

                    console.log("At server "+values);
                    res.json(values);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );




    }

    function removeFromSeller(req,res) {
        var userId=req.params.userId;
        var bookId=req.params.bookId;
        var sellerId=req.params.sellerId;

        model.SellerModel.removeFromSeller(userId,bookId,sellerId)
            .then(
                function (values) {

                    console.log("At server "+values);
                    // res.json(values);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function sellBook(req,res) {
        // var userId=req.params.userId;
        // var bookId=req.params.bookId;
        var sellingBook=req.body;
        // var comments=req.body.comments;
        // var condition=req.body.condition;

        console.log("inside seller service server");
        model.SellerModel.sellBook(sellingBook)
            .then(
                function (sellingBook) {
                    console.log("inside server"+sellingBook);
                    res.json(sellingBook);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }






};