module.exports = function () {


    var mongoose=require('mongoose');

    var WidgetSchema=mongoose.Schema(
        {
            _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
            name: {type: String},
            order:{type:Number, default:0},
            text: {type: String},
            placeholder: {type: String},
            description: {type: String},
            url: {type: String},
            width: {type: String},
            type: {type:String,enum :['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT' , 'TEXT']},
            height: {type: String},
            rows: {type: Number},
            size: {type: Number},
            class: {type: String},
            icon: {type: String},
            deletable: {type: Boolean},
            formatted: {type: Boolean},
            dateCreated:{type:Date,default:Date.now}
        },{collection: 'mongo.widget'});
    return WidgetSchema;

};