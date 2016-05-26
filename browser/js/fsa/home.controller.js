app.controller('HomeCtrl', function ($scope, BingoFactory) {
   $scope.greeting = 'Hi Justin';
   $scope.rows = [['My','Name','Is','Jason','Unger'],['All','Shall','Bow','Before','Me'],['How','Much','Wood','Could'],['A','Woodchuck','Chuck','If','A'],[]]
   console.log(BingoFactory.generate())
});
