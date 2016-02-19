'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/doctor', {
  		templateUrl: 'view1/view1.html',
  		controller: 'ViewCtrl'
  }).
  otherwise({redirectTo: '/doctor'});
}]);
