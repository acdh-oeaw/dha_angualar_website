'use strict';

/* App Module */

var app = angular.module('acdh', ['ui.router','ngAnimate','ngSanitize','ngMaterial']);

var listURL = {
    'newsevents':   'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=event&pagesize=all&callback=JSON_CALLBACK',     // news & events
    'knowmore':     'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=biblio&pagesize=all&callback=JSON_CALLBACK',    // know more
    'projects':     'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=project&pagesize=all&callback=JSON_CALLBACK',   // projects
    'partners':     'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=institution&pagesize=all&callback=JSON_CALLBACK',// partners (in 'schema:keywords' tag 'Partner')
    'single':       'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[nid]=',
    'start':        'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[field_tags]=214', // inc. front page entries
    'contact':      'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[nid]=165',
    'termsflat':    'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/get_termstree?vid=4&flat=1'
};

app.config(config);
function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider,$logProvider,$mdThemingProvider){
	$compileProvider.debugInfoEnabled(true);
	$logProvider.debugEnabled(true);
	$urlRouterProvider.otherwise('/');
    $stateProvider
    .state('s-news',{ // partyDetail({ partyID: id, partyLocation: location })
        url: '/s-news/:nID',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/s-news.html',
                controller: 'singleCtrl'
            }
        }
    })
    .state('s-project',{
        url: '/s-project/:nID',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/s-project.html',
                controller: 'singleCtrl'
            }
        }
    })
    .state('s-knowmore',{
        url: '/s-knowmore/:nID',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/s-knowmore.html',
                controller: 'singleCtrl'
            }
        }
    })
    .state('s-partners',{
        url: '/s-partners/:nID',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/s-partners.html',
                controller: 'singleCtrl'
            }
        }
    })
    .state('newsevents',{
        url: '/newsevents',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/news.html',
                controller: 'listCtrl'
            }
        }
    })
    .state('projects',{
        url: '/projects',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/project.html',
                controller: 'listCtrl'
            }
        }
    })
    .state('knowmore',{
        url: '/knowmore',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/knowmore.html',
                controller: 'listCtrl'
            }
        }
    })
    .state('partners',{
        url: '/partners',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/partners.html',
                controller: 'listCtrl'
            }
        }
    })
    .state('contact',{
        url: '/contact',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/contact.html',
                controller: 'contactCtrl'
            }
        }
    })
    .state('start',{
        url: '/',
        views: {
            'content@': {
                templateUrl: '/acdh/js/views/start.html',
                controller: 'listCtrl'
            }
        }
    });
    $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('amber');
}