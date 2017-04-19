(function () {
    angular
        .module("BookLook")
        .controller("GoogleBookSearchController", GoogleBookSearchController);

    function GoogleBookSearchController($location, $routeParams, GoogleBookService,UserService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.searchBook=searchBook;
        vm.viewDetails=viewDetails;
        vm.viewSellers=viewSellers;
        vm.logout=logout;

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }


        function viewSellers(bookId) {
            $location.url("/user/userId/buyBooks/" + bookId);
            // var promise=GoogleBookService.viewSellers(vm.userId,bookId);
            // promise.success(
            //     function (values) {
            //         var data=values;
            //         vm.sellers=data;
            //         vm.jss=angular.toJson(data);
            //         console.log(vm.sellers);

                // }



        }

        function viewDetails(bookId) {

            $location.url("/user/userId/search/" + bookId);

        }


        function searchBook(searchTerm) {
            console.log("inside search book");
            GoogleBookService
                .searchBook(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    var data = response.data;
                    vm.book = data.items;
                });
        }




        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget={};
            newWidget.url = url;
            newWidget.type = "IMAGE";
            newWidget._page=vm.pageId;
            WidgetService
                .updateWidget(vm.widgetId,newWidget)
                .then(function(widget){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }


    }
})();