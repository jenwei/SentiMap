/*Angular controller. Controls DOM, sets and interacts with $scope variables 
to facilitate the GET/POST requests.*/

sentiMap = angular.module('sentiMap', ['ngMaterial']);
//var map = require('d3-map.js')

sentiMap.controller('mainController', function($scope, $http) {
    
    $scope.showPolyMap={};
    $scope.sentimentMapPage={};
    $scope.politicalMapPage={};
    $scope.refreshMaps={}; //if we want this?


    $http.get('/sentiment')
         .success(function(data) {
             $scope.sentimentMapPage = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: in get\'/sentiment' + data);
         });

    $http.get('/political')
         .success(function(data) {
             $scope.politicalMapPage = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: in get\'/political' + data);
         });
   
    $scope.showSentiMap=function(){
        console.log('hello');
    }; 


 });
