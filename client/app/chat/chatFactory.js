angular.module('chat.factory', ['userFactory'])

.factory('ChatFactory', function($rootScope, User) {
  host = location.origin.replace(/^http/, 'ws');
  ws = new WebSocket(host);

  var messages = [];
  var username = User.details.name;

  var getUser = function() {
    return username;
  }

  ws.onmessage = function(data) {
    var msg = JSON.parse(data.data);
    //MUST wrap any incoming data from websockets that intend to modify the scope with $rootScope.$apply
    $rootScope.$apply(messages.push(msg));
  };

  ws.onopen = function() {
    //immediately register the websocket with the server on creation of websocket
    ws.send(JSON.stringify({
      command: 'register',
      data: {
        username: username
      }
    }));
  }

  var sendMessage = function(text) {
    ws.send(JSON.stringify({
      command: 'message',
      data: {
        username: username,
        text: text
      }
    }));
  }

  var sendPrivateMessage = function(text, to) {
    ws.send(JSON.stringify({
      command: 'privateMessage',
      data: {
        to: to,
        username: username,
        text: text
      }
    }));
  }

  return {
    getUser: getUser,
    messages: messages,
    sendMessage: sendMessage,
    sendPrivateMessage: sendPrivateMessage
  }
})
