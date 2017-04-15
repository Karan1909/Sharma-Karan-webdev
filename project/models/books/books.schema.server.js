module.exports = function () {

    var mongoose=require('mongoose');

    var BookSchema = mongoose.Schema(
        {
            bookId: {type: String},
            title:{type: String},
            publisher:{type:String},
            dateCreated: {type: Date, default: Date.now}
        });
    return BookSchema;

};