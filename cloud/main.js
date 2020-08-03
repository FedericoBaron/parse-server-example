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
        var params = request.params;
        // var customData = params.customData;

        // if (!customData) {
        //   response.error("Missing customData!")
        // }

        //var userId = JSON.parse(customData).userId;
        var userId = params.userId
        var queryUser = new Parse.Query(Parse.User);
        queryUser.equalTo('objectId', userId);
        var query = new Parse.Query(Parse.Installation);
        query.matchesQuery('user', queryUser);

        Parse.Push.send({
          where: query,
          // Parse.Push requires a dictionary, not a string.
          data: {"alert": "WE SCORED!"},
          }, { success: function() {
          console.log("#### PUSH OK");
          }, error: function(error) {
          console.log("#### PUSH ERROR" + error.message);
          }, useMasterKey: true});

  response.success('success');
        // Parse.Push.send({
        //   where: query,
        //   data: {
        //     alert: "message",
        //     badge: 0,
        //     sound: 'default'
        //   }
        // }, {
        //   success: function() {
        //     console.log('##### PUSH OK');
        //     response.success();
        //   },
        //   error: function(error) {
        //     console.log('##### PUSH ERROR');
        //     response.error('ERROR');
        //   },
        //   useMasterKey: true
        // });
});

Parse.Cloud.define("sendPushNotificationChannel", function(request, response) {
        var params = request.params;
        var channel = params.channel;
        pushQuery.equalTo("deviceType", "android");
        pushQuery.equalTo('channels', channel);

        Parse.Push.send({
          where: pushQuery,
          // Parse.Push requires a dictionary, not a string.
          data: {"alert": "WE SCORED!"},
          }, { success: function() {
          console.log("#### PUSH OK");
          }, error: function(error) {
          console.log("#### PUSH ERROR" + error.message);
          }, useMasterKey: true});

  response.success('success');
});
