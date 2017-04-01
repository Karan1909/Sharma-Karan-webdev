module.exports = function () {
    var bookuserModel= require("./user/user.model.server.js")();

    var model={
        BookUserModel: bookuserModel
        // OTHER MODELS TO ADD

    };

    bookuserModel.setModel(model);
    // OTHER MODELS TO ADD
    return model;

    // require("./services/website.service.server")(app);
    // require("./services/website.service.server")(app);
    // require("./services/widget.service.server")(app);
};

