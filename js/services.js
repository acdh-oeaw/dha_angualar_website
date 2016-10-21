(function () {
  'use strict';
/////////// refactoring above as a service 
/////////// to be moved to separate file
var Config = {
    "baseURL":"http://dhcurate.apollo.arz.oeaw.ac.at",
    "pagesize": "all", //limiting pagesize currently does not work properly d/t bug with unpublished nodes
    "currentView":"list",
    "localStorage":"DHAStorage",
    "language":"en", // default english, set to browser language if either de or en
    "version":"0.1" 
}

var D7_API_Services = angular.module('D7_API_Services', []);

D7_API_Services.service('getContent', ['$http' ,function($http){
	var pagesize = Config.pagesize;
	var language = Config.language;
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
			return $http.get(Config.baseURL+"/"+this.language+"/"+this.parseVersion()+"/nodes?"+this.parseFields(fields)+this.parseLimit(pagesize));
		}
		var getTerms = function(fields, pagesize){console.log('getTerms: ', fields, pagesize);
			if(!pagesize) var pagesize = this.pagesize;
			return $http.get(Config.baseURL+"/"+this.language+"/"+this.parseVersion()+"/taxterm?"+this.parseFields(fields)+this.parseLimit(pagesize));
		}
	//////////// Parameter getters / setters ///////////////////////////////
		var updateLanguage = function(language){console.log('updateLanguage: ', language);
			if(language == "en" || "de") {
				Config.language = language;
				this.language = Config.language;
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
	  	updateLanguage: updateLanguage,
	  	pagesize: pagesize,
		language: language
  	};
}]);


})();