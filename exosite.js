module.exports = function (RED) {
  "use strict";
  var request = require('request');

  function sendExosite(topic, payload, CIK){
    var myUrl = "http://m2.exosite.com/onep:v1/stack/alias";

    request.post({
      headers : {
        "X-Exosite-CIK" : CIK,
        "Content-Type" : "application/x-www-form-urlencoded; charset=utf-8",
        "Accept" : "application/xhtml+xml"
      },
      url : myUrl,
      body : `${topic}=${payload}`
    }, function(error, response, body) {
      if(error) {
        console.log("[Exosite] Error sending data");
      }
    });
  }

  function ExositeNode(n) {
    RED.nodes.createNode(this,n);

    this.on("input", function(msg) {
      var topic = msg.topic||n.topic;
      var payload = msg.payload;
      var CIK = msg.CIK||n.CIK;
      sendExosite(topic, payload, CIK);
    });
  }
  RED.nodes.registerType("exosite", ExositeNode);
}
