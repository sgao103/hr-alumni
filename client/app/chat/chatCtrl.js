angular.module('chat.controller', ['ui.router', 'luegg.directives', 'userFactory'])

.controller('ChatCtrl', ['$scope', 'ChatFactory', 'User', function($scope, ChatFactory, User) {
  $scope.message = '';
  $scope.messages = ChatFactory.messages;
  $scope.visible = User.details.loggedIn;

  //sends a message to all clients
  $scope.sendMessage = function() {
    ChatFactory.sendMessage($scope.message);
    $scope.message = '';
    console.log($scope.visible);
  }

  //sends a private message to a specific client
  $scope.sendPrivateMessage = function(to, noreply) {
    if (ChatFactory.getUser() !== to && !noreply) {
      var msg = prompt('Private Message ' + to + ':');
      ChatFactory.sendPrivateMessage(msg, to);
    }
  }

  //converts a string to a unique color hex code
  $scope.nameToColor = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    var hex = '#' + (hash % 16777215).toString(16);
    return hex;
  }
}])

//custom directive for enter keypress
.directive('onEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.onEnter, {
            'event': event
          });
        });

        event.preventDefault();
      }
    });
  };
});
