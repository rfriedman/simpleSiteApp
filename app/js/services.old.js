'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);


angular.module('uiRouterDemo',[])

.controller('SiteController',['$scope','$http',function($scope,$http){
	$http({method:'GET',url:'json/site.json'})
	.then(function(data){
		$scope.contacts = data.data.site.contacts;
		$scope.siteinfo = data.data.site.siteinfo;
		$scope.articles = data.data.site.article;
		
			angular.forEach($scope.contacts,function(value,key){
			
			console.log(value.firstname + ':'+ value);
			
		})
	},function(data){
		alert("error parsing");	
	});
}]);