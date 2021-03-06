(function () {
    angular.
    module("BookLook")
        .controller("RegisterController",registerController) ;

    function registerController($routeParams,UserService,$location) {
        var vm=this;
        vm.createUser=createUser;

        function createUser(newUser) {
            var user=UserService.createUser(newUser);
            $location.url("/user/viewProfile");
        }

        vm.register=register;

        function register(user) {
            vm.usernameError="";
            vm.passwordError="";
            vm.password1="";

            if(user.password!=user.verifypassword)
            {
                vm.passwordError="Passwords don't match"
            }

           else if(user.password==" "||user.password==""|| user.password==null||user.verifypassword==" "||user.verifypassword==""|| user.verifypassword==null )
            {
                vm.password1="Password required"
            }

            else {
                UserService.findUserByUsername(user.username)
                    .success(
                        function (user) {
                            vm.message="This username is already taken";
                        }
                    ).error(
                    function () {
                        var promise=UserService.createUser(user);
                        promise.success(function (user) {
                            $location.url("/user/viewProfile");
                        });

                    });
            }


        }

    //     function updateUser(newUser)
    //     {
    //
    //         var user=UserService.updateUser(userId,newUser);
    //         if(user!= null)
    //         {
    //             vm.message="User updated successfully";
    //         }
    //         else
    //         {
    //             vm.error="Unable to update the user";
    //         }
    //
    //     }
    //
    //     function deleteUser(currentUser)
    //     {
    //
    //         var userArray=UserService.updateUser(userId);
    //         return userArray;
    //     }
    //
    //     function findUserByUsername(user) {
    //
    //         var uname=UserService.findUserByUsername(user.username);
    //         if(uname!= null)
    //         {
    //             vm.message="User found";
    //         }
    //         else
    //         {
    //             vm.error="Unable to find the user";
    //         }
    //
    //     }
    }


})();

