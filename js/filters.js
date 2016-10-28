'use strict';

/* Filters */
var app = angular.module('DHA_webapp');

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });


app.filter('currentCaption', function() { // for start page
  return function(items, state) {
		var result = [];
		angular.forEach(items, function(value) {
			var cstate = state.current.name.split(".");
			if (value.hasOwnProperty('ctrl') && value['ctrl'] == cstate[cstate.length-1]) {
				result.push(value);
			}
		});
		return result;
	};
});

app.filter('termByID', function() { // for start page
  return function(terms, id) {
		var result = [];
		console.log(terms, id);
		angular.forEach(terms, function(value) {
			if (value.hasOwnProperty('tid') && value['tid'] == id) {
				result.push(value);
			}			
		});
		return result;
	};
});

app.filter('pastEvents', function() { // for start page
  return function(items) {
		var now = Date.now();
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('displayDate') && value['displayDate'] < now) {
				result.push(value);
			}
		});
		return result;
	};
});

app.filter('futureEvents', function() { // for start page
  return function(items) {
		var now = Date.now();
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('displayDate') && value['displayDate'] > now) {
				result.push(value);
			}
		});
		return result;
	};
});