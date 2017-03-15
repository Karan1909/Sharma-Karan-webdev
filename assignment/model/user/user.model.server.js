module.exports = function () {

    // app.get("/api/user",findUser);
    // app.post("/api/user",createUser);
    // app.delete("/api/user/:userId",deleteUser);
    // app.get("/api/user/:userId",findUserById); // userId is the path paraameter
    // app.put("/api/user/:userId",updateUser); // userId is the path paraameter
    var model={};
    var mongoose=require('mongoose');
    var UserSchema=require("./user.schema.server")();
    var UserModel=mongoose.model('UserModel',UserSchema);// unique identifier model will allow us to manipulate objects that

    var api={
        "findUserByCredentials": findUserByCredentials,
        "findUserById": findUserById,
        "updateUser":updateUser,
        "deleteUser":deleteUser,
        "createUser":createUser,
        "findUserByUsername": findUserByUsername,
        "setModel":setModel

    };
    return api;

    function setModel(_model) {
        model=_model;
    }


    function deleteUser(userId) {

         return UserModel
            .remove({_id: userId});

    }

    function createUser(newUser) {
       return UserModel
            .create(newUser);

    }


    function findUserByUsername(username) {

        console.log(username);

            return UserModel.findOne({username: username},
                function(err, result) {
                    if (err) { /* handle err */ }

                    if (result) {
                        return result;
                    } else {
                        return err;
                    }
                });

        // if(user)
        // {
        //     console.log("usermila");
        //     return error;
        // }
        // else
        // {
        //     return user;
        // }

    }
    function updateUser(userId,newUser) {

        return UserModel.update(
            {
                _id: userId
            },
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            });

    }

    function findUserById(userId)
    {
        return UserModel.findById(userId);

    }
    function findUserByCredentials(username, password) {

        //res is the object used to genenrate the response
        //req represents everything coming from client

        console.log("Get the user by credentials");
        return UserModel
            .findOne(
                {
                    username:username,
                    password:password
                }
            );

    }


};