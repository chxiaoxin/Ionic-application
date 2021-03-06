// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('firstApp', ['ionic', 'firstApp.controllers','firstApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
          controller:'IndexController'
      }
    }
  })

  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutus.html',
          controller:'AboutController'
        }
      }
    })
   .state('app.contactus', {
      url: '/contactus',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactus.html'
        }
      }
    })
    .state('app.menu', {
      url: '/menu',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuController'
        }
      }
    })
  .state('app.favorite',{
      url:'/favorite',
      views:{
          'menuContent':{
              templateUrl:'templates/favorite.html',
              controller:'FavoriteController',
              resolve:{
                favorites:['favoriteFactory',function(favoriteFactory){
                        return favoriteFactory.getAllFavorite();
                        }],
                dishes:['menuFactory',function(menuFactory){
                        return menuFactory.query();
                        }]
          }
          }
      }
  })
  .state('app.dishdetail', {
    url: '/menu/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/dishdetails.html',
        controller: 'dishDetailController',
        resolve:{
            dish:['menuFactory','$stateParams',function(menuFactory,$stateParams){
                return menuFactory.get({id:parseInt($stateParams.id,10)});
            }]
        }
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menu');
});
