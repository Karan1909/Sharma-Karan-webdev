(function () {
        angular
            .module("BookLook")
            .controller("ViewBookToBuyController", ViewBookToBuyController);

        function ViewBookToBuyController($location, $routeParams, GoogleBookService, BuyerService) { // should add userservice

            var vm=this;
            vm.sellerId = $routeParams.sid;
            vm.userId = $routeParams.uid;
            vm.bookId = $routeParams.bid;
            vm.buyBook=buyBook;
            vm.preferredSeller=preferredSeller;


            function preferredSeller(sellerId) {
                var promise=BuyerService.preferredSeller(vm.sellerId,vm.userId)
                    promise.then(
                        function (response,err) {
                            if(response) {
                                vm.message = "Added as a preferred seller";
                            }
                            else
                            {
                                vm.message="Could not as a preffered seller.";
                            }
                        }
                    )
            }


            function init() {
                var element=GoogleBookService.getElement();
                GoogleBookService.getDetailsOfOneBook(vm.bookId)
                    .then(function (response) {
                        var data = response.data;
                        console.log(data);
                        // data=JSON.stringify(data);
                        vm.selected = data;
                        vm.element=element;
                        console.log(element);

                    })
            }init();

            function buyBook(bookId,title,userId,condition,price,comments,username,firstName,lastName) {
                var orderBook={
                    "sellerID":vm.sellerId,
                    "bookId":bookId,
                    "price":price,
                    "comments":comments,
                    "condition":condition,
                    "title":title,
                    "sellerUserName":username,
                    "sellerFirstName":firstName,
                    "sellerLastName":lastName
                };

                var promise=BuyerService.buyBook(orderBook,userId,bookId,vm.sellerId);
                promise.success(
                    function (orderBook) {
                          BuyerService.removeFromSeller(userId,bookId,vm.sellerId);
                        $location.url("/user/" + vm.userId + "/search/" + bookId);
                    }
                );




            }


        }
    }

)();