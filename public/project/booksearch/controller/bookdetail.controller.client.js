(function () {
    angular
        .module("BookLook")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController($location, $routeParams, GoogleBookService,UserService,SellerBookService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.bookId=$routeParams.bid;
        vm.addToLibrary=addToLibrary;
        // vm.searchBook=searchBook;
        vm.sellBook=sellBook;
        vm.logout=logout;

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }






        function sellBook(bookId,title,userId,condition,price,comments,susername,sfirstname,slastname) {

            var sellingBook={
                "bookId":bookId,
                "title":title,
                "userId":userId,
                "condition":condition,
                "price":price,
                "comments":comments,
                "sellerusername":susername,
                "sellerfirstname":sfirstname,
                "sellerlastname":slastname

            };
            var promise=SellerBookService.sellBook(sellingBook,userId,bookId);
            promise.success(
                function (sellingBook) {

                    $location.url("/user/userId/viewLibrary/");
                }
            );
        }




        function init() {


            var promise=UserService.findUserById(vm.userId);
            promise.success(
                function (user) {
                    console.log("User values "+user);
                    vm.user=user;
                });

            GoogleBookService.getDetailsOfOneBook(vm.bookId)
                .then(function (response) {
                    var data=response.data;
                    console.log(data);
                    // data=JSON.stringify(data);
                    vm.selected=data;
                });
            vm.answer=true;

            // SellerBookService.isSelling(vm.bookId,vm.userId)
            //     .then(
            //         function (response) {
            //             if(response)
            //             {
            //                 vm.answer=false;
            //             }
            //             else
            //             {
            //                 vm.answer=true;
            //             }
            //
            //         }
            //     );

            console.log("value is "+Boolean(vm.answer));
                }init();


        function addToLibrary(bookId,title,userId,publisher,imgUrl) {

            // model.bookId,model.selected.volumeInfo.title,model.userId,model.selected.volumeInfo.publisher
            var bookEntry={};
            console.log("img url"+imgUrl);
            bookEntry={
                "bookId":bookId,
                "title":title,
                "publisher":publisher,
                "url":imgUrl
            };
            var promise=UserService.addToLibrary(bookEntry,bookId,userId);
            promise.success(
                function (user) {
                    if(user)
                    {
                        $location.url("/user/userId/viewLibrary/" );
                    }
                    else
                    {

                    }

                }
            );
        }


    }
})();