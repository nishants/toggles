(function(){
  "use strict"
  angular.module('toggles', []).directive('feature', function() {
    return function(scope, elem){
      elem.append('<span>This span is appended from directive.</span>');
    };
  });

  angular.module('toggles').directive('featureIf', function(){
    return function(scope, elem){
      var spanElement = angular.element('<span>' + scope.text + '</span>');
      elem.append(spanElement);

      scope.$watch('text', function(newVal, oldVal){
        spanElement.text(newVal);
      });
    };
  });

  angular.module('toggles').directive('featureElse', function () {
    return {
      template: '<button>Increment value!</button>',
      link: function (scope, elem) {
        elem.find('button').on('click', function(){
          scope.value++;
        });
      }
    };
  });

}).call(this);