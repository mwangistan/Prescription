(function (){

    'use strict';

    angular.module('eprescription', [
        //Angular Modules
        'ngRoute',
        'ngCookies',

        //Third Party Modules

	'angularSpinner',

        //Custom Modules
        'eprescription.doctors',
        'eprescription.pharmacists'
    ]);

})();
