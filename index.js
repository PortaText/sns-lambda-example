exports.handler = function(event, context, callback) {
  var apiKey = 'your_api_key';
  var data = JSON.parse(event.Records[0].Sns.Message);
  var from = data.from;
  var to = data.to;
  var text = data.text;
  var portatext = new (require('portatext')).ClientHttp();
  portatext
    .setLogger(console)
    .setApiKey(apiKey)
    .sms()
    .from(from)
    .to(to)
    .text(text)
    .post()
    .then(function(result) {
      if(!result.success) {
        return callback(JSON.stringify(err));
      }
      return callback();
    })
    .catch(function(err) {
      return callback(JSON.stringify(err));
    });
  ;
}
