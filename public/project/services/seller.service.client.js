(function () {
    angular
        .module("BookLook")
        .factory("SellerBookService", SellerBookService);

    function SellerBookService($http) {
        var api = {
            "sellBook": sellBook,
            "getAllSellers":getAllSellers,
            "isSelling":isSelling
        };
        return api;


        function isSelling(bookId,userId) {

            return $http.get("/api/user/"+userId+"/getAllSellers/"+bookId+"/isSelling");
        }
        function getAllSellers(userId) {
            return $http.get("/api/user/"+userId+"/getAllSellers");
        }

        function sellBook(sellingBook,userId,bookId) {
            return $http.post("/api/user/userId/viewLibrary/"+bookId,sellingBook);
        }


    }
})();