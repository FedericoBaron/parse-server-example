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
        var query = new Parse.Query(Parse.User);
        query.equalTo("objectId", request.params.objectId);
        // Find devices associated with these users
        var pushQuery = new Parse.Query(Parse.Installation);
        // need to have users linked to installations
        pushQuery.matchesQuery('user', query);

        Parse.Push.send({
          where: pushQuery,
          // Parse.Push requires a dictionary, not a string.
          data: {"alert": "You got a new request"},
          }, { success: function() {
          console.log("#### PUSH OK");
          }, error: function(error) {
          console.log("#### PUSH ERROR" + error.message);
          }, useMasterKey: true});

  response.success('success');
});

Parse.Cloud.define("sendPushNotificationAccepted", function(request, response) {
  var params = request.params;
  var objectId = params.objectId;
  var username = params.username;
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId", request.params.objectId);
  // Find devices associated with these users
  var pushQuery = new Parse.Query(Parse.Installation);
  // need to have users linked to installations
  pushQuery.matchesQuery('user', query);

  Parse.Push.send({
    where: pushQuery,
    // Parse.Push requires a dictionary, not a string.
    data: {"alert": username + " accepted your request"},
    }, { success: function() {
    console.log("#### PUSH OK");
    }, error: function(error) {
    console.log("#### PUSH ERROR" + error.message);
    }, useMasterKey: true});

  response.success('success');
});


Parse.Cloud.define("sendPushNotificationChannel", function(request, response) {
        var params = request.params;
        var channel = params.channel;
        var message = params.message;
        var pushQuery = new Parse.Query(Parse.Installation);
        pushQuery.equalTo("deviceType", "android");
        pushQuery.equalTo('channels', channel);

        Parse.Push.send({
          where: pushQuery,
          // Parse.Push requires a dictionary, not a string.
          data: {
            "title": "You received a new message",
            "alert": message},
          }, { success: function() {
          console.log("#### PUSH OK");
          }, error: function(error) {
          console.log("#### PUSH ERROR" + error.message);
          }, useMasterKey: true});

  response.success('success');
});
