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
        "getImageLinkForUser":getImageLinkForUser,
        "findUserByIdUsingObjects":findUserByIdUsingObjects,
        "findUserByGoogleId":findUserByGoogleId,
        "createThroughGoogleUser":createThroughGoogleUser,
        "updateUserByAdmin":updateUserByAdmin,
        "setModel":setModel,
        "findAllUsers":findAllUsers



    };
    return api;



    function updateUserByAdmin(userId,user) {
        return BookUserModel.update(
            {
                _id:userId
            },
            {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "phone": user.phone,
                "gender": user.gender,
                "address": user.address,
                "dateOfBirth": user.dateOfBirth,
                "placeOfResidence": user.placeOfResidence,
                "phoneNumber":user.phoneNumber,
                "role":user.role,
                imageWidget:{
                    "url":user.imageWidget.url}

            }
        )

    }

    function findAllUsers() {
        return BookUserModel.find();
    }


    var q=require('q');
    function setModel(_model) {
        model=_model;
    }


    function findUserByGoogleId(profileId) {
        return BookUserModel.findOne(
            {
                "googleId":profileId
            }
        );
    }


    function createThroughGoogleUser(googleUser) {
        return BookUserModel.create(
            {
                "username":googleUser.username,
                "firstName":googleUser.firstName,
                "lastName":googleUser.lastName,
                "email":googleUser.email,
                "googleId":googleUser.google.id
            }
        );
    }


    function findUserByIdUsingObjects(userId) {
        var objectId = mongoose.Types.ObjectId(userId);
        console.log("finduserByID"+objectId);
        return BookUserModel.find(
            {
                _id:objectId
            }
        );
    }
    
    function getImageLinkForUser(userId,uIds) {
        var arrayOfLinks=[];
        console.log("print array"+uIds[0]);
        for(var i=0;i<uIds.length;i++)
        {
            console.log("in db"+uIds[i]);
            arrayOfLinks[i]=BookUserModel.find(
                {
                    _id:uIds[i]
                },
                {
                    imageWidget:1
                }
            )
        }
        return arrayOfLinks;

    }
    function getBooksFromLibrary(userId) {

        console.log("inside model getbookfromlib"+userId);
        return BookUserModel
            .findOne({_id:userId})
            .populate('library')
            .exec(function(err, element){
              if(err)
              {
                  console.log("err"+err);
                  return err;
              }
              else
              {
                  console.log("element"+err);
                  return element;
              }
            });
        // return BookUserModel.find(
        //     {
        //         _id:userId
        //     },
        //     {
        //         library:1
        //     }
        // );
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

    function addToLibrary(bookId,userId) {
        console.log("add to lib mongo"+userId);
        return BookUserModel.update(
            {
                _id:userId
            },
        {
            "$push":{
                "library":bookId
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