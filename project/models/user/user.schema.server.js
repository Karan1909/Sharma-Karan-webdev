module.exports = function () {


    var mongoose=require('mongoose');

    var BookUserSchema=mongoose.Schema(
        {
            username: {type: String},
            password: {type: String},
            firstName: {type: String},
            lastName: {type: String},
            email: {type: String},
            phone: {type: String},
            gender: {type: String},
            address: {type: String},
            dateOfBirth: {type: String},
            placeOfResidence: {type: String},
            phoneNumber:{type:String},
            imageWidget:{
              "url":{type: String}, "width":{type:String}},
            url:{type:String},
            library:{type:Array, "default":[]},
            dateCreated: {type: Date, default: Date.now}
        });
    return BookUserSchema;

};