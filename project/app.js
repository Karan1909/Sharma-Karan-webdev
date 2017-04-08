module.exports = function (app) {
    var model = require("././models/models.server")();
    require("./services/user.service.server")(app,model);
    require("./services/seller.service.server")(app,model);
    require("./services/buyer.service.server")(app,model);
    // require("./services/website.service.server")(app,model);
    // require("./services/page.service.server")(app,model);
    // require("./services/widget.service.server")(app,model);

};
