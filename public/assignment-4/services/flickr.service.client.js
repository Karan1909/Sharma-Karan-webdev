(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhoto": searchPhoto
        };
        return api;

        function searchPhoto(searchTerm) {
            var key = "938684e779eb69faaff1ce187ea0eced";
            var secret = "7289bc32580dea1a";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();