(function () {
    angular
        .module("BookLook")
        .factory("OrdersService", OrdersService);

    function OrdersService($http) {
        var api = {
            "viewOrders": viewOrders
        };
        return api;

        function viewOrders(userId) {
            return $http.get("/api/user/"+userId+"/viewAllOrders");
        }

    }
})();