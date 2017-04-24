(function () {
    angular
        .module("BookLook")
        .factory("UserService",userService);

    //$http allows to interact with http services

    function userService($http) {


        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "addToLibrary": addToLibrary,
            "getBooksFromLibrary": getBooksFromLibrary,
            "getImageLink": getImageLink,
            "findUserByIdUsingObjects": findUserByIdUsingObjects,
            "logggedIn": logggedIn,
            "logout": logout,
            "isAdmin": isAdmin,
            "findAllUsers": findAllUsers,
            "findByIdUser": findByIdUser,
            "adminupdateUser": adminupdateUser,
            "checkBuyer":checkBuyer,
            "removeFromLibrary":removeFromLibrary,
            "checkSeller":checkSeller,
            "addUserByAdmin":addUserByAdmin


        };
        return api;





        function addUserByAdmin(user) {
            return $http.post("/api/admin/createUser",user);
        }




        function removeFromLibrary(bookId,userId) {
            var obj={
                "bookId":bookId
            };
            // var xyz=Object.values(obj.bookId);
            // console.log("xyz"+xyz);
            return $http.post("/api/user/userId/viewLibrary", obj);
        }
        function adminupdateUser(userId, newUser) {

            return $http.post("/api/admin/user/" + userId, newUser);
        }

        function findByIdUser(userId) {
            return $http.get("/api/admin/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/admin/user");
        }

        function getImageLink(uIds, userId) {
            return $http.get("/api/get/Image/user/" + userId, uIds);
        }

        function findUserByIdUsingObjects(userId) {
            return $http.get("/api/usingObjects/user/" + userId);
        }

        function getBooksFromLibrary(userId) {
            return $http.get("/api/user/userId/viewLibrary/");
        }

        function addToLibrary(bookEntry, bookId, userId) {
            return $http.put("/api/user/" + userId + "/search/" + bookId, bookEntry);

        }

        function findUserByUsername(username) {

            return $http.get("/api/user?username=" + username);

        }


        function deleteUser(userId) {
            return $http.delete("/api/admin/user/" + userId);
        }


        function createUser(user) {

            return $http.post("/api/user/createUser", user);

            // user._id=(new Date()).getTime().toString();
            // users.push(user);
        }

        function findUserByCredentials(username, password) {
            return $http.post("/api/user?username=" + username + "&password=" + password);
            //retrieve data from the server on server will listen to this request
        }

        function updateUser(userId, newUser) {

            return $http.put("/api/user/" + userId, newUser);
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

            console.log("userId" + userId);
            return $http.get("/api/user/" + userId);

        }

        function logggedIn() {
            return $http.post('/api/user/loggedin')
                .then(
                    function (response) {
                        return response.data;
                    }
                )


        }

        function logout() {
            return $http.post("/api/user/logout")
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }

        function isAdmin() {

            return $http.post('/api/user/isadmin')
                .then(
                    function (response) {
                        return response.data;
                    }
                );

        }

        function checkBuyer() {
            return $http.post('/api/user/isBuyer')
                .then(
                    function (response) {
                        return response.data;
                    }
                );

        }

        function checkSeller() {
            return $http.post('/api/user/is/Seller') .then(
                function (response) {
                    return response.data;
                }
            );

        }
    }
})();

