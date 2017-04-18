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

        var userId=vm.userId;
        function removeFromLibrary(bookId,userId) {
            UserService.removeFromLibrary(
                bookId,userId
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
                        vm.books=user.library;
                        // $location.url("/user/" + vm.userId + "/viewLibrary");
                    }
                )}init();

    }
})();