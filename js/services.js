'use strict';

/* Services */

app.service('getLists', ['$http', '$q', function($http, $q){
  var deferObject,
  getList = {
	getListPromise: function(state){console.log('STATE: ', state);
	  var promise = $http.get(listURL[state]);
		// var promise = $http.jsonp(listURL[state]);
	  	// deferObject =  deferObject || $q.defer(); // this one is needed when we need to cache the state data set (!), and not when we need to refresh data set for every state changed
	  deferObject =  $q.defer();
	  promise.then(
		function(resp){ deferObject.resolve(resp); /*console.log('$state: ', $state);*/ },
		function(errr){ deferObject.reject(errr); /*console.log('errr$state: ', $state);*/ }
	  );
	  return deferObject.promise;
	}
  };
  return getList;
}]);
app.service('getMenu', ['$http', '$q', function($http, $q){
  var deferObject,
  getMenu = {
	getMenuPromise: function(url){
	  var promise = $http.get(url);
	  deferObject =  deferObject || $q.defer();
	  deferObject =  $q.defer();
	  promise.then(
		function(resp){ deferObject.resolve(resp); /*console.log('resp getMenu: ', resp);*/ },
		function(errr){ deferObject.reject(errr); console.log('errr getMenu: ', errr); }
	  );
	  return deferObject.promise;
	}
  };
  return getMenu;
}]);