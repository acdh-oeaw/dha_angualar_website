(function () {
  'use strict';
  var app = angular.module('acdh');
  var listURL = {
			   'start':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?parameters[field_tags]=209',
			  'navbar':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=dha_page&parameters[tags]=214',
		  'newsevents':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=event',
			'partners':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/taxterm?parameters[vid]=5&parameters[tags]=207&pagesize=all',
			'knowmore':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=biblio',
			'projects':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=project',
			 'contact':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?parameters[nid]=165',
 
		  'single':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?&parameters[nid]=',
		 'singlep':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/taxterm?&parameters[tid]=',
		   'termsflat':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/get_termstree?vid=4&flat=1'
  };
  /* Services */
  app.factory('startList',['$http', '$stateParams',function($http,$stateParams){
	  return { list: function(){
			  var defLang = 'en';
			  if(typeof($stateParams.lang) !== 'undefined'){ ($stateParams.lang.toLowerCase() == 'de') ? (defLang = $stateParams.lang.toLowerCase()) : (defLang = 'en'); }
			  return $http.get(listURL['start'].replace('__LANG__', defLang)).then(function(res){return res;});
			}
	  };
  }]);
  app.factory('getList',['$http', '$stateParams',function($http,$stateParams){
	  return { list: function(curState){ console.log('curState:', curState); console.log('$stateParams.lang:', $stateParams.lang);
			  var defLang = 'en';
			  if(typeof($stateParams.lang) !== 'undefined'){ ($stateParams.lang.toLowerCase() == 'de') ? (defLang = $stateParams.lang.toLowerCase()) : (defLang = 'en'); }
			  return $http.get(listURL[curState].replace('__LANG__', defLang)).then(function(res){return res;});
			}
	  };
  }]);
  app.factory('getSingle',['$http', '$stateParams',function($http,$stateParams){
	  return { one: function(curState,id){ console.log('curState:', curState);
			  var defLang = 'en';
			  if(typeof($stateParams.lang) !== 'undefined'){ ($stateParams.lang.toLowerCase() == 'de') ? (defLang = $stateParams.lang.toLowerCase()) : (defLang = 'en'); }
			  return $http.get((listURL[curState].replace('__LANG__', defLang)) + id).then(function(res){return res;});
			}
	  };
  }]);
})();