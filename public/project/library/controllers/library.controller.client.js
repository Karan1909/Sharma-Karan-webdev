(function () {
    angular
        .module("BookLook")
        .controller("LibraryController", LibraryController);

    function LibraryController($location, $routeParams,UserService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        // vm.searchBook=searchBook;
        vm.viewDetails=viewDetails;
        vm.removeFromLibrary=removeFromLibrary;
        vm.logout=logout;

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }





        var userId=vm.userId;
        function removeFromLibrary(bookId,userId) {
           var promise=UserService.removeFromLibrary(
                bookId,userId
            );
           promise.success(
               function (user) {
                    location.reload();
                    console.log("removed"+user);
               }
           );

        }

        function viewDetails(bookId) {

            $location.url("/user/userId/viewLibrary/"+bookId);

        }

        function init() {

            var promise= UserService.getBooksFromLibrary(vm.userId);
                promise.success(
                    function (user) {
                        console.log("inside controller"+user.library);
                        if(user.library.length!=0)
                        {
                            vm.books=user.library;
                        }
                        else
                        {
                            vm.error="You don't have any books in the library.Add books in library for faster access";
                        }

                        // $location.url("/user/" + vm.userId + "/viewLibrary");
                    }
                )}init();

    }
})();