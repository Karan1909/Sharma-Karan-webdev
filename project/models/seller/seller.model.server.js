module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var SellerSchema = require("./seller.schema.server")();
    var SellerModel = mongoose.model('SellerModel', SellerSchema);

    var api={
        "sellBook": sellBook,
        "setModel":setModel,
        "viewSellers":viewSellers,
        "removeFromSeller":removeFromSeller,
        "getAllSellers":getAllSellers,
        "isSelling":isSelling


    };
    return api;


    function isSelling(userId,bookId) {
        return (SellerModel.find({
            "userId": userId,
            "bookId": bookId
        }).count()>0);

        // },
        //     function(err, result) {
        //         if (err) { /* handle err */ }
        //         if (result) {
        //             console.log("result"+result);
        //             return result;
        //         } else {
        //             console.log("sime error"+err);
        //             return err;
        //         }
        //     });
    }


    function getAllSellers() {

        // return SellerModel.aggregate(
        //     {$group:{_id:"userId"}});
        //
        // }

        return SellerModel.aggregate(

        [
            { $group : { _id : "$userId", sellerusername: { $push: "$sellerusername" },
                sellerfirstname: { $push: "$sellerfirstname" },
                sellerlastname: { $push: "$sellerlastname" }
        } }
        ]);}



        // return SellerModel.distinct("sellerusername");

    function viewSellers(bkId) {

        console.log(bkId);
        return SellerModel
            .find({bookId:bkId.toString()})
            .populate('userId')
            .exec();
    }
    function setModel(_model) {
        model=_model;
    }
    function sellBook(sellingBook) {
        console.log("inside seller service model");
        return SellerModel.create(sellingBook);
    }

    function removeFromSeller(userId,bookId,sellerId) {
      console.log("inside remove of sellermodel");
     return  SellerModel.remove(
            {
                "userId":sellerId,
                "bookId":bookId
            }
        );

    }




};
