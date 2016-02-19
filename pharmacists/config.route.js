(function(){

    'use strict';

    angular.module('eprescription.pharmacists')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider){

        $routeProvider
            .when('/pharmacists', {
                templateUrl: 'app/pharmacists/dashboard.html',
                controller: 'PharmacistCtrl',
                controllerAs: 'vm'
            })
            .when('/pharmacists/issue',{
                templateUrl: 'app/pharmacists/tpl/issue-prescribed.html',
                controller: 'PharmacistCtrl',
                controllerAs: 'vm'
            });

    };

})();