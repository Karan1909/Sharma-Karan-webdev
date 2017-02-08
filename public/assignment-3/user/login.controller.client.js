(function ()
{
    // view sends data to controller and controller sends data to view
    //

    angular.module("WebAppMaker")
        .controller("LoginController",loginController);

    function loginController(){
        var vm=this; //its going to hold that will be sent to the view for rendering. vm means view model which is always meant for display
        
        function () {
            
        }
        vm.hello ="Hello again from LC";

    }
})();