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
            "preferredSeller":preferredSeller,
            "getPreferredSellers":getPreferredSellers,
            "makePreferred":makePreferred

        };
        return api;


        function makePreferred(sellerId,userId) {
            // var sellId=sellerId.toString();
            // var usid=userId.toString();
           var obj={
               "userId":userId,
               "sellerId":sellerId
           }
            return $http.put("/api/user/makePreferredSeller/"+userId,obj);
        }

        function getPreferredSellers(userId) {
            return $http.get("/api/user/getPreferredSeller/"+userId);

        }

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