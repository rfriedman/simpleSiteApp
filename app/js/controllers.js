angular.module('siteControllers',[])

.controller('mainSiteController',['modelService', '$scope','siteConfig',function(modelService,$scope,siteConfig){
//var s = siteStage('json/site.json');
	

modelService.init().then(

	function(response){
		$scope.data =response;
		$scope.info = $scope.data.siteinfo(); 	
		$scope.article = $scope.data.article();
		$scope.section = $scope.data.section();
		$scope.contacts = $scope.data.contacts();
	
},function(response){

})    

	



}])


