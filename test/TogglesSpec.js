var scope,
    compile ,
    DOM;

beforeEach(function(){
  module('toggles');

  inject(function($compile, $rootScope){
    compile = function(scope, element){
      return $compile(element)(scope);
    };
    scope = $rootScope.$new();
  });

  scope.$digest();
});

it('should have span element', function () {
  var createdElement = compile(scope, angular.element('<div feature></div>')).find('span');
  expect(createdElement).toBeDefined();
  expect(createdElement.text()).toEqual('This span is appended from directive.');
});
