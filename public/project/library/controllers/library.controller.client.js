(function () {
    angular
        .module("BookLook")
        .controller("LibraryController", LibraryController);

    function LibraryController($location, $routeParams,UserService) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
        // vm.searchBook=searchBook;
        

        function init() {

            var promise= UserService.getBooksFromLibrary(vm.userId)
                promise.success(
                    function (books) {
                        console.log("inside controller"+books);
                        vm.books=books;
                        // $location.url("/user/" + vm.userId + "/viewLibrary");
                    }
                )
                }init();

    }
})();