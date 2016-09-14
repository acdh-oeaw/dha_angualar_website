(function () {
  'use strict';
  var app = angular.module('acdh', ['ngAria', 'ui.router','ngAnimate','ngSanitize','ngMaterial', 'dhaAPIservice']);
  app.config(config);
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  function config($stateProvider, $urlRouterProvider, $mdThemingProvider){
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('start',{
		  url: '/:lang',
		  templateUrl: 'js/views/start.html',
		  controller: 'startCtrl'
	  });
	  $mdThemingProvider.theme('default')
	  .primaryPalette('orange')
	  .accentPalette('deep-orange');
  }
})();