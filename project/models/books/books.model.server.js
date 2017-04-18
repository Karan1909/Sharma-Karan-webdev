module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var BookSchema = require("./books.schema.server")();
    var BookModel = mongoose.model('BookModel', BookSchema);

    var api = {
        "findBookPresentLibrary": findBookPresentLibrary,
        "setModel": setModel,
        "addToLibrary":addToLibrary,
        "getIdFromGoogleBookId":getIdFromGoogleBookId

    };
    return api;


    function getIdFromGoogleBookId(bookId) {
        return BookModel.findOne(
            {
                bookId:bookId
            },
            {
                _id:1
            }
        );

    }

    function findBookPresentLibrary(bookEntry,userId) {
        var googleBookId=bookEntry.bookId;
        return BookModel.findOne(
            {
                "bookId":googleBookId
            },
            function(err, result) {
                if (err) { /* handle err */ }
                if (result) {
                    console.log("result"+result);
                    return result;
                } else {
                    console.log("fbpil "+err);
                    return err;
                }
            }
        );

    }





    function setModel(_model) {
        model = _model;
    }


    function addToLibrary(bookEntry,userId) {

        var googleBookId=bookEntry.bookId;
        var title=bookEntry.title;
        var publisher=bookEntry.publisher;
        var url=bookEntry.url;

        console.log("url is "+bookEntry.url);

        // bookId: {type: String},
        // title:{type: String},
        // publisher:{type:String},
        // dateCreated: {type: Date, default: Date.now}

        return BookModel.create(
            {
                "bookId": googleBookId,
                "title":title,
                "publisher":publisher,
                "url":url
            });


    }


};

