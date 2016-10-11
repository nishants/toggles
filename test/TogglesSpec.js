describe("Toggles ->" ,function(){
  var scope,
      compile ,
      service,
      DOM,
      enabledElement,
      disabledElement,
      createElement,
      promiseOf,
      http;

  beforeEach(function(){
    module('toggles');

    inject(function($compile, $rootScope, toggles, $q, $httpBackend){
      service = toggles;
      scope   = $rootScope.$new();
      http    = $httpBackend;

      promiseOf =  function(data){
        return $q(function(resolve, reject) {
          resolve(data);
        })
      };


      compile = function(scope, element){
        return $compile(element)(scope);
      };
    });

    createElement = function(){
      DOM = compile(scope, angular.element('' +
          '<div>' +
          '<span  feature="feature-one"></span>' +
          '<label feature="feature-two"></label>' +
          '</div>'
      ));

      disabledElement = DOM.find('span');
      enabledElement = DOM.find('label');
      scope.$digest();
    };

  });

  it('should remove element if feature is disabled', function () {
    service.init(promiseOf({
      "default": {
        "url"       : "localhost",
        "features"  : {
          "feature-one" : false,
          "feature-two" : true
        }
      }
    }));

    createElement();
    expect(disabledElement.parent().length).toBe(0);
  });

  it('should remove element if feature is disabled', function () {
    service.init(promiseOf({
      "default": {
        "url"       : "localhost",
        "features"  : {
          "feature-one" : false,
          "feature-two" : true
        }
      }
    }));
    createElement();
    expect(enabledElement.parent().length).toBe(1);
  });

  it('should read config/features.json if not configured otherwise', function () {
    http.expectGET("config/features.json").respond({
          "url"       : "localhost",
          "features"  : {
            "feature-one" : false,
            "feature-two" : true
          }
        }
    );

    createElement();
    expect(enabledElement.parent().length).toBe(1);
    //expect(disabledElement.parent().length).toBe(0);
  });

});