module.exports = function () {


    var model={};
    var mongoose=require('mongoose');
    var PageSchema=require("./page.schema.server")();
    var PageModel=mongoose.model('PageModel',PageSchema);// unique identifier model will allow us to manipulate objects that

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
        "setModel":setModel
    };
    return api;

    function setModel(_model) {
        model=_model;
    }

    function deletePage(pid) {

        return PageModel
            .remove({_id: pid});


    }


    function findAllPagesForWebsite(websiteId) {
        console.log("in page for website");

        return PageModel.find({_website:websiteId},
            function(err, result) {
                if (err) { /* handle err */ }

                if (result) {
                    return result;
                } else {
                    return err;
                }
            });


    }


    function updatePage(pageId,page) {
            return PageModel.update(
            {
                _id: pageId
            },
            {
                name :page.name,
                title:page.title
            });
    }

    function createPage(websiteId,page) {

        page._website=websiteId;
        return PageModel
            .create(page);

    }

    function findPageById(pageId) {


        return PageModel.findById({_id:pageId},
            function(err, result) {
                if (err) { /* handle err */ }

                if (result) {
                    console.log(result);
                    return result;
                } else {
                    return err;
                }
            });

    }


};