(function(){

    'use strict';



    angular.module('eprescription')
        .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){


            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};


            $routeProvider
                .when('/',{
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl'
                })
                .when('/login',{
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl'
                })
                .when('/doctors', {
                    templateUrl: 'doctors/dashboard.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors'
                            };

                           // return true;
                        }
                    }
                })
                .when('/doctors/findpatient', {
                    templateUrl: 'doctors/tpl/getpatient.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors/findpatient'
                            };

                            // return true;
                        }
                    }
                })
                .when('/doctors/registerpatient', {
                    templateUrl: 'doctors/tpl/registerpatient.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors/registerpatient'
                            };

                            // return true;
                        }
                    }
                })
                .when('/doctors/prescribe', {
                    templateUrl: 'doctors/tpl/prescribe.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors/prescribe'
                            };

                            // return true;
                        }
                    }
                })

                .when('/doctors/recentprescriptions', {
                    templateUrl: 'doctors/tpl/recentprescriptions.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors/recentprescriptions';
                            };
                        }
                    }
                })
                .when('/doctors/changeprescription', {
                    templateUrl: 'doctors/tpl/changeprescription.html',
                    controller: 'DoctorsCtrl',
                    resolve: {
                        authToken: function(){
                            if(!sessionStorage.getItem('userToken')){
                                window.location.href = '#/login';
                            } else {
                                window.location.href = '#/doctors/changeprescription';
                            };
                        }
                    }
                })
                .when('/pharmacists', {
                    templateUrl: 'pharmacists/dashboard.html',
                    controller: 'PharmacistCtrl',
                })
                .when('/pharmacists/issue', {
                    templateUrl: 'pharmacists/tpl/getprescription.html',
                    controller: 'PharmacistCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);

})();



