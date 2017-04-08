(function () {
    angular.module("BookLook").controller("OrdersController", OrdersController);

    function OrdersController(OrdersService, $routeParams) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
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