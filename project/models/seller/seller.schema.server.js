module.exports = function () {

    var mongoose=require('mongoose');

    var SellerSchema=mongoose.Schema(
        {

            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'BookUserModel'},
            bookId: {type: String},
            price: {type: String},
            comments: {type: String},
            condition: {type: String},
            rating: {type: String},
            title:{type:String},
            sellerusername:{type:String},
            sellerfirstname:{type:String},
            sellerlastname:{type:String},
            modeOfTrans: {type: String},
            dateCreated: {type: Date, default: Date.now}
        });
    return SellerSchema;

};