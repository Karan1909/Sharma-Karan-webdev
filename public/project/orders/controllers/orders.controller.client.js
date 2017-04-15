(function () {
    angular.module("BookLook").controller("OrdersController", OrdersController);

    function OrdersController(OrdersService, $routeParams,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        // vm.searchBook=searchBook;
        console.log("insdie");


        function init() {

            var promise=OrdersService.viewOrders(vm.userId);
            promise.success(
                function (orders) {
                    vm.orders=orders['0'].orders;
                    console.log(vm.orders);

                }
            )}init();

    }
})();