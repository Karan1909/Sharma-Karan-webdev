(function () {
    angular
        .module("BookLook")
        .controller("AdminController", AdminController);

    function AdminController($location, $routeParams, GoogleBookService,UserService,$rootScope,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.viewUser=viewUser;
        vm.deleteUser=deleteUser;


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