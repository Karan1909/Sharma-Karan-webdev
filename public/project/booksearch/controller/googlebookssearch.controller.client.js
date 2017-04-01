(function () {
    angular
        .module("BookLook")
        .controller("GoogleBookSearchController", GoogleBookSearchController);

    function GoogleBookSearchController($location, $routeParams, GoogleBookService) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searchBook=searchBook;
        vm.viewDetails=viewDetails;

        function viewDetails(bookId) {

            $location.url("/user/" + vm.userId + "/search/" + bookId);
            // GoogleBookService.getDetailsOfOneBook(booki.selfLink)
            //     .then(function (response) {
            //         var data=response.data;
            //         console.log(data);
            //         // data=JSON.stringify(data);
            //         vm.selected=data;
            //         vm.link=booki.selfLink;
            //
            //
            //         });

        }


        function searchBook(searchTerm) {
            console.log("inside search book");
            GoogleBookService
                .searchBook(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    var data = response.data;
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
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