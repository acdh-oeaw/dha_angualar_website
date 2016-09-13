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
		  templateUrl: '/acdh/js/views/start.html',
		  controller: 'startCtrl'
	  })
	  .state('dha',{
		  url: '/:lang/dha',
		  templateUrl: '/acdh/js/views/navbar.html',
		  controller: 'acdhNavCtrl'
	  })
	  .state('dha.newsevents',{
		  url: '/newsevents',
		  templateUrl: '/acdh/js/views/news.html',
		  controller: 'newsCtrl'
	  })
	  .state('dha.s-news',{
		  url: '/s-news/:nID',
		  templateUrl: '/acdh/js/views/s-news.html',
		  controller: 'singleEvCtrl'
	  })
	  .state('dha.partners',{
		  url: '/partners',
		  templateUrl: '/acdh/js/views/partners.html',
		  controller: 'partnerCtrl'
	  })
	  .state('dha.s-partners',{
		  url: '/s-partners/:nID',
		  templateUrl: '/acdh/js/views/s-partners.html',
		  controller: 'singlePaCtrl'
	  })
	  .state('dha.knowmore',{
		  url: '/knowmore',
		  templateUrl: '/acdh/js/views/knowmore.html',
		  controller: 'knowmoreCtrl'
	  })
	  .state('dha.s-knowmore',{
		  url: '/s-knowmore/:nID',
		  templateUrl: '/acdh/js/views/s-knowmore.html',
		  controller: 'singleKnCtrl'
	  })
	  .state('dha.projects',{
		  url: '/projects',
		  templateUrl: '/acdh/js/views/project.html',
		  controller: 'projectCtrl'
	  })
	  .state('dha.s-project',{
		  url: '/s-project/:nID',
		  templateUrl: '/acdh/js/views/s-project.html',
		  controller: 'singleProCtrl'
	  })
	  .state('dha.contact',{
		  url: '/contact',
		  templateUrl: '/acdh/js/views/contact.html',
		  controller: 'contactCtrl'
	  });
	  $mdThemingProvider.theme('default')
	  .primaryPalette('orange')
	  .accentPalette('deep-orange');
  }
})();