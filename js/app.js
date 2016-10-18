(function () {
  'use strict';
  var app = angular.module('DHA_webapp', ['ngAria', 'ui.router','ngAnimate','ngSanitize','ngMaterial','D7_API_Services','md.data.table']);
  app.config(config);
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  function config($stateProvider, $urlRouterProvider, $mdThemingProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('start',{
		url: '/:lang',
		views: {
			'content': {
			    templateUrl: 'js/views/start.html',
			    controller: 'startCtrl'
			}
		}
	})
	.state('dha',{
		url: '/:lang/dha',
		views: {
			'navbar': {
			    templateUrl: 'js/views/navbar.html',
			    controller: 'dhaNavCtrl'
			}
        }
	})
	  .state('dha.newsevents',{
		  url: '/newsevents',
		  views: {
            'content@': {
                templateUrl: 'js/views/news.html',
                controller: 'newsCtrl'
            }
          }		  
	  })
	  .state('dha.s-news',{
		  url: '/s-news/:nID',
		  views: {
            'content@': {
                templateUrl: 'js/views/s-news.html',
                controller: 'singleCtrl'
            }
          }
	  })
	  .state('dha.partners',{
		  url: '/partners',
		  views: {
            'content@': {
                templateUrl: 'js/views/partners.html',
                controller: 'partnerCtrl'
            }
          }			  
	  })
	  .state('dha.s-partners',{
		  url: '/s-partners/:nID',
		  views: {
            'content@': {
                templateUrl: 'js/views/s-partners.html',
                controller: 'singlePaCtrl'
            }
          }				  
	  })
	  .state('dha.knowmore',{
		  url: '/knowmore',
		  views: {
            'content@': {
                templateUrl: 'js/views/knowmore.html',
                controller: 'knowmoreCtrl'
            }
          }				  
	  })
	  .state('dha.s-knowmore',{
		  url: '/s-knowmore/:nID',
		  views: {
            'content@': {
                templateUrl: 'js/views/s-knowmore.html',
                controller: 'singleCtrl'
            }
          }				  
	  })
	  .state('dha.projects',{
		  url: '/projects',
		  views: {
            'content@': {
                templateUrl: 'js/views/project.html',
                controller: 'projectCtrl'
            }
          }				  
	  })
	  .state('dha.s-project',{
		  url: '/s-project/:nID',
		  views: {
            'content@': {
                templateUrl: 'js/views/s-project.html',
                controller: 'singleCtrl'
            }
          }				  
	  })
	  .state('dha.contact',{
		  url: '/contact',
		  views: {
            'content@': {
                templateUrl: 'js/views/contact.html',
                controller: 'contactCtrl'
            }
          }				  
	  });
	  $mdThemingProvider.theme('default')
	  .primaryPalette('orange', {
      'default': '800',
       'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class // by default use shade 400 from the pink palette for primary intentions
      })
	  .accentPalette('orange',{
      'default': '800' // by default use shade 400 from the pink palette for primary intentions
      });
  }
})();