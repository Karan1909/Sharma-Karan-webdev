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
            var user=UserService.findUserById(userId);
            vm.user=user;
        }

        init();


        function updateUser(newUser)
        {

            var user=UserService.updateUser(userId,newUser);
            if(user!= null)
            {
                    vm.message="User updated successfully";
            }
            else
            {
                vm.error="Unable to update the user";
            }

        }


        function deleteUser(userId)
        {

            UserService.deleteUser(userId);
            $location.url("/");

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
