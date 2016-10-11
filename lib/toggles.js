(function(){
  "use strict"

  var app = angular.module('toggles', []);

  app.service("toggles", function(){
    var getConfig = null;
    return {
      init : function(promise){
        getConfig = promise.then(function(response){
          var env       = "default",
              features  = response.data[env]["features"],
              disabled  = {};

          for(var featureName in features){
            if(!features[featureName]){
              disabled[featureName] = true;
            }
          }
          return {
            env: env,
            disabled: disabled
          };
        });
      },
      getConfig : function(){
        return getConfig;
      }
    }
  });

  app.directive('feature', function (toggles) {
    return {
      restrict : "A",
      link: function (scope, element, attrs) {
        toggles.getConfig().then(function(features){
          var disabled = features.disabled[attrs.feature];
          disabled ?  element.remove() : "";
        });
      }
    };
  });


}).call(this);