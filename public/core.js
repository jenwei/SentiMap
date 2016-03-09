/*Angular controller. Controls DOM, sets and interacts with $scope variables 
to facilitate the GET/POST requests.*/
sentiMap = angular.module('sentiMap', ['ngMaterial']);
sentiMap.controller('mainController', function($scope, $http) {
    $scope.sentimentMapPage={};
    $scope.politicalMapPage={};
    $scope.refreshMaps={}; //if we want this?

    // $scope.getSentiment = function(){
        $http.get('/sentiment')
             .success(function(data) {
                 $scope.sentimentMapPage = data;
                 console.log(data);
             })
             .error(function(data) {
                 console.log('Error: in get\'/sentiment' + data);
             });
    // };

    // setInterval($scope.getSentiment, 1000);

    // $scope.getPolitical = function(){
        $http.get('/political')
             .success(function(data) {
                 $scope.politicalMapPage = data;
                 console.log(data);
             })
             .error(function(data) {
                 console.log('Error: in get\'/political' + data);
             });
    // };

    // setInterval($scope.getPolitical, 1000);
 });
