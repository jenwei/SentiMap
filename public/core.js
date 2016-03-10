/*
    core.js: Angular controller. Controls DOM, sets and interacts with $scope variables 
    to facilitate the GET/POST requests.
*/

sentiMap = angular.module('sentiMap', ['ngMaterial']);

sentiMap.controller('mainController', function($scope, $http){
    $scope.getData=function(page){
        $http({
              method: 'GET',
              url: '/data'
            })
             .success(function(data){
                 // console.log('Got point data for ' + page);
                 showMap(page, data);
             })
             .error(function(err){
                 console.log('Error: in get \'/data\' - ' + err);
             });
    };

    $scope.showSentiMap=function(){
        var ourSVG = angular.element( document.querySelector('#sentimentMap'));
        ourSVG.empty(); // prevents multiple maps being appended to this element of the document
        $scope.getData('senti');
    }; 

    $scope.showPolyMap=function(){
        var ourPolySVG = angular.element( document.querySelector('#politicalMap'));
        ourPolySVG.empty();
        $scope.getData('poly');
    }; 
 });
