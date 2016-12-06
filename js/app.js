// config for D7 Services
var Config = {
  "baseURL":"https://dha.acdh.oeaw.ac.at",
  "pagesize": "all", //limiting pagesize currently does not work properly d/t bug with unpublished nodes
  "currentView":"list",
  "localStorage":"DHAStorage",
  "language":"en", // default english, set to browser language if either de or en
  "version":"0.1" 
};

// config of available views per state
var viewconfig = {
  "dha.news-events":
    [
      {"key":"list","icon":"view_list"},
      {"key":"tiles","icon":"view_comfy"},
      {"key":"combined","icon":"view_quilt"}
    ],
  "dha.projects":
    [
      {"key":"list","icon":"view_list"},
      {"key":"tiles","icon":"view_comfy"}
    ],
  "dha.know-more":
    [
      {"key":"list","icon":"view_list"},
      {"key":"grid","icon":"view_comfy"}
    ]   
};

//biblio types to icons mapping
var biblioconfig = {
  "t_organisation":"group_work",
  "t_reading":"import_contacts",
  "t_resource":"description",
  "t_software":"save"
};


'use strict';

var app = angular.module('DHA_webapp', 
  ['ngAria', 
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'ngMaterial',
  'D7_API_Services', // custom module in services.js
  'md.data.table', 
  'geocoder', // custom module in services.js
  'ui-leaflet']
);

app.config(config);
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
  .state('dha.news-events',{
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
  .state('dha.know-more',{
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