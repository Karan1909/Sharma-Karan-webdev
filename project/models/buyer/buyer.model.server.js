module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var BuyerSchema = require("./buyer.schema.server.js")();
    var BuyerModel = mongoose.model('BuyerModel', BuyerSchema);

    var api = {
        "buyBook": buyBook,
        "setModel": setModel,
        "preferredSeller":preferredSeller,
        "viewOrders":viewOrders

    };
    return api;


    function viewOrders(userId) {
        return BuyerModel.find(
            {
                "userId":userId
            },
            {
                "orders":1
                // "_id":0,
                // "userId":0,
                // "_v":0
            }
        );

    }


    function preferredSeller(sellerId,userId) {
        return BuyerModel.update(
            {
                "userId":userId
            },
            {
                "$push":{
                    "preferredSellers":sellerId
                }

            }
        )

    }
    function setModel(_model) {
        model = _model;
    }
    function buyBook(order,userId,bookId,sellerId) {

        console.log("order value is "+order.comments);

        // BuyerModel.create(
        //    {
        //        "userId": userId
        //    }
        // );

     return  BuyerModel.update(
            {
                "userId":userId,

            },
         {
             "$push":{
                 "orders":order
             }
         },
         {
             upsert:true
         }
        );

    }



};

