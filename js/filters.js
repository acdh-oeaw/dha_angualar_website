'use strict';

/* Filters */

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });


app.filter('findContact', function() { // for contact's section
  return function(items, field) {
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('schema:headline') && value['schema:headline'] == 'Contact') {
				result.push(value); console.log('findContact result: ',result);
			}
		});
		return result;
	};
});
app.filter('findPartner', function() { // for Partner's section
  return function(items, field) {
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'][0] == 'Partner') {
				result.push(value);
			}
		});
		return result;
	};
});
app.filter('findMenu', function() { // for menu
  return function(items, field) {
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'].indexOf('_menu') != -1) {
				result.push(value);
			}
		});
		return result;
	};
});
app.filter('startMenu', function() { // for start page
  return function(items, field) {
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'].indexOf('_start') != -1) {
				result.push(value);
			}
		});
		return result;
	};
});

app.filter('currentCaption', function() { // for start page
  return function(items, state) {
		console.log(state);
		var result = [];
		angular.forEach(items, function(value) {
			if (value.hasOwnProperty('schema:headline') && value['schema:headline'].split(' ').join('').toLowerCase() == state.current.name) {
				result.push(value);
			}
		});
		return result;
	};
});