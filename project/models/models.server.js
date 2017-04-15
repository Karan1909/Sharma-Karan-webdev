module.exports = function () {
    var bookuserModel= require("./user/user.model.server.js")();
    var sellerModel= require("./seller/seller.model.server")();
    var buyerModel= require("./buyer/buyer.model.server")();
    var bookModel= require("./books/books.model.server")();

    var model={
        BookUserModel: bookuserModel,
        SellerModel:sellerModel,
        BuyerModel:buyerModel,
        BookModel:bookModel
        // OTHER MODELS TO ADD

    };

    bookuserModel.setModel(model);
    sellerModel.setModel(model);
    buyerModel.setModel(model);
    bookModel.setModel(model);
    // OTHER MODELS TO ADD
    return model;

};

