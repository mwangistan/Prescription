(function(){

    'use strict';

    angular.module('eprescription')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$injector = ['$scope', '$location', '$http', '$cookieStore', '$rootScope'];

    function LoginCtrl($scope, $location, $http, $cookieStore, $rootScope){


        $scope.login = function(){

            //console.log($scope.user);

            $http({
                method: 'POST',
                url: 'http://104.155.92.67/api/v1/user/userlogin/',
                data: {
                    username: $scope.user.username,
                    password: $scope.user.password
                },
                headers: {
                    'Content-Type':'application/json',
                    'accept': 'application/json'
                }
            }).success(function(data){

                //$cookies.set('userToken', data.key);
                //Retrieving the cookie
                //$cookieStore.put('userToken',data.key);
                //var userToken = $cookieStore.get('userToken');

                $rootScope.userInfo = data;
                console.log($rootScope.userInfo);

                sessionStorage.setItem('userInfo', JSON.stringify(data));
                sessionStorage.setItem('userToken', JSON.stringify(data.key));
                //
                ////Setting the cookie
                ////var UserToken = $cookies.put('userToken', data.key);
                //console.log(sessionStorage.getItem('userInfo'));
                //console.log(sessionStorage.getItem('userToken'));
//
                console.log("Some roles here "+data.roles);
//                console.log(data.roles[0]);

                if(data.roles[0] === 'doctor'){
                    $location.path('/doctors');
                } else if(data.roles[0]){
                    $location.path('/pharmacists');
                };



            })
                .error(function(){
                    //errror message
                });

        };
    };

})();