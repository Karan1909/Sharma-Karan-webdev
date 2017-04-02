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


        function addToLibrary(bookId,title,userId) {

            var bookEntry={};
            bookEntry={
                "bookId":bookId,
                "title":title
            };
            // var bId=bookId.toString();
            // var tit=title.toString();
            var promise=UserService.addToLibrary(bookEntry,bookId,userId);
            promise.success(
                function (user) {
                    if(user)
                    {
                        $location.url("/user/" + vm.userId + "/search/" );
                    }
                    else
                    {

                    }

                }
            );
        }


    }
})();