(function () {
    angular
        .module("BookLook")
        .controller("AdminUserViewController", AdminUserViewController);

    function AdminUserViewController($location, $routeParams, $rootScope,UserService,SellerBookService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.profilerId=$routeParams.uid;
        vm.adminupdateUser=adminupdateUser;

        vm.logout=logout;

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }




        function adminupdateUser(user)
        {

                    var promise=UserService.adminupdateUser(vm.profilerId,user);
                    promise.success(function (user) {
                        if(user!= null)
                        {
                            vm.message="User updated successfully";
                        }
                        else
                        {
                            console.log(vm.error);
                            vm.error="Unable to update the user";
                        }
                    });
                }


        function init() {

            console.log("userId in viewUserController"+vm.profilerId);
            UserService.findByIdUser(vm.profilerId)
                .then(
                    function (user) {
                        vm.user = user.data;
                    }
                );
        }

        init();
    }
})();


