(function(){

    'use strict';

    angular.module('eprescription.doctors')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider){

        $routeProvider
            .when('/doctors', {
                templateUrl: 'doctors/dashboard.html',
                resolve: function(){
                    //function to check if user is logged in
                }
            })
            .when('/doctors/prescribe', {
                templateUrl: 'doctors/tpl/prescribe.html',
                controller:'DoctorsCtrl',
                controllerAs: 'vm',
                resolve: function(){
                    //function to check if user is logged in
                }
            });
    };

})();
