module.exports = function () {


    var model={};
    var mongoose=require('mongoose');
    var WebsiteSchema=require("./website.schema.server")();
    var WebsiteModel=mongoose.model('WebsiteModel',WebsiteSchema);// unique identifier model will allow us to manipulate objects that

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findWebsiteById": findWebsiteById,
        "deleteWebsite": deleteWebsite,
        "updateWebsite": updateWebsite,
        "findAllWebsitesForUser":findAllWebsitesForUser,
        "setModel":setModel

    };
    return api;

    function setModel(_model) {
        model=_model;
    }


    function deleteWebsite(wid) {

        return WebsiteModel
            .remove({_id: wid});

    }

    function createWebsiteForUser(userId,website) {
        website._user=userId;
        return WebsiteModel
            .create(website);

    }


    function findAllWebsitesForUser(userId) {
        console.log('hello');
        return WebsiteModel.find({_user:userId},
            function(err, result) {
                if (err) { /* handle err */ }

                if (result) {
                    return result;
                } else {
                    return err;
                }
            });

    }


    function updateWebsite(wid,website) {
        console.log(wid);
        console.log(website._user);

        return WebsiteModel.update(
            {
                _id: wid
            },
            {
                name :website.name,
                description:website.description
            });

}

    function findWebsiteById(wid) {

        return WebsiteModel.findById(wid);

    }


};