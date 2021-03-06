(function () {
        angular
            .module("WebAppMaker")
            .factory("UserService",userService);

        function userService() {
            var users=
                [
                    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice@hotmail.com" },
                    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",email:"bob@hotmail.com"  },
                    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"garcia@hotmail.com"  },
                    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jose@hotmail.com"}
                ];

            var api={
                "findUserByCredentials": findUserByCredentials,
                "findUserById": findUserById,
                "updateUser":updateUser,
                "deleteUser":deleteUser,
                "createUser":createUser,
                "findUserByUsername": findUserByUsername

            };
            return api;

            function findUserByUsername(username) {
                for(var u in users)
                {
                    if(users[u].username==username)
                    {
                        console.log("hello");
                        return users[u];
                    }
                }
                return null;
            }


            function deleteUser(userId) {
                for(var w in users) {
                    if(users[w]._id === userId) {
                        users.splice(w, 1);
                    }
                }
            }
            
            
            function createUser(user) {
                user._id=(new Date()).getTime().toString();
                users.push(user);
            }

            function findUserByCredentials(username,password) {
                for(var u in users)
                {
                        if(users[u].username==username
                            && users[u].password==password)
                        {
                                    return users[u];
                        }

                }
                return null;
            }


            function updateUser(userId,newUser) {

                for(var u in users)
                {
                    if(users[u]._id==userId)
                    {
                        users[u].firstName=newUser.firstName;
                        users[u].lastName=newUser.lastName;
                        return users[u];
                    }

                }
                return null;
            }
            function findUserById(userId) {

                for(var u in users)
                {
                    if(users[u]._id==userId)
                    {
                        return users[u];
                    }

                }
                return null;
            }

        }
})();

