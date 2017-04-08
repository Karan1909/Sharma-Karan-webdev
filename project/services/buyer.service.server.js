module.exports = function (app,model) {
    app.put("/api/user/addPreferredSeller/:sellerId",preferredSeller);
    app.post("/api/user/:userId/buyBooks/:bookId/:sellerId",buyBook);
    app.get("/api/user/:userId/viewAllOrders",viewOrders);



    function viewOrders(req,res) {
        var userId=req.params.userId;

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
