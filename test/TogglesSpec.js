var scope,
    compile ,
    service,
    DOM,
    enabledElement,
    disabledElement;

beforeEach(function(){
  module('toggles');

  inject(function($compile, $rootScope, toggles, $q){
    service = toggles;
    scope   = $rootScope.$new();

    var features = {
      "default": {
        "url"       : "localhost",
        "features"  : {
          "espp"    :false,
          "pre-ipo" : true
        }
      }
    };

    var promiseOf =  function(data){
      return $q(function(resolve, reject) {
        resolve(data);
      })
    };

    toggles.init(promiseOf(features));

    compile = function(scope, element){
      return $compile(element)(scope);
    };
  });

  DOM = compile(scope, angular.element('' +
      '<div>' +
          '<span class="espp" feature="espp"></span>' +
          '<label class="pre-ipo" feature="pre-ipo"></label>' +
      '</div>'
  ));

  disabledElement = DOM.find('span');
  enabledElement = DOM.find('label');
  scope.$digest();
});

it('should remove element if feature if disabled', function () {
  expect(disabledElement.parent().length).toBe(0);
});

it('should remove element if feature if disabled', function () {
  expect(enabledElement.parent().length).toBe(1);
});
