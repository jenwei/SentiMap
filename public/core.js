/*Angular controller. Controls DOM, sets and interacts with $scope variables 
to facilitate the GET/POST requests.*/

sentiMap = angular.module('sentiMap', ['ngMaterial']);
sentiMap.controller('mainController', function($scope, $http) {
    
 
    $scope.sentimentMapPage={};
    $scope.politicalMapPage={};
    $scope.alldata={};

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
        var ourSVG = angular.element( document.querySelector('#sentimentMap'));
        ourSVG.empty();
        console.log('hello senti');


        showMap('senti');
    }; 
    $scope.showPolyMap=function(){
        var ourPolySVG = angular.element( document.querySelector('#politicalMap'));
        ourPolySVG.empty();
        console.log('hello poly');

        showMap('poly');
    }; 


 });
