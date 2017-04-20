(function () {
    angular
        .module("BookLook")
        .controller("ViewMySoldItemsController", ViewMySoldItemsController);

    function ViewMySoldItemsController($location, $routeParams, GoogleBookService,BuyerService,someName,UserService) { // should add userservice
        var vm = this;
        vm.userId = someName._id;
        vm.bookId=$routeParams.bid;
        var uIds=[];
        vm.viewSeller=viewSeller;
        vm.viewDetails=viewDetails;
        // vm.isPresent=isPresent;

        vm.logout=logout;

        function viewDetails(bookId) {
            $location.url("/user/userId/search/" + bookId);
        }

        function logout() {
            console.log("inside logout");
            UserService
                .logout().then(
                $location.url("/")
            );
        }




        function init() {
            var promise= GoogleBookService.viewMyItems(vm.userId);
            promise.success(function (items) {
                if(items)
                {
                    console.log(items);
                    vm.items=items;
                }
            }).error(
                function (error) {
                    vm.error="Not sold any item yet!";

                }
            );

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