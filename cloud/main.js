Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});

// Defined in cloud/main.js on Parse server side
Parse.Cloud.define('pingReply', function(request, response) {
  var params = request.params;
  var customData = params.customData;

  if (!customData) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(customData).sender;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", sender);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": "The Giants scored!"},
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});


Parse.Cloud.define("sendPushNotification", function(request, response) {
        // var userId = request.params.userId;
        // var message = request.params.message;
        // var queryUser = new Parse.Query(Parse.User);
        var userId = JSON.parse(customData).userId;
        queryUser.equalTo('objectId', userId);
        var query = new Parse.Query(Parse.Installation);
        query.matchesQuery('user', queryUser);

        Parse.Push.send({
          where: query,
          data: {
            alert: message,
            badge: 0,
            sound: 'default'
          }
        }, {
          success: function() {
            console.log('##### PUSH OK');
            response.success();
          },
          error: function(error) {
            console.log('##### PUSH ERROR');
            response.error('ERROR');
          },
          useMasterKey: true
        });
});
