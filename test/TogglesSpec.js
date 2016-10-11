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

it('should have updated text in span', function (){
  scope.text = 'some other text';
  scope.$digest();
  var createdElement = compile(scope, angular.element('<div feature-if ></div>')).find('span');
  expect(createdElement).toBeDefined();
  expect(createdElement.text()).toEqual(scope.text);
});

it('should increment value on click of button', function () {
  scope.value=10;
  var button = compile(scope, angular.element('<div feature-else ></div>')).find('button');

  button.triggerHandler('click');
  scope.$digest();

  expect(scope.value).toEqual(11);
});