


function createUserModel($scope,$http,$location) {
 			$scope.signinClick = function(){ $http({
   				method: 'POST',
	            url: '/usersignin',
	            data: { "email_id": $scope.email, "password":$scope.password}
	           		}).success(function(response){	          	            
	            if(response.user === "valid"){
	            console.log("Success login");
	            window.location = '/signedIn';
	            }
	            else{
	            	window.location = '/failureEdit';
	            }
	        }).error(function(error){
	        console.log("we are in error!!");
	            alert("error");
	        });   		
 			};
};
 			
 		/*	$scope.signup = function(){   
   			console.log("we are in education get");
   				$http({
   				method:'GET',
   				url:'/summary/getEdu',
   				}).success(function(data) {	
   				console.log(data);	
			$scope.school=data[0].school_name;
			$scope.field=data[0].study_field;
			$scope.grades=data[0].grades;
			$scope.description=data[0].education_description;
			$scope.activity=data[0].activities;
			
			}).error(function(response){
		  			console.log("Error response from getparam");
		  			console.log("response");
		  			});
			};*/
	
 			
 			