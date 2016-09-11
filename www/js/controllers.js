angular.module('firstApp.controllers', ['ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginData=$localStorage.getObj("userinfo","{}");
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
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
    $localStorage.storeObj('userinfo',$scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    $scope.reservation={};
    
    $ionicModal.fromTemplateUrl('templates/reservetable.html',{scope:$scope}).then(function(modal){$scope.reserveform=modal;});
    
    $scope.closeReserve=function(){
        $scope.reserveform.hide();
    };
    
    $scope.reserve=function(){
        $scope.reserveform.show();
        };
    
    $scope.doReserve=function(){
        console.log('Reserving',$scope.reservation);
    };
    
     $timeout(function() {
      $scope.closeReserve();
    }, 1000);
    
})
.controller("MenuController",['$scope','menuFactory','baseURL','favoriteFactory','$ionicListDelegate',function($scope,menuFactory,baseURL,favoriteFactory,$ionicListDelegate){
           $scope.baseURL=baseURL;
           $scope.filterText="";
           $scope.showDetails=false;
           $scope.setTab=1;
           $scope.showMenu=false;
           $scope.message='loading...';
           $scope.dishes=menuFactory.query(
           function(response){
               $scope.dishes=response;
           },function(response){
               $scope.message=response.status;
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
            $scope.addFavorite=function(index){
                favoriteFactory.addToFavorite(index);
                $ionicListDelegate.closeOptionButtons();
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

.controller('dishDetailController',['$scope','menuFactory','$stateParams','baseURL','$ionicPopover','favoriteFactory','$ionicModal', '$timeout','dish',function($scope,menuFactory,$stateParams,baseURL,$ionicPopover,favoriteFactory,$ionicModal, $timeout,dish){
            $scope.baseURL=baseURL;
            $scope.test={};
            $scope.criteria;
            $scope.showDish=false;
            $scope.message='Loading...';
            $scope.dish=dish;
            $scope.passVal=function(){
                console.log($scope.test.val);
                $scope.criteria=$scope.test.val;
            };
            $ionicPopover.fromTemplateUrl('../templates/popover.html',{scope:$scope}).then(function(popover){
                $scope.popover=popover;
            });
            $scope.popOver=function($event){
                 $scope.popover.show($event);
            };
            $scope.add=function(){
                 favoriteFactory.addToFavorite($scope.dish.id);
                 $scope.popover.hide();
            };
            $scope.closePopover=function(){
                $scope.popover.hide();
            }
            $ionicModal.fromTemplateUrl('templates/comment.html',{scope:$scope}).then(function(modal){
                        $scope.commentform=modal;
                    });
             $scope.comment=function(){
                 $scope.closePopover();
                 $scope.commentform.show();
             }
             $scope.closeComment=function(){
                        $scope.commentform.hide();
                    };
            $timeout(function(){
                        $scope.closeComment();
                    },1000);
            $scope.formval={
                author:'',
                rating:'',
                comment:'',
                date:''
            };
            $scope.commentSubmit=function(){
                if($scope.formval.rating==''){
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
                    menuFactory.update({id:$scope.dish.id},$scope.dish);
                    $scope.invalidcheck=false;
                    $scope.formval={
                author:'',
                rating:'',
                comment:'',
                date:''
            };
                    console.log($scope.formval);
                }
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
            menuFactory.update({id:$scope.dish.id},$scope.dish);
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
.controller('IndexController',['baseURL','$scope','menuFactory','corporateFactory','promotionFactory',function(baseURL,$scope,menuFactory,corporateFactory,promotionFactory){
    $scope.baseURL=baseURL;
    $scope.showIndex=false;
    $scope.message='Loading...'
    $scope.dish_outline=menuFactory.get({id:1}).$promise.then(
        function(response){
                   $scope.dish_outline=response;
                   $scope.showIndex=true;
               },
        function(response){
                   $scope.message='Error'+response.status+response.statusText;
               });
    $scope.promotion=promotionFactory.get({id:0});
    $scope.leadership=corporateFactory.get({id:0}).$promise.then(
        function(response){
                   $scope.leadership=response;
                   $scope.showIndex=true;
               },
        function(response){
                   $scope.message='Error'+response.status+response.statusText;
});
}])
.controller('AboutController',['$scope','corporateFactory','baseURL',function($scope,corporateFactory,baseURL){
    $scope.baseURL=baseURL;
    $scope.leader_outline=corporateFactory.query().$promise.then(
               function(response){
                   $scope.leader_outline=response;
               },function(response){
                   $scope.message='Error'+response.status+response.statusText;
               });
}])
.controller('FavoriteController',['$scope','baseURL','favoriteFactory','menuFactory','$ionicListDelegate','$ionicPopup','$ionicLoading','$timeout','favorites','dishes',function($scope,baseURL,favoriteFactory,menuFactory,$ionicListDelegate,$ionicPopup,$ionicLoading,$timeout,favorites,dishes){
    $scope.baseURL=baseURL;
    $scope.shouldshow=false;
    $scope.favorites=favorites;
    $scope.dishes=dishes;
    $scope.toggleDelete=function(){
        $scope.shouldshow=!$scope.shouldshow;
    };
    $scope.deleteFavorite=function(index){
        var confirmDelete=$ionicPopup.confirm({
            title:'Confirm deletetion',
            template:'Are you sure to delete?'
        })
        
        confirmDelete.then(function(res){
            if(res){
                console.log('Proceed deletetion');
                favoriteFactory.deleteFromFavorite(index);
            }else{
                console.log('Cancel Deletion');
            }
        })
        
       
        $scope.shouldshow=false;
    };
    
}])
.filter('favfilter',function(){
    return function(dishes,favorite){
        var out=[];
        if(favorite.length==0)
            return out;
        for(var i=0;i<dishes.length;i++){
            for(var j=0;j<favorite.length;j++){
                if(favorite[j].id==dishes[i].id)
                    out.push(dishes[i]);
            }
        }
        return out;
    }
})
;