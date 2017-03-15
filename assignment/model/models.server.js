module.exports = function () {
   var userModel= require("./user/user.model.server.js")();
   var websiteModel= require("./website/website.model.server")();
   var pageModel= require("./page/page.model.server")();
    var widgetModel= require("./widget/widget.model.server")();

    var model={
        userModel: userModel,
        WebsiteModel:websiteModel,
        PageModel:pageModel,
        WidgetModel:widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);
    return model;

    // require("./services/website.service.server")(app);
    // require("./services/website.service.server")(app);
    // require("./services/widget.service.server")(app);
};

