/*
router.js contains angular routes for the controllers of main, page, new, search, and delete.

config sets up the routing from template to controller.

A 'searchBy' function was added to aid the search controller in filtering for a particular search.
*/

var ShoeWiki = angular.module('ShoeWikiApp', ['ngRoute'])
	.run(function($rootScope) {
	});

// angular.module('ShoeWikiApp', [])
//   .controller('ShoeWikiController', function($scope, $http){
//   	$scope.shoes = []
//   })

ShoeWiki.config(function($routeProvider) {
	console.log("Configuring Shoe Wiki");
	$routeProvider
		.when('/', {
			templateUrl: '/html/home.html',
			controller: 'mainController'
		})
		.when('/pages/:subj', {
			templateUrl: '/html/pages.html',
			controller: 'pageController'
		})
		.when('/new', {
			templateUrl: '/html/new.html',
			controller: 'newController'
		})
		.when('/search/:tags', {
			templateUrl: '/html/search.html',
			controller: 'searchController'
		})
		.when('/delete', {
			templateUrl: '/html/delete.html',
			controller: 'deleteController'
		})
});

ShoeWiki.controller('mainController', function($scope, $rootScope, $http) {
    // create a message to display in our view
    $http.get('/api/posts')
	    .success(function(data) {
	    	$rootScope.posts = data;
				// 		console.log($scope.posts);
		})
		.error(function(data) {
		    console.log('Error: ' + data);
		});
});

ShoeWiki.filter("searchFor", function(){
	// searches for text in title or tags (single search only)
    return function(array, searchString){
        if (!searchString){
            return array;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        array.forEach(function (element, index, array){
            var titleSearch = element.title.toLowerCase().indexOf(searchString);
            var lowerCaseTags = element.tags.join('|').toLowerCase().split('|');
            var tagSearch = lowerCaseTags.indexOf(searchString);
            if (titleSearch !== -1 || tagSearch !== -1) {
                result.push(element);
            };
        });
        return result;
    };
});

ShoeWiki.controller('pageController', function($scope, $rootScope, $routeParams, $http) {
    // create a message to display in our view
		console.log("Now within pages Controller");
    var subj = $routeParams.subj; // grabs subj after colon in url
		$scope.nothingWrong = true;
		console.log(subj);
		$rootScope.posts.forEach(function(element, index, array) {
			if (element.url === subj){
				$scope.post = element;
			};
		});
		if ($scope.post === undefined) {$scope.nothingWrong = false}; // if no element gets passed in, raise error flag to show error

		$scope.edit = function() {
			// update post with edits
			$scope.post.title = $scope.editedPost.title;
			$scope.post.body = $scope.editedPost.body;
			$scope.post.author = $scope.editedPost.author;

			$http.post('/api/pages/',$scope.post)
				.success(function(data) {
					$scope.post.timestamp = data.timestamp;
					console.log(data);
			})
			.error(function(data) {
					console.log('Error: ' + data);
			});
		}

		$scope.autofiller = function() {
			// fills editedPost with post content
			$scope.editedPost = {};
			$scope.editedPost.title = $scope.post.title;
			$scope.editedPost.body = $scope.post.body;
			$scope.editedPost.author = $scope.post.author;
		}

});

ShoeWiki.controller('newController', function($scope, $rootScope, $http, $location) {
    // create a message to display in our view
    $scope.new = function(){
			console.log($scope.newPost);
			$scope.newPost.tags = $scope.newPost.tags.split(" ") // splitting space-spaced tags
			$scope.newPost.imagesource = "";
			$http.post('/api/new',$scope.newPost)
		    .success(function(data) {
					console.log(data);
					$location.path('/');
			})
			.error(function(data) {
			    console.log('Error: ' + data);
			});
		}
});

ShoeWiki.controller('searchController', function($scope, $rootScope, $routeParams, $http) {
    // create a message to display in our view
    var tags = $routeParams.tags.split("+")
		console.log(tags);
});

ShoeWiki.controller('deleteController', function($scope, $rootScope, $http) {
	$scope.delete = function(url) {
		$http.post('/api/delete/'+url)
			.success(function(data) {
				$rootScope.posts = data;
		})
		.error(function(data) {
				console.log('Error: ' + data);
		});
	}
});

// angular.module('ShoeWikiApp', [])
//    .controller('ShoeWikiController', function($scope, $http) {
//      $scope.tasks = [];
//      $scope.completed = [];
//      $scope.taskobjs = [];
//      console.log("in the controller");
//      $http.get('/api/tasks')
//         .success(function(data) {
//             data.forEach(function(element, index, array) {
//               console.log(element);
//               if (element.completed) {
//                 $scope.completed.push(element);
//               } else {
//                 $scope.tasks.push(element);
//               };
//             });
//             console.log($scope.tasks);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

//      $scope.add = function() {
//       $scope.tasks.push($scope.task)
//       console.log($scope.task);

//       $http.post('/api/tasks', $scope.task)
//             .success(function(data) {
//                 $scope.task = {}; // clear the form so our user is ready to enter another
//                 $scope.tasks = [];
//                 $scope.completed = [];
//                 console.log(data);
//                 data.forEach(function(element, index, array) {
//                   if (element.completed) {
//                     $scope.completed.push(element);
//                   } else {
//                     $scope.tasks.push(element);
//                   };
//                 })
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//        };

//      $scope.complete = function() {
//       remov = $scope.tasks.splice(this.$index, 1);
//       console.log(remov);
//       $scope.completed.push(remov[0])

//       $http.delete('/api/tasks/' + remov[0]._id)
//             .success(function(data) {
//                 $scope.todos = data;
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//      };

//      $scope.edit = function() {
//       edit = $scope.tasks[this.$index];
//       console.log(edit);

//       $http.post('/api/tasks/' + edit._id, edit)
//             .success(function(data) {
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//      };

// });
