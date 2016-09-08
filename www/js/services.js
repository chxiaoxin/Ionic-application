'use strict';

angular.module('firstApp.services',['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var promotions = [
                {
                          _id:0,
                          name:'Weekend Grand Buffet', 
                          image: 'images/buffet.png',
                          label:'New',
                          price:'19.99',
                          description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                }
                
            ];
    
                this.getDishes = function(){
                    
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                    
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function() {
                    return   $resource(baseURL+"promotions/:id");;
                }             
        }])

        .service('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            this.getLeaderInfo=function(){
                return $resource(baseURL+"leadership/:id",null,{'query':{method:'GET',isArray:true}});
            }
            return $resource(baseURL+"leadership/:id");
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+"feedback/:id");
    
        }])
        .factory('favoriteFactory',['$resource','baseURL',function($resource,baseURL){
            var favFac={};
            var favorite=[];
            favFac.addToFavorite=function(index){
                for(var i=0;i<favorite.length;i++){
                    if(favorite[i]==index)
                        return;
                }
                favorite.push({id:index});
            };
            favFac.getAllFavorite=function(){
                return favorite;
            };
            favFac.deleteFromFavorite=function(index){
                for(var i=0;i<favorite.length;i++){
                    if(favorite[i].id==index)
                        favorite.splice(i,1);
                }
            };
            return favFac;
        }])

;
