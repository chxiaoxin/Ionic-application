angular.module('firstApp.controllers', ['ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller("MenuController",['$scope','menuFactory','baseURL',function($scope,menuFactory,baseURL){
           $scope.baseURL=baseURL;
           $scope.filterText="";
           $scope.showDetails=false;
           $scope.setTab=1;
           $scope.showMenu=false;
           $scope.message='loading...';
           $scope.dishes=menuFactory.getDishes().query(
               function(response){
                   $scope.dishes=response;
                   $scope.showMenu=true;
               },function(response){
                   $scope.message='Error'+response.status+response.statusText;
               });
            $scope.select=function(setTab){
                $scope.setTab=setTab;
                switch(setTab){
                    case 1:
                        $scope.filterText='';
                        break;
                    case 2:
                        $scope.filterText='mains';
                        break;
                    case 3:
                        $scope.filterText='appetizer';
                        break;
                    case 4:
                        $scope.filterText='dessert';
                        break;
                    default:
                        break;
                }    
            };
            $scope.toggleDetails=function(){
                $scope.showDetails=!$scope.showDetails;
            };
            $scope.isSelected=function(setTab){
                return $scope.setTab===setTab;
            };
        }])
.controller('ContactController',['$scope',function($scope){
    $scope.feedback={firstname:'',
                     lastname:'',
                     agree:false,
                     mychannel:'',
                     email:''
                    };
    $scope.channels=[{value:'tel',label:'tel'},{value:'Email',label:'Email'}];
    $scope.invalidchannelselection=false;
}])

.controller('FeedbackController',['$scope',function($scope){
    $scope.submit=function(){
         console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                                    $scope.invalidchannelselection = true;
                                    console.log('incorrect');
                                  }else{
                                  $scope.invalidchannelselection = false;
                                  $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                  agree:false, email:"" };
                                  $scope.feedback.mychannel="";
                                  $scope.feedbackform.$setPristine();
                                  console.log($scope.feedback);
                                  }
                                  };
}])

.controller('dishDetailController',['$scope','menuFactory','$stateParams','baseURL',function($scope,menuFactory,$stateParams,baseURL){
            $scope.baseURL=baseURL;
            $scope.test={};
            $scope.criteria;
            $scope.showDish=false;
            $scope.message='Loading...';
            $scope.dish=menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(function(response){
                   $scope.dish=response;
                   $scope.showDish=true;
               },function(response){
                   $scope.message='Error'+response.status+response.statusText;
               });
            $scope.passVal=function(){
                console.log($scope.test.val);
                $scope.criteria=$scope.test.val;
            };
        }])
.controller('FormController',['$scope','menuFactory',function($scope,menuFactory){
    $scope.formval={
        author:'',
        rating:'',
        comment:'',
        date:''
    };
    $scope.invalidcheck=false;
    $scope.commentSubmit=function(){
        console.log($scope.formval);
        if($scope.formval.rating==''){
            $scope.invalidcheck=true;
            console.log('incorrect');
        }else{
            var currentDate=new Date();
            var year=currentDate.getFullYear();
            var month=currentDate.getMonth()+1;
            var date=currentDate.getDate();
            var hour=currentDate.getHours();
            var minute=currentDate.getMinutes();
            var sec=currentDate.getSeconds();
            var milsec=currentDate.getMilliseconds();
            $scope.formval.date=year+'-'+month+'-'+date+'T'+hour+':'+minute+':'+sec+'.'+milsec+'Z';
            $scope.dish.comments.push($scope.formval);
            menuFactory.getdishes().update({id:$scope.dish.id},$scope.dish);
            $scope.invalidcheck=false;
            $scope.formval={
        author:'',
        rating:'',
        comment:'',
        date:''
    };
            $scope.formVal.$setPristine();
            console.log($scope.formval);
        }
    };
}])
.controller('IndexController',['baseURL','$scope','menuFactory',function(baseURL,$scope,menuFactory){
    $scope.baseURL=baseURL;
    $scope.showIndex=false;
    $scope.message='Loading...'
    $scope.dish_outline=menuFactory.getDishes().get({id:1}).$promise.then(
        function(response){
                   $scope.dish_outline=response;
                   $scope.showIndex=true;
               },
        function(response){
                   $scope.message='Error'+response.status+response.statusText;
               });
}])
.controller('AboutController',['$scope','corFactory',function($scope,corFactory){
    $scope.leader_outline=corFactory.getLeaderInfo();
}])
;