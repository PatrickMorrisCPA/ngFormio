module.exports = [
  'formioComponents',
  function(
    formioComponents
  ) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        component: '=',
        data: '=',
        form: '=',
        submission: '=',
        ignore: '=?'
      },
      templateUrl: 'formio/component-view.html',
      controller: [
        '$scope',
        'Formio',
        'FormioUtils',
        function(
          $scope,
          Formio,
          FormioUtils
        ) {
          // Set the form url.
          $scope.formUrl = $scope.form ? Formio.getAppUrl() + '/form/' + $scope.form._id.toString() : '';
          $scope.isVisible = function(component, data) {
            return FormioUtils.isVisible(
              component,
              data,
              $scope.submission.data,
              $scope.hideComponents
            );
          };

          // Get the settings.
          var component = formioComponents.components[$scope.component.type] || formioComponents.components['custom'];

          // Set the template for the component.
          if (!component.viewTemplate) {
            $scope.template = 'formio/element-view.html';
          }
          else if (typeof component.viewTemplate === 'function') {
            $scope.template = component.viewTemplate($scope);
          }
          else {
            $scope.template = component.viewTemplate;
          }

          // Set the component name.
          $scope.componentId = $scope.component.key;
          if ($scope.gridRow !== undefined) {
            $scope.componentId += ('-' + $scope.gridRow);
          }
          if ($scope.gridCol !== undefined) {
            $scope.componentId += ('-' + $scope.gridCol);
          }
        }
      ]
    };
  }
];
