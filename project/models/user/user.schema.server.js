module.exports = function () {


    var mongoose=require('mongoose');

    var BookUserSchema=mongoose.Schema(
        {
            username: {type: String ,required:true},
            password: {type: String , required :true},
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
            library:[{type: mongoose.Schema.Types.ObjectId, ref: 'BookModel'}],
            // library:{type:Array, "default":[]},
            dateCreated: {type: Date, default: Date.now},
            googleId:{type:String},
            role:{type: String, enum:['SELLER','BUYER','ADMIN','USER'], default:'USER'}

        });
    return BookUserSchema;

};