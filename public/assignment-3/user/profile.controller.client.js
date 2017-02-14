(function () {
    angular.
        module("WebAppMaker")
        .controller("ProfileController",profileController) ;

    function profileController($routeParams,UserService) {
        var vm=this;
        vm.updateUser=updateUser;
        var userId=$routeParams['uid'];
        var user=UserService.findUserById(userId);
        vm.user=user;


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
    }


})();
