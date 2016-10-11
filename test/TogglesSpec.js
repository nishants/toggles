describe("Toggles ->" ,function(){
  var scope,
      compile ,
      service,
      DOM,
      enabledElement,
      disabledElement,
      createElement,
      promiseOf;

  beforeEach(function(){
    module('toggles');

    inject(function($compile, $rootScope, toggles, $q){
      service = toggles;
      scope   = $rootScope.$new();

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
          '<span class="espp" feature="espp"></span>' +
          '<label class="pre-ipo" feature="pre-ipo"></label>' +
          '</div>'
      ));

      disabledElement = DOM.find('span');
      enabledElement = DOM.find('label');
      scope.$digest();
    };

  });

  it('should remove element if feature if disabled', function () {
    service.init(promiseOf({
      "default": {
        "url"       : "localhost",
        "features"  : {
          "espp"    :false,
          "pre-ipo" : true
        }
      }
    }));

    createElement();
    expect(disabledElement.parent().length).toBe(0);
  });

  it('should remove element if feature if disabled', function () {
    service.init(promiseOf({
      "default": {
        "url"       : "localhost",
        "features"  : {
          "espp"    :false,
          "pre-ipo" : true
        }
      }
    }));
    createElement();
    expect(enabledElement.parent().length).toBe(1);
  });

});