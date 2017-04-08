(function () {
    angular
        .module("BookLook")
        .controller("ViewAllSellersController", ViewAllSellersController);

    function ViewAllSellersController($location, $routeParams,SellerBookService) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
        // vm.searchBook=searchBook;
        // vm.viewDetails=viewDetails;

        // function viewDetails(bookId) {
        //
        //     $location.url("/user/" + vm.userId + "/viewLibrary/" + bookId);
        //
        // }

        function init() {

            var promise= SellerBookService.getAllSellers(vm.userId);
            promise.success(
                function (sellers) {
                    console.log("inside controller"+sellers);
                    vm.sellers=sellers;
                    console.log(vm.sellers);
                    // $location.url("/user/" + vm.userId + "/viewLibrary");
                }
            )}init();

    }
})();

