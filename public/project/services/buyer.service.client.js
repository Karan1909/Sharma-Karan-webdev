/**
 * Created by kkara on 3/31/2017.
 */
(function () {
    angular
        .module("BookLook")
        .factory("BuyerService", BuyerService);

    function BuyerService($http) {
        var api = {
            "buyBook": buyBook,
            "removeFromSeller":removeFromSeller,
            "preferredSeller":preferredSeller

        };
        return api;

        function preferredSeller(sellerId,userId) {
            var isellerId=sellerId.toString();
            var iuserId=userId.toString();
            console.log("inside service sellr "+sellerId);
            console.log("inside serive"+userId);
            return $http.put("/api/user/addPreferredSeller/"+sellerId,userId);

        }

        function buyBook(orderBook,userId,bookId,sellerId) {
            return $http.post("/api/user/"+userId+"/buyBooks/"+bookId+"/"+sellerId,orderBook);
        }

        function removeFromSeller(userId,bookId,sellerId) {
            return $http.delete("/api/user/"+userId+"/buyBooks/"+bookId+"/"+sellerId);
        }

    }
})();