(function () {
    angular.
        module("WebAppMaker")
        .controller("ProfileController",profileController) ;

    function profileController($routeParams,UserService,$location) {
        var vm=this;
        vm.updateUser=updateUser;
        var userId=$routeParams['uid'];
        vm.deleteUser=deleteUser;

        
        function init() {
            var promise=UserService.findUserById(userId);
            console.log(promise);
            promise.success(function (user) {
                vm.user=user;
            });

        }

        init();


        function updateUser(newUser)
        {
            var promise=UserService.updateUser(userId,newUser);
            promise.success(function (user) {
                if(user!= null)
                {
                    vm.message="User updated successfully";
                }
                else
                {
                    vm.error="Unable to update the user";
                }
                });

        }


        function deleteUser(userId)
        {
            var promise=UserService.deleteUser(userId);
            promise.success(function (users) {

                    $location.url("/");
            });

        }

        function findUserByUsername(user) {

            var uname=UserService.findUserByUsername(user.username);
            if(uname!= null)
            {
                vm.message="User found";
            }
            else
            {
                vm.error="Unable to find the user";
            }

        }
    }


})();
