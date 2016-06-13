core.controller('HomeCtrl', function ($scope, BingoFactory) {
   $scope.tonys = ['T','/assets/medallion.png','N','Y','S'];
   $scope.rows = BingoFactory.generate();

   $scope.fill = function (square) {
      if(!/\//.test(square.event)) square.status = !square.status;
   }

});
