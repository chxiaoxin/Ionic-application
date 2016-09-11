'use strict';

angular.module('firstApp.services',['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) { 
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});         
        }])

        .factory('promotionFactory',['baseURL','$resource',function(baseURL,$resource){
            return $resource(baseURL+'promotions/:id');
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
        .factory('$localStorage',['$window',function($window){
            return {
                store:function(key,value){
                    $window.localStorage[key]=value;
                },
                get:function(key,defaultvalue){
                    return $window.localStorage[key]||defaulvalue;
                },
                storeObj:function(key,value){
                    $window.localStorage[key]=JSON.stringify(value);
                },
                getObj:function(key,defaultvalue){
                    return  JSON.parse($window.localStorage[key]||defaultvalue);
                }
            }
        }])

;
