module.exports = function (app,model) {
    app.put("/api/user/addPreferredSeller/:sellerId",preferredSeller);
    app.post("/api/user/makeUnpreferredSeller/:userId",makeUnPreferred);
    app.post("/api/user/:userId/buyBooks/:bookId/:sellerId",buyBook);
    app.get("/api/user/userId/viewAllOrders",viewOrders);
    app.get("/api/user/getPreferredSeller/:userId",getAllPreferredSellers);

    app.put("/api/user/makePreferredSeller/:userId",makePreferred);




    function makeUnPreferred(req,res) {
        var obj=req.body;
        var userId=req.params.userId;

        model.BuyerModel.makeUnpreferred(
            userId,obj.sellerId
        ).then(
            function (values) {
                console.log("unpref values "+values);
                res.json(values);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
    }



    function makePreferred(req,res) {
        console.log("isnie make pref");
        var obj=req.body;
        var userId=req.params.userId;
        // var sellerId=req.body;

        model.BuyerModel.makePreferred(userId,obj.sellerId)
            .then(
                function (values) {
                    res.json(values);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );



    }



    function getAllPreferredSellers(req,res) {
        var userId=req.params.userId;
        model.BuyerModel.getAllPreferredSellers(userId)
            .then(
                function (values) {
                    console.log("===================================");
                    console.log(values);
                    res.json(values);

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }


            )
    }



    function viewOrders(req,res) {
        var userId=req.user._id;

        console.log("vieworders buyer service "+userId);
        model.BuyerModel.viewOrders(userId)
            .then(
                function (values) {
                    console.log("At server for isselling "+values);
                    res.send(values);

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            )

    }



    function preferredSeller(req,res) {

        var sellerId=req.params.sellerId;
        var userId=req.body.userId;

        console.log("sellerid is "+sellerId);
        console.log("userid is "+userId);


        console.log("inside serve preferred seller");
        model.BuyerModel.preferredSeller(sellerId,userId)
            .then(
                function (values) {
                    console.log("prefered selleer added "+values);
                    res.json(values);

                },
                function (error) {
                    console.log("prefered selleer added "+values);
                    res.sendStatus(400).send(error);

                }


            )
    }


    function buyBook(req,res) {
        var userId=req.params.userId;
        var bookId=req.params.bookId;
        var sellerId=req.params.sellerId;
        var order=req.body;
        console.log("inside buybook model");

        model.BuyerModel.buyBook(order,userId,bookId,sellerId)
            .then(
                function (values) {

                    console.log("At server order"+values);
                    res.json(values);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );




    }






};
