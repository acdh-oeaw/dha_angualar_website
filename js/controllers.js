viewconfig = {
	"dha.news-events":
		[
			{"key":"list","icon":"view_list"},
			{"key":"tiles","icon":"view_comfy"},
			{"key":"combined","icon":"view_quilt"}
		],
		"dha.projects":
		[
			{"key":"list","icon":"view_list"},
			{"key":"tiles","icon":"view_comfy"}
		],
};
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
		var getstart = getContent.getNodes({"nid":"1078"});
		getstart.then(
			function(res){
			  $scope.Model['starttext'] = res.data[0];
			},
			function(err){ console.log('err startCtrl: ', err); }
		  );
		var closepop = function(){
			document.getElementsByClassName("dhapopover").style.display = "none";
		}
	}]);
	app.controller('dhaNavCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent', 'Geocoder', function($rootScope, $scope, $http, $state, $stateParams, getContent, Geocoder){
		if($stateParams.lang !== "de" && $stateParams.lang !== "en") {
			var navLang = window.navigator.language.split("-")[0];
			if(navLang == "de" || "en") $state.go($state.current, {"lang" : navLang});
			else $state.go($state.current, {"lang" : Config.language});
		}
		$scope.Model = {};
		getContent.updateLanguage($stateParams.lang);
		$scope.Model.language = getContent.language;
		$rootScope.language = getContent.language;
		var curList = getContent.getNodes({"field_tags":"226"});
		$rootScope.captions = curList;
		curList.then(
		  function(res){
			for(var i=0; i<res.data.length; i++){
			  if( res.data[i].hasOwnProperty('schema:url') ){
				res.data[i]['ctrl'] = res.data[i]['schema:url'].split('/')[res.data[i]['schema:url'].split('/').length-1];
			  }
			}
			$scope.Model['navbar'] = res.data;
		  },
		  function(err){ console.log('err navbar-LISTCTRL: ', err); }
		);
		///////// I18n-Switch init  //////////////////////
		$rootScope.toggleLang = function(lang){
		  $scope.Model.language = lang;
		  $rootScope.language = lang;
		  $stateParams.lang = lang;
		  $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
		};
		///////// UI-Switch init ////////////////////
		if(typeof($rootScope.uiview) == 'undefined'){
		  $rootScope.aviews = [];
		  $rootScope.uiview = {};
		}
		console.log($scope.Model.aviews);
		$rootScope.swapView = function(a){
			$rootScope.uiview.current = a;
			console.log(a);
		};
		///////// Taxonomies init ///////////////////
		var InstInit = getContent.getInstitutions();
		InstInit.then(function(res){
			$rootScope.Institutions = res.data;
			res.data.forEach(function(inst){
				if(inst['schema:address'] != "") inst.geo = Geocoder.latLngForAddress(inst['schema:address']);
			});
			console.log(res.data);
		});
		var TaxInit = getContent.getDHATax();
		TaxInit.then(function(res){
			$rootScope.DHATax = res.data;
			console.log(res.data);
		});  
	}]);
	app.controller('newsCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
		$scope.Model = {};
		$rootScope.uiview.current = "combined";
		$rootScope.aviews = viewconfig[$state.current.name];
		var curList = getContent.getNodes({"type":"event"});
		curList.then(
			function(res){ 
				for(var i=0; i<res.data.length; i++){
					if( res.data[i].hasOwnProperty('schema:startDate') ){
						//post-processing - this needs to go to a filter imho...
						res.data[i]['displayDate'] = parseInt(res.data[i]['schema:startDate'])*1000;
						res.data[i]['headline'] = parseInt(res.data[i]['schema:headline'])*1000;
					}
				}
				$scope.Model['newsevents'] = res.data;
			},
			function(err){ console.log('err newsevents: ', err); }
		);
		$rootScope.captions.then(function(res){
			$scope.state = $state;
			$scope.Model.navbar = res.data;
		});
		//////////// data-Table-helpers //////////////////////////////////
		$scope.sortfield = "displayDate";
		$scope.reverse = true;
		$scope.selected = [];		
		$scope.getNewOrder = function(a) {
			if(a.slice(0,1) == "-") {$scope.reverse = true; $scope.sortfield = a.slice(1);}
      		else if(a.slice(0,1) != "-") {$scope.reverse = false; $scope.sortfield = a;}
		}
		/////////////////////////////////////////////////////////////////
	}]);
	app.controller('singleCtrl',['$scope','$http', '$state', '$stateParams','getContent', '$sce', 'Geocoder', 'leafletData', 'leafletBoundsHelpers', function($scope, $http, $state, $stateParams, getContent, $sce, Geocoder, leafletData, leafletBoundsHelpers){
		var curList = getContent.getNodes({"nid": $stateParams.nID});
		  var bounds = leafletBoundsHelpers.createBoundsFromArray([[ 19.5, 42.4 ],[ 12.2, 54 ]]); //creating yemen bounds - maybe get coordinates from GeoNames as well?
		  angular.extend($scope, {
		    bounds: bounds,
		    center: {},
		    markers: {}
		  });		
		curList.then(
			function(res){
			  $scope.mySingle = res.data;
			  	if($scope.mySingle[0]['schema:additionalType'] == 'schema:event' && $scope.mySingle[0]['schema:recordedIn']['url']) $scope.mySingle[0]['schema:recordedIn']['url'] = $sce.trustAsResourceUrl($scope.mySingle[0]['schema:recordedIn']['url']);
			  	if($scope.mySingle[0]['schema:location'] != "") {
			  		$scope.mySingle[0]['geo'] = Geocoder.latLngForAddress($scope.mySingle[0]['schema:location']);
			  		$scope.mySingle[0]['geo'].then(function(res){
			  			console.log($scope.mySingle[0]['geo']);
					  	leafletData.getMap().then(function(map) {
					    	map.setView(res, 16);
					    	$scope.markers = {"venue":{"lat":res.lat, "lng": res.lng, "message":$scope.mySingle[0]['schema:location'],"focus":true}}
					    	map.invalidateSize();
					    });
						  $scope.$on('leafletDirectiveMap.resize', function(event){
						      console.log(event);
						  });					    
			  		});
			  	}
		  		if($scope.mySingle[0].hasOwnProperty('schema:startDate') ){
					//post-processing - this needs to go to a filter imho...
					$scope.mySingle[0]['displayDate'] = parseInt($scope.mySingle[0]['schema:startDate'])*1000;
				}
				console.log($scope.mySingle[0]);
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
		$rootScope.captions.then(function(res){
			$scope.state = $state;
			$scope.Model.navbar = res.data;
		});
	}]);
	app.controller('embedTermCtrl',['$scope','$http', 'getContent', '$attrs',   function($scope, $http, getContent, $attrs){
		$scope.myList = [];
		$attrs.$observe('tags', function(val){
			var tags = JSON.parse(val);
			var tids = "";
			tags.forEach(function(ctag){
				tids += ctag.tid + ","
			})
			var curList = getContent.getNodes({"field_dha_tags": tids});
			curList.then(
				function(res){
				  $scope.myList = res.data;
				  console.log(res.data);
				},
				function(err){ console.log('err embedTermCtrl: ', err); }
			);		
		});
	}]);
  app.controller('singlePaCtrl',['$scope','$http', '$state', '$stateParams','getContent', function($scope, $http, $state, $stateParams, getContent){
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
	$rootScope.uiview.current = "list";
	$rootScope.aviews = viewconfig[$state.current.name];
	var curList = getContent.getNodes({'type':'biblio'});
	curList.then(function(res){ 
		$scope.Model['knowmore'] = res.data;
		console.log($scope.Model['knowmore']);
		},
		function(err){ console.log('err knowmoreCtrl: ', err); }
	);
	$rootScope.captions.then(function(res){
		$scope.state = $state;
		$scope.Model.navbar = res.data;
	});
  }]);
  app.controller('projectCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	$rootScope.uiview.current = "tiles";
	$rootScope.aviews = viewconfig[$state.current.name];
	var curList = getContent.getNodes({'type':'project'});
	curList.then(
		function(res){
			for(var i=0; i<res.data.length; i++){
				if( res.data[i].hasOwnProperty('schema:headline') ){
					res.data[i]['headline'] = res.data[i]['schema:headline'];
					res.data[i]['source'] = res.data[i]['schema:sourceOrganization'][0].name;
				}
			}
			$scope.Model['projects'] = res.data;
			
		},
		function(err){ console.log('err projectCtrl: ', err); }
	);
	$rootScope.captions.then(function(res){
		$scope.state = $state;
		$scope.Model.navbar = res.data;
	});
	//////////// data-Table-helpers //////////////////////////////////
	$scope.sortfield = "headline";
	$scope.reverse = false;
	$scope.selected = [];		
	$scope.getNewOrder = function(a) {
		if(a.slice(0,1) == "-") {$scope.reverse = true; $scope.sortfield = a.slice(1);}
  		else if(a.slice(0,1) != "-") {$scope.reverse = false; $scope.sortfield = a;}
		console.log(a);
	}
	/////////////////////////////////////////////////////////////////
  }]);
  app.controller('contactCtrl',['$rootScope','$scope','$http', '$state', '$stateParams','getContent',  function($rootScope, $scope, $http, $state, $stateParams, getContent){
	$scope.Model = {};
	$rootScope.captions.then(function(res){
		$scope.state = $state;
		$scope.Model.navbar = res.data;
	});
  }]);
})();