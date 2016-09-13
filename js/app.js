(function () {
  'use strict';
  var app = angular.module('acdh', ['ngAria', 'ui.router','ngAnimate','ngSanitize','ngMaterial']);
  app.config(config);
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  function config($stateProvider, $urlRouterProvider, $mdThemingProvider){
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('start',{
		  url: '/:lang',
		  templateUrl: 'js/views/start.html',
		  controller: 'startCtrl'
	  })
	  .state('dha',{
		  url: '/:lang/dha',
		  templateUrl: 'js/views/navbar.html',
		  controller: 'acdhNavCtrl'
	  })
	  .state('dha.newsevents',{
		  url: '/newsevents',
		  templateUrl: 'js/views/news.html',
		  controller: 'newsCtrl'
	  })
	  .state('dha.s-news',{
		  url: '/s-news/:nID',
		  templateUrl: 'js/views/s-news.html',
		  controller: 'singleEvCtrl'
	  })
	  .state('dha.partners',{
		  url: '/partners',
		  templateUrl: 'js/views/partners.html',
		  controller: 'partnerCtrl'
	  })
	  .state('dha.s-partners',{
		  url: '/s-partners/:nID',
		  templateUrl: 'js/views/s-partners.html',
		  controller: 'singlePaCtrl'
	  })
	  .state('dha.knowmore',{
		  url: '/knowmore',
		  templateUrl: 'js/views/knowmore.html',
		  controller: 'knowmoreCtrl'
	  })
	  .state('dha.s-knowmore',{
		  url: '/s-knowmore/:nID',
		  templateUrl: 'js/views/s-knowmore.html',
		  controller: 'singleKnCtrl'
	  })
	  .state('dha.projects',{
		  url: '/projects',
		  templateUrl: 'js/views/project.html',
		  controller: 'projectCtrl'
	  })
	  .state('dha.s-project',{
		  url: '/s-project/:nID',
		  templateUrl: 'js/views/s-project.html',
		  controller: 'singleProCtrl'
	  })
	  .state('dha.contact',{
		  url: '/contact',
		  templateUrl: 'js/views/contact.html',
		  controller: 'contactCtrl'
	  });
	  $mdThemingProvider.theme('default')
	  .primaryPalette('orange')
	  .accentPalette('deep-orange');
  }
})();