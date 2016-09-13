(function () {
  'use strict';
  var app = angular.module('acdh');
  app.controller('startCtrl',['$scope','$http', '$state', 'startList', '$stateParams', function($scope, $http, $state, startList, $stateParams){
	$scope.Model = {};
	var getList = startList.list();
	getList.then(
		function(res){
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			res.data[i]['headline'] = res.data[i]['schema:headline'];
			res.data[i]['lang'] = $stateParams.lang;
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  if( res.data[i]['schema:headline'] == 'Projekte'){
				res.data[i]['schema:headline'] = 'Projects'; // for start/navbar views: obviously, need to adjust if others will have German/different variants, any ideas?
			  }
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,31);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
		  }
		  $scope.Model['start'] = res.data;
		},
		function(err){ console.log('err startCtrl: ', err); }
	  );
  }]);
  app.controller('acdhNavCtrl',['$scope','$http', '$state', 'getList', '$stateParams', function($scope, $http, $state, getList, $stateParams){ 
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	var curList = getList.list('navbar');
	curList.then(
	  function(res){
		for(var i=0; i<res.data.length; i++){
		  if( res.data[i].hasOwnProperty('schema:headline') ){
			res.data[i]['headline'] = res.data[i]['schema:headline'];
			res.data[i]['lang'] = $stateParams.lang;
			res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&\s]+/g, '');
			if( res.data[i]['schema:headline'] == 'Projekte'){
			  res.data[i]['schema:headline'] = 'Projects'; // for start/navbar views: obviously, need to adjust if others will have German/different variants, any ideas?
			}
			res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
		  }
		  if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
		  }
		}
		$scope.Model['navbar'] = res.data;
	  },
	  function(err){ console.log('err navbar-LISTCTRL: ', err); }
	);
  }]);
  app.controller('newsCtrl',['$rootScope','$scope','$http', '$state', 'getList', '$stateParams', function($rootScope, $scope, $http, $state, getList, $stateParams){
	if(typeof($stateParams.lang) !== 'undefined'){$scope.curlang = $stateParams.lang;}
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	
	$rootScope.toggleLang = function(lang){
	  $scope.curlang = lang;
	  $stateParams.lang = lang;
	  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
	};
	
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
	var curList = getList.list('newsevents');
	curList.then(
			  function(res){ var tags = [];
				for(var i=0; i<res.data.length; i++){
				  if( res.data[i].hasOwnProperty('schema:headline') ){
	  			  res.data[i]['headline'] = res.data[i]['schema:headline'];
					res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
					res.data[i]['schema:description'] = res.data[i]['schema:description'];
					res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
				  }
				  if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
				  }
				  if(res.data[i].hasOwnProperty('schema:name')){
					res.data[i]['schema:name'] = res.data[i]['schema:name'].replace('dha:','');
				  }
				  if( res.data[i].hasOwnProperty('schema:keywords') ){
					tags = res.data[i]['schema:keywords'];
					res.data[i]['schema:tags'] = [];
					res.data[i]['schema:keywords'] = [];
					for(var k=0; k<tags.length; k++){
					  res.data[i]['schema:tags'].push(tags[k]['name']);
					}
				  }
				}
				$scope.Model['newsevents'] = res.data;
			  },
			  function(err){ console.log('err newsevents: ', err); }
			);
  }]);
  app.controller('singleEvCtrl',['$scope','$http', '$state', 'getSingle', '$stateParams', function($scope, $http, $state, getSingle, $stateParams){
	var curList = getSingle.one('single', $stateParams.nID);
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleEvent: ', err); }
	);
  }]);
  app.controller('partnerCtrl',['$rootScope','$scope','$http', '$state', 'getList', '$stateParams', function($rootScope, $scope, $http, $state, getList, $stateParams){
	if(typeof($stateParams.lang) !== 'undefined'){$scope.curlang = $stateParams.lang;}
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	
	$rootScope.toggleLang = function(lang){
	  $scope.curlang = lang;
	  $stateParams.lang = lang;
	  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
	};
	
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
	var curList = getList.list('partners');
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model['partners'] = res.data;
		},
		function(err){ console.log('err partnerCtrl: ', err); }
	  );
  }]);
  app.controller('singlePaCtrl',['$scope','$http', '$state', 'getSingle', '$stateParams', function($scope, $http, $state, getSingle, $stateParams){
	var curList = getSingle.one('singlep', $stateParams.nID);
	curList.then(
		function(res){
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singlePaCtrl: ', err); }
	);
  }]);
  app.controller('knowmoreCtrl',['$rootScope','$scope','$http', '$state', 'getList', '$stateParams', function($rootScope, $scope, $http, $state, getList, $stateParams){
	if(typeof($stateParams.lang) !== 'undefined'){$scope.curlang = $stateParams.lang;}
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	
	$rootScope.toggleLang = function(lang){
	  $scope.curlang = lang;
	  $stateParams.lang = lang;
	  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
	};
	
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
	var curList = getList.list('knowmore');
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if(res.data[i].hasOwnProperty('schema:name')){
			  res.data[i]['schema:name'] = res.data[i]['schema:name'].replace('dha:','');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model['knowmore'] = res.data;
		},
		function(err){ console.log('err knowmoreCtrl: ', err); }
	  );
  }]);
  app.controller('singleKnCtrl',['$scope','$http', '$state', 'getSingle', '$stateParams', function($scope, $http, $state, getSingle, $stateParams){
	var curList = getSingle.one('single', $stateParams.nID);
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleKnCtrl: ', err); }
	);
  }]);
  app.controller('projectCtrl',['$rootScope','$scope','$http', '$state', 'getList', '$stateParams', function($rootScope, $scope, $http, $state, getList, $stateParams){
	if(typeof($stateParams.lang) !== 'undefined'){$scope.curlang = $stateParams.lang;}
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	
	$rootScope.toggleLang = function(lang){
	  $scope.curlang = lang;
	  $stateParams.lang = lang;
	  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
	};
	
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
	var curList = getList.list('projects');
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if(res.data[i].hasOwnProperty('schema:name')){
			  res.data[i]['schema:name'] = res.data[i]['schema:name'].replace('dha:','');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model['projects'] = res.data;
		},
		function(err){ console.log('err projectCtrl: ', err); }
	);
  }]);
  app.controller('singleProCtrl',['$scope','$http', '$state', 'getSingle', '$stateParams', function($scope, $http, $state, getSingle, $stateParams){
	var curList = getSingle.one('single', $stateParams.nID);
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleEvent: ', err); }
	);
  }]);
  app.controller('contactCtrl',['$rootScope','$scope','$http', '$state', 'getList', '$stateParams', function($rootScope, $scope, $http, $state, getList, $stateParams){
	if(typeof($stateParams.lang) !== 'undefined'){$scope.curlang = $stateParams.lang;}
	if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	
	$rootScope.toggleLang = function(lang){
	  $scope.curlang = lang;
	  $stateParams.lang = lang;
	  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
	};
	
	var curList = getList.list('contact');
	curList.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model['contact'] = res.data;
		},
		function(err){ console.log('err contactCtrl: ', err); }
	);
  }]);
})();