// the module in question should go here
// code found here is only a bogy to make sure the controller and templates are set up fine
// so structure within this model is entirely up to you, but it should be availaible from the controller
// in the same way it is now

var Config = {
    "baseURL":"https://dhdev.eos.arz.oeaw.ac.at/",
    "APIversion":"0.1",
    "Language": "en",
}

var dhaAPIservice = angular.module('dhaAPIservice', []);

dhaAPIservice.service('dhaAPIcall', ['$http', function($http){
	var getNodes = function(fields){console.log('getNodes: ', fields);
		return $http.get("https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=event&parameters[field_dha_tags]=168&pagesize=all");
	};
	var getTerms = function(fields){console.log('getTerms: ', fields);
	};
	var setLanguage = function(language){console.log('setLanguage: ', language);
	};
	return {
		getNodes:getNodes,
		getTerms:getTerms,
		setLanguage:setLanguage
  	};
}]);
