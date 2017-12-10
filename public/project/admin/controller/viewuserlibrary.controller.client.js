(function () {
    angular
        .module("BookLook")
        .controller("AdminLibraryController", AdminLibraryController);

    function AdminLibraryController($location, $routeParams, GoogleBookService,UserService,$rootScope,someName) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.sid;
        vm.nowuserid = $routeParams.userId;
        vm.bookId = $routeParams.bookId;
        vm.removeFromLibrary = removeFromLibrary;
        vm.searchBooks = searchBooks;
        vm.searchBook = searchBook;
        vm.viewDetails = viewDetails;
        vm.addToLibrary=addToLibrary;



        function viewDetails(bookId) {

            $location.url("/admin/" + vm.nowuserid + "/search/" + bookId);

        }

        function init() {

            console.log("admin view book contr" + vm.userId);


            UserService.getBooksOfUserLibrary(vm.userId).then(
                function (thisuser) {
                    console.log("inside controller" + thisuser.data.library);
                    if (thisuser.data.library.length != 0) {
                        vm.books = thisuser.data.library;
                    }
                    else {
                        vm.error = "You don't have any books in the library.Add books in library for faster access";
                    }

                    // $location.url("/user/" + vm.userId + "/viewLibrary");
                });

            GoogleBookService.getDetailsOfOneBook(vm.bookId)
                .then(function (response) {
                    var data = response.data;
                    console.log(data);
                    // data=JSON.stringify(data);
                    vm.selected = data;
                });
            vm.answer = true;


        }

        init();

        function removeFromLibrary(bookId, userId) {
            console.log("removefromlib");
            var promise = UserService.removeFromLibrary(
                bookId, userId
            );
            promise.success(
                function (user) {
                    location.reload();
                    console.log("removed" + user);
                });

        }

        function searchBook() {
            $location.url("/admin/" + vm.userId + "/search");
        }

        function searchBooks(searchTerm) {
            console.log("inside search book");
            GoogleBookService
                .searchBook(searchTerm)
                .then(function (response) {
                    console.log(response.data);
                    var data = response.data;
                    vm.book = data.items;
                });
        }



        function addToLibrary(bookId, title, publisher, imgUrl) {

            var uid = this.nowuserid;
            // model.bookId,model.selected.volumeInfo.title,model.userId,model.selected.volumeInfo.publisher
            var bookEntry = {};
            console.log("img url" + imgUrl);
            bookEntry = {
                "bookId": bookId,
                "title": title,
                "publisher": publisher,
                "url": imgUrl
            };
            var promise = UserService.addToLibrary(bookEntry, bookId, uid);
            promise.success(
                function (user) {
                    if (user) {
                        $location.url("/admin/" + uid + "/viewLibrary/");
                    }
                    else {

                    }});
        }


    }

})();