module.exports = function (app) {
    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);
    app.get("/api/user/:userId",findUserById); // userId is the path paraameter
    app.put("/api/user/:userId",updateUser); // userId is the path paraameter


    var users=
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@hotmail.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",email:"bob@hotmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"garcia@hotmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@hotmail.com"}
        ];


    function deleteUser(req,res) {
        var userId=req.params.userId;
        for(var w in users) {
            if(users[w]._id === userId) {
                users.splice(w, 1);
            }
        }
        res.json(users);

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
        newUser._id=(new Date()).getTime().toString();
        newUser.firstName="New User";
        newUser.lastName="New User lastname";
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req,res) {
        var username=req.query.username;

        var user=users.find(function (u) {
            return u.username==username;
        });

        if(user)
        {
            res.json(user);
        }
        else
        {
            res.sendStatus(404).send({message: "User not found"});
        }

    }
    function updateUser(req,res) {

        var userId=req.params.userId;
        var newUser=req.body;

        for(var u in users)
        {
            if(users[u]._id==userId)
            {
                users[u].firstName=newUser.firstName;
                users[u].lastName=newUser.lastName;
                res.json(users[u]);
                break;
            }

        }
    }

    function findUserById(req, res)
    {
        var userId=req.params.userId;
        var user=users.find(function (user) {
            return user._id==userId;

        });

        res.json(user);

    }
    function findUserByCredentials(req, res) {

        //res is the object used to genenrate the response
        //req represents everything coming from client

        var username=req.query.username;
        var password=req.query.password;


        console.log("Get the user by credentials");

        var user=users.find(function (user) {
            return user.password==password && user.username==username;
        });
        console.log(user);
        res.json(user);
    }


};