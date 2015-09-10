'use strict';
// Make sure to include the `ui.router` module as a dependency
angular.module('uiRouterDemo', [
    'ui.router', 
  'ngAnimate','siteService','siteControllers'
])

.run( 
      ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(['$stateProvider', '$urlRouterProvider','siteConfigProvider',
    function ($stateProvider,$urlRouterProvider,siteConfigProvider) {
      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state("home", {
          // Use a url of "/" to set a states as the "index".
          url: "/",
          templateUrl: 'partials/jumbotron.html' 
        })

      .state('about', {
          url: '/about',
          templateUrl: 'partials/about.html'
        })
        
        .state('contacts', {
          url: '/contacts',
          templateUrl: 'partials/contacts.html'
        })

        .state('article',{
          url: '/article',
          templateUrl:'partials/article.html'
        })

        var siteConfig = {"siteName":"name of site", "siteID":5084220, "baseUrl":'json/site.json'};
        siteConfigProvider.siteSettings(siteConfig);

    }
  ]
);