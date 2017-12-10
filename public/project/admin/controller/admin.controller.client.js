(function () {
    angular
        .module("BookLook")
        .controller("AdminController", AdminController);

    function AdminController($location, $routeParams, GoogleBookService,UserService,$rootScope,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.viewUser=viewUser;
        vm.deleteUser=deleteUser;
        vm.logout=logout;
        vm.createUser=createUser;
        vm.updateLibrary=updateLibrary;



        function updateLibrary(someuserId)
        {
            $location.url("/admin/"+someuserId+"/viewLibrary");
            // var promise= UserService.getBooksFromLibrary(vm.userId);
            // promise.success(
            //     function (user) {
            //         console.log("inside controller"+user.library);
            //         if(user.library.length!=0)
            //         {
            //             vm.books=user.library;
            //         }
            //         else
            //         {
            //             vm.error="You don't have any books in the library.Add books in library for faster access";
            //         }
            //
            //         // $location.url("/user/" + vm.userId + "/viewLibrary");
            //     });


        }


        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }


        function createUser() {
            $location.url("/user/admin/createUser");
        }



        function init() {

            console.log("inside admint page controller");

            UserService.findAllUsers().then(renderUsers);

        }init();
            
        function renderUsers(users) {
            vm.users=users.data;
            console.log(vm.users);
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .then(
                    function () {
                        location.reload();
                    }
                );

        }

        function viewUser(userId) {
            $location.url("/admin/viewUser/"+userId);
        }




    }
})();