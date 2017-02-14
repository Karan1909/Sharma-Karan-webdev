(function ()
{
    // view sends data to controller and controller sends data to view

    angular.module("WebAppMaker")
        .controller("LoginController",loginController);

    //$location allows to interact with URL.Interact with that
    function loginController($location,UserService){
        var vm=this;//its going to hold that will be sent to the view for rendering. vm means view model which is always meant for display
       // event handlers
        vm.login=login;


        //the view will manipulate the model and we controller will send the model to view for rendering. vice versa relationship
        //things that should happen as the controller loads we will put in init
        function init() {

            vm.hello="hello sirji";
        }
        init();


        function login (user)
        {

            var user1=UserService.findUserByCredentials(user.username,user.password)
            if(user1)
            {
                $location.url("/user/"+user1._id);

            }
            else
            {
                vm.error = "User not found";
            }
        }



    }
})();