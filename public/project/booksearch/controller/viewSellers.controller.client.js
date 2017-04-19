(function () {
    angular
        .module("BookLook")
        .controller("ViewSellersController", ViewSellersController);

    function ViewSellersController($location, $routeParams, GoogleBookService,BuyerService,someName) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.bookId=$routeParams.bid;
        var uIds=[];
        vm.viewSeller=viewSeller;
        // vm.isPresent=isPresent;
        function init() {
            GoogleBookService
                .viewSellers(vm.userId,vm.bookId)
                .then(
                    function (response) {
                        if(response.data.length==0)
                        {
                            vm.message="It seems no booklords selling are selling this book :( ";

                        }
                        else {
                            vm.sellers = response.data;
                            console.log(vm.sellers);
                            return BuyerService.getPreferredSellers(vm.userId)
                        }
                    })
                .then(
                    function (ps) {
                        if(ps==undefined)
                        {
                         vm.error="No preferred sellers yet.";
                        }
                        else {
                            if (ps.data.length == 0) {
                                vm.newArray = vm.sellers;
                            }
                            else {
                                vm.preferredsellers = ps.data[0].preferredSellers;
                                console.log(vm.preferredsellers);
                                vm.newArray = [];
                                for (var s in vm.sellers) {
                                    if (vm.preferredsellers.indexOf(vm.sellers[s].userId._id) > -1) {
                                        vm.newArray.splice(0, 0, vm.sellers[s]);
                                    } else {
                                        vm.newArray.push(vm.sellers[s]);
                                    }
                                }
                            }
                        }
                    });
        }

        init();

        function viewSeller(element,bookId,sellerId) {

            GoogleBookService.setElement(element);

            // GoogleBookService.getDetailsOfOneBook(bookId)
            //     .then(function (response) {
            //         var data=response.data;
            //         console.log(data);
            //         // data=JSON.stringify(data);
            //         vm.selected=data;
            //         vm.element=element;
            //         // var sellerId=element.userId;
            //         console.log(sellerId._id);
            vm.sellerId=element.userId._id;
            $location.url("/user/userId/buyBooks/" + bookId+"/"+element.userId._id);
                    // $location.url("/user/" + vm.userId + "/buyBooks/" + bookId+"/"+element.userId._id);


        }

        // function changeOrder(userId) {
        //
        //     var userId=vm.userId;
        //
        //
        // }


        // function isPresent(sellers) {
        //     console.log("preferrred sellers"+usrId);
        //     for(var i=0;i<sellers.length;i++)
        //     {
        //
        //     }
        //
        //     return (vm.preferredsellers.indexOf(usrId));
        //
        // }
        //
        //


    }
})();