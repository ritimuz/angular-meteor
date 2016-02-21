describe('angular-meteor.mixer', function() {
  beforeEach(angular.mock.module('angular-meteor'));

  var $compile;
  var $rootScope;
  var $Mixer;

  beforeEach(angular.mock.inject(function (_$rootScope_, _$Mixer_) {
    $rootScope = _$rootScope_;
    $Mixer = _$Mixer_;
  }));

  describe('$Mixer', function() {
    var Mixin;

    beforeEach(function() {
      Mixin = function() {
        this.prop = 'prop';
      };

      Mixin.$method = angular.noop;

      $Mixer.mixin(Mixin);
    });

    afterEach(function() {
      $Mixer._mixout(Mixin);
    });

    it('should extend root scope', function() {
      expect($rootScope.prop).toEqual('prop');
      expect($rootScope.$method).toEqual(jasmine.any(Function));
    });

    it('should extend child scope', function() {
      var scope = $rootScope.$new();
      expect(scope.prop).toEqual('prop');
      expect(scope.$method).toEqual(jasmine.any(Function));
      scope.$destroy();
    });

    it('should extend isolated scope', function() {
      var scope = $rootScope.$new(true);
      expect(scope.prop).toEqual('prop');
      expect(scope.$method).toEqual(jasmine.any(Function));
      scope.$destroy();
    });
  });
});