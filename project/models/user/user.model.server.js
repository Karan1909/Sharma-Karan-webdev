module.exports = function () {
    var model={};
    var mongoose=require('mongoose');
    var BookUserSchema=require("./user.schema.server.js")();
    var BookUserModel=mongoose.model('BookUserModel',BookUserSchema);// unique identifier model will allow us to manipulate objects that

    var api={
        "findUserByCredentials": findUserByCredentials,
        "findUserById": findUserById,
        "updateUser":updateUser,
        "deleteUser":deleteUser,
        "createUser":createUser,
        "findUserByUsername": findUserByUsername,
        "updateImage": updateImage,
        "addToLibrary":addToLibrary,
        "getBooksFromLibrary":getBooksFromLibrary,
        "setModel":setModel

    };
    return api;

    function setModel(_model) {
        model=_model;
    }

    function getBooksFromLibrary(userId) {
        return BookUserModel.find(
            {
                _id:userId
            },
            {
                library:1
            }
        );
    }

    function updateImage(uid,widgetS) {
        return BookUserModel.update(
            {
                _id: uid
            },
            {
                imageWidget:widgetS
            });

    }

    function addToLibrary(book,userId) {
        return BookUserModel.update(
            {
                _id:userId
            },
        {
            "$push":{
                "library":book
            }
        }
        );

    }

    function deleteUser(userId) {

        return BookUserModel
            .remove({_id: userId});

    }

    function createUser(newUser) {
        console.log("in db createuser"+newUser.type);
        console.log("in db createuser"+newUser.username);
        return BookUserModel.create(newUser);

    }


    function findUserByUsername(username) {

        console.log("its my"+username);

        return BookUserModel.findOne({username: username},
            function(err, result) {
                if (err) { /* handle err */ }

                if (result) {
                    console.log("result"+result);
                    return result;
                } else {
                    return err;
                }
            });



    }
    function updateUser(userId,newUser) {

        return BookUserModel.update(
            {
                _id: userId
            },
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                address:newUser.address,
                gender:newUser.gender,
                placeOfResidence:newUser.placeOfResidence,
                dateOfBirth:newUser.dateOfBirth,
                email:newUser.email,
                phoneNumber:newUser.phoneNumber

            });

    }

    function findUserById(userId)
    {
        return BookUserModel.findById(userId);

    }
    function findUserByCredentials(username, password) {

        //res is the object used to genenrate the response
        //req represents everything coming from client

        console.log("Get the user by credentials");
        return BookUserModel
            .findOne(
                {
                    username:username,
                    password:password
                }
            );

    }


};