(function () {
    angular
        .module("BookLook")
        .controller("ViewSellersController", ViewSellersController);

    function ViewSellersController($location, $routeParams, GoogleBookService,UserService) { // should add userservice
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.bookId=$routeParams.bid;
        var uIds=[];
        vm.viewSeller=viewSeller;
        function init() {
            var promise=GoogleBookService.viewSellers(vm.userId,vm.bookId);
            promise.success(
                function (values) {
                    var data = values;
                    vm.sellers = data;


        })}

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
                    $location.url("/user/" + vm.userId + "/buyBooks/" + bookId+"/"+element.userId._id);


        }




    }
})();