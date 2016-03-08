/*Angular controller. Controls DOM, sets and interacts with $scope variables 
to facilitate the GET/POST requests.*/
sentiMap = angular.module('sentiMap', ['ngMaterial']);
sentiMap.controller('mainController', function($scope, $http) {
     $scope.formData = {};
     $scope.newPage = {};
     $scope.currentPage = {};
     $scope.currentPage.showing = false;

     $scope.editedPage = {};
     $scope.editedPage._id = $scope.currentPage._id;
     $scope.editedPage.showing = true;

    // when landing on the page, get all todos and show them
     $http.get('/api/pages')
         .success(function(data) {
             $scope.pages = data;
             // $scope.editData = new Array($scope.pages.length);
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

     // when submitting the add form, send the text to the node API
     $scope.createPage = function() {
         console.log('Creating Page')
         console.log($scope.newPage)
         $http.post('/api/pages', $scope.newPage)
             .success(function(data) {
                 $scope.newPage = {}; // clear the form so our user is ready to enter another
                 $scope.pages = data;
                 console.log(data);
             })
             .error(function(data) {
                 console.log('Error: ' + data);
             });
     };
     $scope.showPage = function(page){
         if (page == $scope.currentPage){
             $scope.currentPage.showing = !$scope.currentPage.showing;
             console.log($scope.currentPage.showing)
         }
         else{
             $scope.currentPage = page;
             $scope.currentPage.showing = true;
         }
         $scope.currentPage.name = page.name;
         $scope.currentPage.imageurl = page.imageurl;
         $scope.currentPage.text = page.text;
         $scope.currentPage.author = page.author;
         $scope.currentPage._id = page._id;
         $scope.currentPage.lasteditedby = page.lasteditedby;
     }

     $scope.editPage = function() {
        $scope.editedPage._id = $scope.currentPage._id;
         $scope.editedPage.author = $scope.currentPage.author;
         $scope.editedPage.name = $scope.currentPage.name;
         console.log('Current page: ' + $scope.currentPage.name)
         console.log('Edited page: ' + $scope.editedPage.name)
         console.log($scope.editedPage.text)

         if(typeof $scope.editedPage.name === "undefined") {
             $scope.editedPage.name = $scope.currentPage.name
        
         }
         if(typeof $scope.editedPage.text === "undefined") {
             $scope.editedPage.text = $scope.currentPage.text
    
         }
         if(typeof $scope.editedPage.imageurl === "undefined") {
             $scope.editedPage.imageurl = $scope.currentPage.imageurl
    
         }

 
         $http.post('/api/pages/edit', $scope.editedPage)
             .success(function(data) {
                 $scope.currentPage = $scope.editedPage;  // change the form to reflect changes
                 $scope.editedPage = {}; //clear the form
                 $scope.pages = data;
                 console.log(data)
             })
             .error(function(data) {
                 console.log('Error: ' + data)
             })
     }

 });
