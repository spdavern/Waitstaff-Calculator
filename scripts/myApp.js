angular.module('myApp', ['ngRoute'])
	.constant('VERSION', "2.1")
	.run(function(VERSION, $rootScope, $location) {
		$rootScope.version = VERSION;
		$rootScope.$on('$routeChangeError', function($location) {
	        $location.path('/');
	    })
	})
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: './app/home.html'
		}).when('/newMeal', {
			templateUrl: './app/new_meal.html'
		}).when('/myEarnings', {
			templateUrl: './app/earnings.html'
		}).otherwise({
			redirectTo: '/'
		})
	})
	.controller('CalcCtrl', function($scope, $location) {
		$scope.data = {
			defaultTaxRate: 6.5,
			defaultTipPercentage: 15,
			tipTotal: 0,
			mealCount: 0,
			AvgTipPerMeal: 0
		};
		$scope.isPath = function(comparedPath) {
			return comparedPath==$location.path();
		};
		$scope.data.taxRate = $scope.data.defaultTaxRate;
		$scope.data.tipPercentage = $scope.data.defaultTipPercentage;

		$scope.submit = function() {
			if(!($scope.data.mealTotal <= 0) && !isNaN($scope.data.mealTotal)) {
				$scope.data.tipTotal += $scope.data.tip;
				$scope.data.mealCount += 1;
				$scope.data.AvgTipPerMeal = $scope.data.tipTotal/$scope.data.mealCount;
				$scope.resetMeal();
			}
		}
		$scope.resetDefaults = function() {
			$scope.data.taxRate = $scope.data.defaultTaxRate;
			$scope.data.tipPercentage = $scope.data.defaultTipPercentage;
			$scope.resetMeal();
		}
		$scope.resetMeal = function() {
			$scope.data.mealPrice = undefined;
			document.getElementById("Price").focus();
		}
		$scope.calcSubtotal = function() {
			var subtotal = $scope.data.mealPrice * (1 + $scope.data.taxRate/100);
			subtotal = Math.round(subtotal*100)/100;
			$scope.data.subTotal = subtotal;
			return subtotal;
		}
		$scope.calcTipAmt = function() {
			var tip = $scope.data.mealPrice * $scope.data.tipPercentage/100;
			tip = Math.round(tip*100)/100;
			$scope.data.tip = tip;
			return tip;
		}
		$scope.calcMealTotal = function(){
			$scope.data.mealTotal = $scope.data.subTotal + $scope.data.tip;
			return $scope.data.mealTotal;
		}
		$scope.reset = function() {
			$scope.data.mealPrice = null;
			$scope.data.tipTotal = 0;
			$scope.data.mealCount = 0;
			$scope.data.AvgTipPerMeal = 0;
		}
	}
);