'use strict';

// helper function, fetching an object(o) property by its string(s) path
window.PropertybyString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

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

// TODO: if generalized properly, this could replace most other filters!
// filters by given property path
// if val is undefined, only checks if property path exists
// otherwise checks if property matches val
// uses helper function window.PropertybyString()
app.filter('byProperty', function() { 
  return function(entities, property, val) {
		var result = [];
		angular.forEach(entities, function(value) {
			if (PropertybyString(value, property)) {
				if(val == undefined) result.push(value);
				else if (PropertybyString(value, property) == val) result.push(value);
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

app.filter('bibIcon', function() { 
  return function(type) {
  		if(biblioconfig.hasOwnProperty(type)) return biblioconfig[type];
  		else return "view_headline";
	};
});