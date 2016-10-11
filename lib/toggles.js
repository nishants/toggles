(function(){
  "use strict"

  var app = angular.module('toggles', []);

  app.service("toggles", ["$location", "$http", function($location, $http){
    var configuration     = null,
        parse  = function(config){
          var environments = [];
          for(var env in config){
            environments.push({name: env, url: config[env].url,features: config[env].features});
          }
          return environments;
        },
        setConfig = function (response) {
          var config = response,
              environments = parse(config),
              currentEnv = environments.filter(function (env) {
                return env.url == $location.host();
              })[0],
              env = currentEnv ? currentEnv.name : "default",
              features = config[env]["features"],
              disabled = {};

          for (var featureName in features) {
            if (!features[featureName]) {
              disabled[featureName] = true;
            }
          }
          return {
            env: env,
            disabled: disabled
          };
        };

    return {
      init : function(promise){
        configuration = promise.then(setConfig);
      },
      getConfig : function(){
        if(!configuration){
          configuration = $http.get("config/features.json").then(function(response){return response.data}).then(setConfig);
        }
        return configuration;
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
