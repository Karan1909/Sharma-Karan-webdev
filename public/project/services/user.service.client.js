(function () {
    angular
        .module("BookLook")
        .factory("UserService",userService);

    //$http allows to interact with http services

    function userService($http) {


        var api={
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser":updateUser,
            "deleteUser":deleteUser,
            "createUser":createUser,
            "findUserByUsername": findUserByUsername,
            "addToLibrary":addToLibrary,
            "getBooksFromLibrary":getBooksFromLibrary

        };
        return api;


        function getBooksFromLibrary(userId) {
            return $http.get("/api/user/"+userId+"/viewLibrary/");
        }
        function addToLibrary(bookEntry,bookId,userId) {
            return $http.put("/api/user/"+userId+"/search/"+bookId,bookEntry);

        }
        function findUserByUsername(username) {

            return $http.get("/api/user?username="+username);

        }


        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
            // for(var w in users) {
            //     if(users[w]._id === userId) {
            //         users.splice(w, 1);
            //     }
            // }
        }


        function createUser(user) {

            return $http.post("/api/user", user);

            // user._id=(new Date()).getTime().toString();
            // users.push(user);
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/user?username="+username+"&password="+password);
            //retrieve data from the server on server will listen to this request
        }
        function updateUser(userId,newUser) {

            return  $http.put("/api/user/"+userId, newUser);
            // for(var u in users)
            // {
            //     if(users[u]._id==userId)
            //     {
            //         users[u].firstName=newUser.firstName;
            //         users[u].lastName=newUser.lastName;
            //         return users[u];
            //     }
            //
            // }
            // return null;
        }
        function findUserById(userId) {

            return $http.get("/api/user/"+userId);

            /*  for(var u in users)
             {
             if(users[u]._id==userId)
             {
             return users[u];
             }

             }
             return null;*/
        }

    }
})();

