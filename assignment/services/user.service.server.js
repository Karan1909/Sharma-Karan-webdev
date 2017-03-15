module.exports = function (app,model) {
    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);
    app.get("/api/user/:userId",findUserById); // userId is the path paraameter
    app.put("/api/user/:userId",updateUser); // userId is the path paraameter

    // var users=
    //     [
    //         {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@hotmail.com" },
    //         {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",email:"bob@hotmail.com"  },
    //         {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"garcia@hotmail.com"  },
    //         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@hotmail.com"}
    //     ];


    function deleteUser(req,res) {
        var userId=req.params.userId;

        model.userModel.deleteUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }
    function findUser(req,res) {

        var username=req.query.username;
        var password=req.query.password;

        if(username && password)
        {
            findUserByCredentials(req,res);

        }
        else if(username)
        {
            findUserByUsername(req,res);

        }


    }


    function createUser(req, res) {

        var newUser=req.body;
        newUser.firstName="New User";
        newUser.lastName="New User lastname";
        model.userModel
            .createUser(newUser)
            .then(function(newUser){
                res.json(newUser);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }

    function findUserByUsername(req,res) {
        var username=req.query.username;
        model.userModel
            .findUserByUsername(username)
            .then(function(user,err){
                if(user)
                {
                    console.log("in this succ"+user);
                    res.json(user);
                }
                else
                {
                    console.log("in this fail"+err);
                    res.sendStatus(400).send(err);
                }

            });

    }
    function updateUser(req,res) {

        var userId=req.params.userId;
        var newUser=req.body;
        model.userModel
            .updateUser(userId,newUser)
            .then(function(status){
                res.json(newUser);
            });
    }

    function findUserById(req, res)
    {
        var userId=req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            });

    }
    function findUserByCredentials(req, res) {

        //res is the object used to genenrate the response
        //req represents everything coming from client

        var username=req.query.username;
        var password=req.query.password;

        console.log("Get the user by credentials");
        model.userModel
            .findUserByCredentials(username,password).then(
                function (user) {
                    res.json(user);
                },function (err) {
                    res.send(err);
            }
        );}
};