/**
 * Created by kkara on 3/31/2017.
 */
(function () {
    angular
        .module("BookLook")
        .factory("GoogleBookService", GoogleBookService);

    function GoogleBookService($http) {
        var api = {
            "searchBook": searchBook,
            "getDetailsOfOneBook":getDetailsOfOneBook,
            "viewSellers":viewSellers,
            "setElement":setElement,
            "getElement":getElement,
            "viewMyItems":viewMyItems
        };
        return api;

        var ele={};

        function setElement(element) {
            ele = element;
        }

        function getElement() {
            return ele;
        }


        function viewSellers(userId,bookId) {
            return $http.get("/api/user/userId/buyBooks/"+bookId);

        }


        function getDetailsOfOneBook(id) {

            var key = "AIzaSyCDDVqXifRQObOMN1LnWgQTgF30HLldJiU";
            var newurl="https://www.googleapis.com/books/v1/volumes/"+id;
            return $http.get(newurl);

        }


        function searchBook(searchTerm) {
            var key = "AIzaSyCDDVqXifRQObOMN1LnWgQTgF30HLldJiU";
            // var secret = "7289bc32580dea1a";
            var urlBase="https://www.googleapis.com/books/v1/volumes?q=TEXT&key=AIzaSyCDDVqXifRQObOMN1LnWgQTgF30HLldJiU";
            // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("TEXT", searchTerm);
            return $http.get(url);
        }


        function viewMyItems(userId) {
            return $http.get("/api/user/userId/soldItems",userId);
        }
    }
})();