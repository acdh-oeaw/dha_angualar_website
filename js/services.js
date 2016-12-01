'use strict';

var D7_API_Services = angular.module('D7_API_Services', []);

D7_API_Services.service('getContent', ['$http' ,function($http){
	var pagesize = Config.pagesize;
	var language = Config.language;
	var Institutions;
	var DHATax;
	//////////Parameter Parsers///////////////////////////////
		var parseFields = function(fields){
			var fieldstring = "";
			if(fields !== null && typeof fields === 'object') {
				for(var key in fields) {
					if(fieldstring !== "") fieldstring += "&";
					fieldstring += "parameters["+key+"]="+fields[key];
				}
			}
			return fieldstring;
		}
		var parseLimit = function(limit,page){
			var limitstring = "";
			if (!limit) var limit = this.pagesize; 
			limitstring = "&pagesize="+limit;
			return limitstring;
		}
		var parseVersion = function(){
			return "api_"+Config.version.replace(".","_");
		}
	//////////Callable retrieval functions///////////////////////////////
		var getNodes = function(fields, pagesize){console.log('getNodes: ', fields, pagesize);
			if(!pagesize) var pagesize = this.pagesize;
			return $http.get(Config.baseURL+"/"+this.language+"/"+this.parseVersion()+"/nodes.json?"+this.parseFields(fields)+this.parseLimit(pagesize));
		}
		var getTerms = function(fields, pagesize){console.log('getTerms: ', fields, pagesize);
			if(!pagesize) var pagesize = this.pagesize;
			return $http.get(Config.baseURL+"/"+this.language+"/"+this.parseVersion()+"/taxterm.json?"+this.parseFields(fields)+this.parseLimit(pagesize));
		}
		var getInstitutions = function(){
			if(this.institutions == undefined) this.institutions = this.getTerms({'vid':'5'});
			return this.institutions;
		}
		var getDHATax = function(){
			if(this.DHATax == undefined) this.DHATax = this.getTerms({'vid':'4'});
			return this.DHATax;
		}
	//////////// Parameter getters / setters ///////////////////////////////
		var updateLanguage = function(language){console.log('updateLanguage: ', language);
			if(language == "en" || "de") {
				Config.language = language;
				this.language = Config.language;
        this.institutions = undefined;
        this.DHATax = undefined;
				//there needs to go more here, history clearing, refetching content? 
			}
			else console.log("No comprendo ",language);
		}
	///////////////// return Object //////////////////////////////////////////
	return {
		parseFields: parseFields,
		parseLimit: parseLimit,
		parseVersion: parseVersion,
  	getNodes: getNodes,
  	getTerms: getTerms,
  	getInstitutions: getInstitutions,
  	getDHATax: getDHATax,
  	updateLanguage: updateLanguage,
  	pagesize: pagesize,
		language: language,
		Institutions: Institutions,
		DHATax: DHATax
  	};
}]);

angular.module('geocoder', ['ngStorage']).factory('Geocoder', function ($localStorage, $q, $timeout) {
  var locations = $localStorage.locations ? JSON.parse($localStorage.locations) : {};

  var queue = [];

  // Amount of time (in milliseconds) to pause between each trip to the
  // Geocoding API, which places limits on frequency.
  var queryPause = 250;

  /**
   * executeNext() - execute the next function in the queue. 
   *                  If a result is returned, fulfill the promise.
   *                  If we get an error, reject the promise (with message).
   *                  If we receive OVER_QUERY_LIMIT, increase interval and try again.
   */
  var executeNext = function () {
    var task = queue[0],
      geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address : task.address }, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var latLng = {
          lat: result[0].geometry.location.lat(),
          lng: result[0].geometry.location.lng()
        };

        queue.shift();

        locations[task.address] = latLng;
        $localStorage.locations = JSON.stringify(locations);

        task.d.resolve(latLng);

        if (queue.length) {
          $timeout(executeNext, queryPause);
        }
      } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        queue.shift();
        task.d.reject({
          type: 'zero',
          message: 'Zero results for geocoding address ' + task.address
        });
        if (queue.length) {
          $timeout(executeNext, queryPause);
        }
      } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        queryPause += 250;
        $timeout(executeNext, queryPause);        
      } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
        queue.shift();
        task.d.reject({
          type: 'denied',
          message: 'Request denied for geocoding address ' + task.address
        });
        if (queue.length) {
          $timeout(executeNext, queryPause);
        }
      } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
        queue.shift();
        task.d.reject({
          type: 'invalid',
          message: 'Invalid request for geocoding address ' + task.address
        });
        if (queue.length) {
          $timeout(executeNext, queryPause);
        }
      }
    });
  };

  return {
    latLngForAddress : function (address) {
      var d = $q.defer();

      if($localStorage.locations) var _ = JSON.parse($localStorage.locations);
      if (_ && _.hasOwnProperty(address)) {
        $timeout(function () {
          d.resolve(_[address]);
        });
      } else {
        queue.push({
          address: address,
          d: d
        });

        if (queue.length === 1) {
          executeNext();
        }
      }
      return d.promise;
    }
  };
});


