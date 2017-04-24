(function () {
    angular
        .module("BookLook")
        .controller("AdminAddUserController", AdminAddUserController);

    function AdminAddUserController($location, $routeParams, GoogleBookService,UserService,$rootScope,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        // vm.viewUser=viewUser;
        vm.logout=logout;
        vm.addUser=addUser;

        function addUser(username,password,dateOfBirth,gender,firstName,lastName) {

            vm.firstNameError="";
            vm.lastNameError="";
            vm.usernameError="";
            vm.passwordError="";


            if(firstName==" "||firstName=="" ||firstName==null)
            {
                vm.firstNameError="FirstName cannot be null";
            }
            else if(lastName==" "||lastName=="" ||lastName==null)
            {
                vm.lastNameError="LastName cannot be null";
            }
            else if(username==" "||username=="" ||username==null)
            {
                vm.usernameError="Username cannot be null";
            }
            else if(password==" "||password=="" ||password==null)
            {
                vm.passwordError="Password cannot be null";
            }
            else
            {
                var user={
                    "username":username,
                    "password":password,
                    "dateOfBirth":dateOfBirth,
                    "gender":gender,
                    "firstName":firstName,
                    "lastName":lastName
                };
                var promise=UserService.addUserByAdmin(user);
                promise.success(
                    function (user) {

                        vm.user=user;
                        $location.url("/admin");


                    }
                ).error(
                    function(){
                        vm.error="Username already exists";
                        console.log("Username already exists");
                    });

            }



        }

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }





        function init() {

            console.log("inside admint page controller");

            UserService.findAllUsers().then(renderUsers);

        }init();

        function renderUsers(users) {
            vm.users=users.data;
            console.log(vm.users);
        }

    }
})();