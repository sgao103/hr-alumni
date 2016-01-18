angular.module('chat.factory', [])

.factory('ChatFactory', function($rootScope) {

  var username = null;
  var userid = null;
  var ws = null;

  var openConnection = function() {
    username = window.localStorage.getItem('hr-alum.user.name');
    userid = window.localStorage.getItem('hr-alum.user.id');
    host = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(host);
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
          username: username,
          userid: userid
        }
      }));
    }
  }

  var closeConnection = function() {
    ws.close();
  }

  var messages = [];

  var getUser = function() {
    return username;
  }

  var getUserid = function() {
    return userid;
  }

  var sendMessage = function(text) {
    ws.send(JSON.stringify({
      command: 'message',
      data: {
        userid: userid,
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
        userid: userid,
        text: text
      }
    }));
  }

  return {
    openConnection: openConnection,
    closeConnection: closeConnection,
    getUser: getUser,
    getUserid: getUserid,
    messages: messages,
    sendMessage: sendMessage,
    sendPrivateMessage: sendPrivateMessage
  }
})
