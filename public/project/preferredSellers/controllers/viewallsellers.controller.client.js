(function () {
    angular
        .module("BookLook")
        .controller("ViewAllSellersController", ViewAllSellersController);

    function ViewAllSellersController($location,UserService,SellerBookService,BuyerService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.makePreferred=makePreferred;

        vm.logout=logout;

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }



        function init() {

            var promise= SellerBookService.getAllSellers(vm.userId);
            promise.success(
                function (sellers) {
                    console.log("inside controller" + sellers);
                    vm.sellers = sellers;
                    console.log(vm.sellers);
                });
            promise=BuyerService.getPreferredSellers(vm.userId);
                promise.then(
                    function (ps) {
                        vm.preferredsellers=ps.data[0].preferredSellers;
                        console.log(vm.preferredsellers);
                    });



                    // $location.url("/user/" + vm.userId + "/viewLibrary");
        }init();


        function makePreferred(sellerId) {
            var sid=JSON.stringify(sellerId);
            var id=JSON.stringify(vm.userId);

            console.log(sid);

            var promise=BuyerService.makePreferred(sellerId,vm.userId);
            promise.then(
                function (values) {
                    // console.log("mkpref"+values);

                    location.reload();
                    $location.url("/user/userId/viewAllSellers");
                }

            )

        }

    }
})();

