'use strict';

/* jasmine specs for controllers go here */
describe('Site controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('uiRouterDemo'));
  beforeEach(module('siteService'));

  describe('mainSiteControl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function($rootScope, $controller) {
      
      
      scope = $rootScope.$new();
      ctrl = $controller('mainSiteControl', {$scope: scope});
    }));


    it('should ... ', function() {
      expect(mainSiteControl).toBeDefined();

    });


    it('should set the default value of orderProp model', function() {
    });
  });



});
