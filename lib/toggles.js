(function(){
  "use strict"

  var app = angular.module('toggles', []);

  app.service("toggles", ["$location", function($location){
    var getConfig     = null,
        parse  = function(config){
          var environments = [];
          for(var env in config){
            environments.push({name: env, url: config[env].url,features: config[env].features});
          }
          return environments;
        };
    return {
      init : function(promise){
        getConfig = promise.then(function(response){
          var config = response,
              environments = parse(config),
              currentEnv   = environments.filter(function(env){
                return env.url == $location.host();
              })[0],
              env = currentEnv ? currentEnv.name : "default",
              features  = config[env]["features"],
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
  }]);

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
