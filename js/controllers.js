(function () {
	'use strict';
	var app = angular.module('DHA_webapp');
	app.controller('startCtrl',['$scope','$http', '$state', '$stateParams','getContent',  function($scope, $http, $state, $stateParams, getContent){
		if($stateParams.lang !== "de" && $stateParams.lang !== "en") {
			var navLang = window.navigator.language.split("-")[0];
			if(navLang == "de" || "en") $state.go($state.current, {"lang" : navLang});
			else $state.go($state.current, {"lang" : Config.language});
		}
		$scope.Model = {};
		getContent.updateLanguage($stateParams.lang);
		$scope.Model.language = getContent.language;
		var getList = getContent.getNodes({"field_tags":"209"});
		getList.then(
			function(res){
			  for(var i=0; i<res.data.length; i++){
				if( res.data[i].hasOwnProperty('schema:url') ){
					res.data[i]['ctrl'] = res.data[i]['schema:url'].split('/')[res.data[i]['schema:url'].split('/').length-1];
					res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '').substring(0,120) + '...';
				}
			  }
			  $scope.Model['start'] = res.data;
			},
			function(err){ console.log('err startCtrl: ', err); }
		  );
	}]);
	app.controller('dhaNavCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent', function($rootScope, $scope, $http, $state, $stateParams, getContent){
		if($stateParams.lang !== "de" && $stateParams.lang !== "en") {
			var navLang = window.navigator.language.split("-")[0];
			if(navLang == "de" || "en") $state.go($state.current, {"lang" : navLang});
			else $state.go($state.current, {"lang" : Config.language});
		}
		$scope.Model = {};
		$scope.state = $state;
		getContent.updateLanguage($stateParams.lang);
		$scope.Model.language = getContent.language;
		var curList = getContent.getNodes({"field_tags":"214"});
		curList.then(
		  function(res){
			for(var i=0; i<res.data.length; i++){
			  if( res.data[i].hasOwnProperty('schema:url') ){
				res.data[i]['ctrl'] = res.data[i]['schema:url'].split('/')[res.data[i]['schema:url'].split('/').length-1];
			  }
			}
			$scope.Model['navbar'] = res.data;
			$rootScope.captions = res.data;
		  },
		  function(err){ console.log('err navbar-LISTCTRL: ', err); }
		);
		///////// I18n-Switch init  //////////////////////
		$rootScope.toggleLang = function(lang){
		  $scope.Model.language = lang;
		  $stateParams.lang = lang;
		  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
		};
		///////// UI-Switch init ////////////////////
		if(typeof($rootScope.uiview) == 'undefined'){
		  $rootScope.uiview = {};
		  $rootScope.uiview.list = true;
		  $rootScope.uiview.grid = false;
		}
		$rootScope.onList = function(){
		  $rootScope.uiview.list = true;
		  $rootScope.uiview.grid = false;
		};
		$rootScope.onGrid = function(){
		  $rootScope.uiview.list = false;
		  $rootScope.uiview.grid = true;
		};
	}]);
	app.controller('newsCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
		$scope.Model = {};
		var curList = getContent.getNodes({"type":"event"});
		curList.then(
			function(res){ 
				for(var i=0; i<res.data.length; i++){
					if( res.data[i].hasOwnProperty('schema:keywords') ){
					}
				}
				console.log(res.data);
				$scope.Model['newsevents'] = res.data;
			},
			function(err){ console.log('err newsevents: ', err); }
		);
	}]);
  app.controller('singleCtrl',['$scope','$http', '$state', '$stateParams','getContent',  function($scope, $http, $state, $stateParams, getContent){
	var curList = getContent.getNodes({"nid": $stateParams.nID});
	curList.then(
		function(res){
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleEvent: ', err); }
	);
  }]);
  app.controller('partnerCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	var curList = getContent.getTerms({"vid":"5","tags":"207"});
	curList.then(
		function(res){ var tags = [];
		  $scope.Model['partners'] = res.data;
		},
		function(err){ console.log('err partnerCtrl: ', err); }
	  );
  }]);
  app.controller('singlePaCtrl',['$scope','$http', '$state', '$stateParams','getContent',  function($scope, $http, $state, $stateParams, getContent){
	var curList = getContent.getTerms({"tid": $stateParams.nID});
	curList.then(
		function(res){
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singlePaCtrl: ', err); }
	);
  }]);
  app.controller('knowmoreCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	var curList = getContent.getNodes({'type':'biblio'});
	curList.then(function(res){ 
		  $scope.Model['knowmore'] = res.data;
		},
		function(err){ console.log('err knowmoreCtrl: ', err); }
	  );
  }]);
  app.controller('projectCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	var curList = getContent.getNodes({'type':'project'});
	curList.then(
		function(res){
		  $scope.Model['projects'] = res.data;
		},
		function(err){ console.log('err projectCtrl: ', err); }
	);
  }]);
  app.controller('contactCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	var curList = getContent.getNodes({'nid':'165'});
	curList.then(function(res){ 
		  $scope.Model['contact'] = res.data;
		},
		function(err){ console.log('err contactCtrl: ', err); }
	);
  }]);
})();