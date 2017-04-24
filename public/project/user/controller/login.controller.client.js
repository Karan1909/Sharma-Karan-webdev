(function ()
{
    // view sends data to controller and controller sends data to view

    angular.module("BookLook")
        .controller("LoginController",loginController);

    //$location allows to interact with URL.Interact with that
    function loginController($location,UserService){
        var vm=this;//its going to hold that will be sent to the view for rendering. vm means view model which is always meant for display
        // event handlers
        vm.login=login;
        //the view will manipulate the model and we controller will send the model to view for rendering. vice versa relationship
        //things that should happen as the controller loads we will put in init
        function init() {

            vm.hello="hello successfully logged in";
        }
        init();


        function login (user)
        {

            UserService.findUserByCredentials(user.username,user.password)
            .success(function (user) {
                console.log(user);

                if(user)
                {
                    $location.url("/user/viewProfile");
                     // $location.url("/user/"+user._id+"/viewProfile");

                }
                else
                {
                    // vm.error = "User not found";
                }

            })
                .error(
                function () {
                    vm.error = "User not found"
                }

            );


        }



    }
})();
