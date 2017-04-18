(function () {
    angular
        .module("BookLook")
        .controller("HomePageViewController", HomePageViewController);

    function HomePageViewController($location, $routeParams, GoogleBookService,SellerBookService) { // should add userservice
        var vm = this;
        // vm.userId = someName._id;
        vm.searchBook=searchBook;
        vm.viewDetails=viewDetails;
        vm.viewSellers=viewSellers;
        // vm.sellBook=sellBook;



        // vm.sell={
        //     "userId":String,
        //     "bookId":String,
        //     "price":String,
        //     "comments":String,
        //     "condition":String
        // };

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

            $location.url("/home/search/" + bookId);

        }


        function searchBook(searchTerm) {
            console.log("inside search book"+searchTerm);
            GoogleBookService
                .searchBook(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    var data = response.data;
                    vm.book = data.items;
                    console.log(vm.book);
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