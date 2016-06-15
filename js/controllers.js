'use strict';

/* Controllers */

app.controller('acdhNav',['$scope', '$http', 'getMenu', '$state' , function($scope, $http, getMenu, $state){
  $scope.Model = {};
  $scope.$state = $state;
  var getMenuPromise = getMenu.getMenuPromise(listURL['start']);
  getMenuPromise.then(
	function(res){
	  for(var i=0; i<res.data.length; i++){
		if( res.data[i].hasOwnProperty('schema:headline') ){
		  res.data[i]['headline'] = res.data[i]['schema:headline'];
		  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
		  res.data[i]['description'] = res.data[i]['schema:description'];
		  res.data[i]['description'] = res.data[i]['description'].replace(/<[^<>]+>/gm, '');
		  res.data[i]['description'] = res.data[i]['description'].substring(0,55);
		  res.data[i]['description'] = res.data[i]['description'] + '...';
		}
		// converting MD-icon designations
		if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
		  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
		  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
		}
		// parsing sorting numbers as integers
		if( res.data[i].hasOwnProperty('api_order') ){
		  res.data[i]['api_order'] = parseInt(res.data[i]['api_order']);
		}
	  }
	  $scope.Model['start'] = res.data;
	},
	function(err){ console.log('err acdhNav: ', err); }
  );
}]);
app.controller('dhaTermsflat',['$scope', '$http', 'getMenu', function($scope, $http, getMenu){
  $scope.Model = {};
  var getMenuPromise = getTerms.getMenuPromise(listURL['termsflat']);
  getMenuPromise.then(
	function(res){
		// postprocessing of terms here... 
		$scope.Model['start'] = res.data;
	},
	function(err){ console.log('err dhaTermsflat: ', err); }
  );
}]);
app.controller('contactCtrl',['$rootScope', '$state','$scope','$http', '$stateParams' , function($rootScope, $scope, $state, $http){
  var thisURL = listURL['contact'];
  $rootScope.$state = {'current': {'name':"contact"}};
  $http({
	  method : "GET",
	  url : thisURL
  }).then(function mySucces(res) {
	  $scope.mySingle = res.data;
  }, function myError(res) {
	  $scope.mySingle = res.statusText;
  });
}]);
app.controller('singleCtrl',['$scope','$http', '$stateParams' , function($scope, $http, $stateParams){
  var thisURL = listURL['dha.single'] + $stateParams.nID;// console.log('nID: ', $stateParams.nID);
  $http({
	  method : "GET",
	  url : thisURL
  }).then(function mySucces(res) {
	  $scope.mySingle = res.data;
  }, function myError(res) {
	  $scope.mySingle = res.statusText;
  });
}]);

app.controller('listCtrl',['$scope','$http', '$state', 'getLists', function($scope, $http, $state, getLists){
  $scope.Model = {};
  $scope.uiview = {};
  $scope.uiview.list = false;
  $scope.uiview.grid = true;
  var getListPromise = getLists.getListPromise($state.current.name);
  getListPromise.then(
	function(res){ 
		$scope.Model[$state.current.name] = res.data;   
		console.log($state.current.name + ' $scope.Model: ', $scope);  
	},
	function(err){ console.log('err: ', err); }
  );
  $scope.onList = function(){
	$scope.uiview.list = true;
	$scope.uiview.grid = false;  //console.log('$scope.uiview: ', $scope.uiview);
  };
  $scope.onGrid = function(){
	$scope.uiview.list = false;
	$scope.uiview.grid = true;  //console.log('$scope.uiview: ', $scope.uiview);
  };
}]);