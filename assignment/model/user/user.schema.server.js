module.exports = function () {


    var mongoose=require('mongoose');

    var UserSchema=mongoose.Schema(
        {
            username: {type: String},
            password: {type: String},
            firstName: {type: String},
            lastName: {type: String},
            email: {type: String},
            phone: {type: String},
            websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
            dateCreated: {type: Date, default: Date.now}
        });
    return UserSchema;

};