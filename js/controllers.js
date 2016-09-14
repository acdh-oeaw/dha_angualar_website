(function () {
  'use strict';
  var app = angular.module('acdh');
  app.controller('startCtrl',['$scope','$http', '$state', 'dhaAPIcall', '$stateParams', function($scope, $http, $state, dhaAPIcall, $stateParams){
	$scope.Model = {};
	var promise = dhaAPIcall.getNodes({"type":"event","field_dha_tags":"168"});
	promise.then(
		function(res){
			$scope.Model['start'] = res.data;
		},
		function(err){ console.log('err startCtrl: ', err); }
	  );
  }]);
})();