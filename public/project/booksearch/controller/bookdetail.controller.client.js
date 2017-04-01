(function () {
    angular
        .module("BookLook")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController($location, $routeParams, GoogleBookService,UserService) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.bookId=$routeParams.bid;
        vm.addToLibrary=addToLibrary;
        // vm.searchBook=searchBook;
        // vm.viewDetails=viewDetails;

        function init() {

            GoogleBookService.getDetailsOfOneBook(vm.bookId)
                .then(function (response) {
                    var data=response.data;
                    console.log(data);
                    // data=JSON.stringify(data);
                    vm.selected=data;
                })}init();


        function addToLibrary(book) {
            UserService.addToLibrary(book,vm.userId,vm.bookId).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/search/" + vm.bookId);
                }
            );
        }
        //
        // function viewDetails(booki,bookId) {
        //
        //     GoogleBookService.getDetailsOfOneBook(booki.selfLink)
        //         .then(function (response) {
        //             var data=response.data;
        //             console.log(data);
        //             // data=JSON.stringify(data);
        //             vm.selected=data;
        //             vm.link=booki.selfLink;
        //             // $location.url("/user/" + vm.userId + "/search/" + bookId);
        //
        //         });
        //
        // }
        //
        //
        // function searchBook(searchTerm) {
        //     console.log("inside search book");
        //     GoogleBookService
        //         .searchBook(searchTerm)
        //         .then(function(response) {
        //             console.log(response.data);
        //             var data = response.data;
        //             // data = data.substring(0,data.length - 1);
        //             // data = JSON.parse(data);
        //             vm.book = data.items;
        //         });
        // }




        // function selectPhoto(photo) {
        //     var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //     url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //     var newWidget={};
        //     newWidget.url = url;
        //     newWidget.type = "IMAGE";
        //     newWidget._page=vm.pageId;
        //     WidgetService
        //         .updateWidget(vm.widgetId,newWidget)
        //         .then(function(widget){
        //             $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        //         });
        // }


    }
})();