(function () {
    angular
        .module("BookLook")
        .controller("DetailsHomePageViewController", DetailsHomePageViewController);

    function DetailsHomePageViewController($location, $routeParams, GoogleBookService,SellerBookService) { // should add userservice
        var vm = this;
        vm.bookId=$routeParams.bid;

        function init() {
            GoogleBookService.getDetailsOfOneBook(vm.bookId)
                .then(function (response) {
                    var data=response.data;
                    console.log(data);
                    // data=JSON.stringify(data);
                    vm.selected=data;
                });
        }init();

    }
})();