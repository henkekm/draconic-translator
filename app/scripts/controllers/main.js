angular.module("draconic-translator", [])
    .controller("MainController", ['$scope', '$http', function($scope, $http) {
      	var space = ' ';
      	$scope.translatedText = "The text hasn't been translated yet.";
      	$scope.translatedTextD = "The text hasn't been translated yet.";
		$scope.noNumbers = {
        	regExRestrictions: /^\D*$/,
        	regExRestrictionsD: /^\D*$/
      	};
      	$scope.logScope = function() {
        	console.log($scope);
        };
		$scope.prepStringForURL = function(stringToPrep) {
			var preppedString = stringToPrep;
			return preppedString.split(space).join('+');
        };
        $scope.translateToDraconic = function() {
        	if(typeof $scope.translateText !== 'undefined'){
			    $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + $scope.keyText + "&lang=en-cs&text=" + $scope.prepStringForURL($scope.translateText))
			    .success(function(response) {
			    	$scope.translatedText = response;
			    })
			    .finally(function() {
					$scope.textToBeDraconified = $scope.translatedText.text[0];
					$scope.draconifiedText = $scope.textToBeDraconified;

					$scope.draconifiedText = $scope.draconifiedText.replace(/a/gi, '^' );
					$scope.draconifiedText = $scope.draconifiedText.replace(/o/gi, 'a' );
					$scope.draconifiedText = $scope.draconifiedText.replace(/i/gi, 'o' );
					$scope.draconifiedText = $scope.draconifiedText.replace(/e/gi, 'i' );
					$scope.draconifiedText = $scope.draconifiedText.replace(/\^/gi, 'e' );

					return $scope.draconifiedText;
			    });
			};
		};

        $scope.translateToEnglish = function() {
        	if(typeof $scope.translateTextD !== 'undefined'){
        		$scope.dedraconifiedText = $scope.translateTextD;
				$scope.dedraconifiedText = $scope.dedraconifiedText.replace(/e/gi, '^' );
				$scope.dedraconifiedText = $scope.dedraconifiedText.replace(/i/gi, 'e' );
				$scope.dedraconifiedText = $scope.dedraconifiedText.replace(/o/gi, 'i' );
				$scope.dedraconifiedText = $scope.dedraconifiedText.replace(/a/gi, 'o' );
				$scope.dedraconifiedText = $scope.dedraconifiedText.replace(/\^/gi, 'a' );

			    $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + $scope.keyText + "&lang=cs-en&text=" + $scope.prepStringForURL($scope.dedraconifiedText))
			    .success(function(response) {
			    	$scope.translatedTextD = response;
			    })
			    .finally(function() {
					$scope.englifiedText = $scope.translatedTextD.text[0];

					return $scope.englifiedText;
			    });
			};
		};

	}]);