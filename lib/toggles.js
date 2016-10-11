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
        findConfig = function(response){
          var config = response,
              environments = parse(config),
              currentEnv = environments.filter(function (env) {
                return env.url == $location.host();
              })[0],
              env = currentEnv ? currentEnv.name : "default",
              features = config[env]["features"];
          return {
            env: env,
            features: features
          }
        },
        setConfig = function (config) {
          var features = config.features,
              disabled = {};

          for (var featureName in features) {
            if (!features[featureName]) {
              disabled[featureName] = true;
            }
          }
          return {
            env: config.env,
            disabled: disabled
          };
        };

    return {
      init : function(promise){
        configuration = promise.then(findConfig).then(setConfig);
      },
      getConfig : function(){
        if(!configuration){
          configuration = $http.get("config/features.json").then(function(response){
            return response.data
          }).then(findConfig).then(setConfig);
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
          if(features.disabled[attrs.feature]){
            element.remove();
          }
        });
      }
    };
  });


}).call(this);
