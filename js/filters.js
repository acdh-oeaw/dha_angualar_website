'use strict';

/* Filters */
var app = angular.module('DHA_webapp');

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });


app.filter('currentCaption', function() { 
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

app.filter('termByID', function() { 
  return function(terms, id) {
		var result = [];
		angular.forEach(terms, function(value) {
			if (value.hasOwnProperty('tid') && value['tid'] == id) {
				result.push(value);
			}			
		});
		return result;
	};
});

app.filter('byProperty', function() { 
  return function(entities, property, val) {
  		console.log(entities, property, val);
		var result = [];
		angular.forEach(entities, function(value) {
			if (value.hasOwnProperty(property) && value[property] == val) {
				result.push(value);
			}			
		});
		return result;
	};
});

app.filter('recorded', function() { 
  return function(events) {
		var result = [];
		angular.forEach(events, function(value) {
			if (value.hasOwnProperty('schema:recordedIn') && value['schema:recordedIn']['url'] != undefined) {
				result.push(value);
			}			
		});
		return result;
	};
});



app.filter('pastEvents', function() { 
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

app.filter('futureEvents', function() { 
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