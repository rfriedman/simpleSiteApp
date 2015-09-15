//'use strict';
//
/* jasmine specs for controllers go here */
describe('Site controllers', function() {


beforeEach(function(){
  module('uiRouterDemo');
  module('siteControllers');
module(function($provide){


  $provide.factory('modelServiceMock',['$q',function($q){
      var asyncModel = new Object();
      
     var modelInterface = new Object();
        asyncModel.domainModel = function(){
                var site = new Object();
                site.contacts = function(){return {'contacts':"contacts"}}

                site.siteinfo = function(){return {'siteinfo':"siteinfo"}}

                site.article = function(){return {'article':"article"}}

                site.section = function(){return {'section':"section"}}

                return site;


        }
      asyncModel.init = function(){
          var deffered = $q.defer();
        
        if(passPromise){
          deffered.resolve(asyncModel.domainModel());
        }
        else{
          deffered.reject('async model promise rejected');
        }
        return deffered.promise;
    }
    return asyncModel;    

}])})});


  describe('mainSiteController', function(){
    var scope, ctrl, mockModelSvc;
    passPromise = true;
    beforeEach(inject(function($rootScope, $controller, modelServiceMock) {
      scope = $rootScope.$new();
      mockModelSvc  = modelServiceMock;
     // spyOn(mockModelSvc,'init');
     spyOn(mockModelSvc,'init').and.callThrough();
     spyOn(mockModelSvc,'domainModel').and.callThrough();


      ctrl = $controller('mainSiteController', {$scope: scope, modelService: mockModelSvc});

    }));

    it('scope should be undefined before ansync modelService resolves ', function() {

      expect(true).toEqual(true);
      expect(mockModelSvc.init).toHaveBeenCalled();
      expect(scope.error).toBeUndefined();
      expect(scope.data).toBeUndefined();
      expect(scope.info).toBeUndefined();
      expect(scope.article).toBeUndefined();
      expect(scope.section).toBeUndefined();
      expect(scope.contacts).toBeUndefined();

    });

    it('modelService methods should be available to scope.data after modelService.init resolves', function() {
      scope.$digest();
      expect(true).toEqual(true);
      expect(scope.data).toBeDefined();
      expect(scope.error).toBeUndefined();
      expect(scope.data.siteinfo).toBeDefined();
      expect(scope.data.contacts).toBeDefined();
      expect(scope.data.article).toBeDefined();
      expect(scope.data.section).toBeDefined();


    });


    it('scope.data methods should populate scope', function() {
      scope.$digest();
      expect(true).toEqual(true);
      expect(scope.error).toBeUndefined();
      expect(scope.data).toBeDefined();


    });

    it('scope.data methods should have been called to populate scope .info .article .section .contacts',function(){
      scope.$digest();
      expect(scope.info).toEqual({'siteinfo':"siteinfo"});
      expect(scope.article).toEqual({'article':"article"});
      expect(scope.section).toEqual({'section':"section"});
      expect(scope.contacts).toEqual({'contacts':"contacts"});

    })
  });

});
