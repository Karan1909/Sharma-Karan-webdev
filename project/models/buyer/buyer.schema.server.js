module.exports = function () {

    var mongoose=require('mongoose');

    var BuyerSchema = mongoose.Schema(
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'BookUserModel'},
            orders:{type:Array, "default":[]},
            preferredSellers:{type:Array, "default":[]},
            dateCreated: {type: Date, default: Date.now}
        });
    return BuyerSchema;

};