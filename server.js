/* 
  Module dependencies:
  
  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
*/
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser")
  , _ = require("underscore");

/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number 
app.set("port", 8080);

//Specify the views folder
app.set("views", __dirname + "/views");

//View engine is Jade
app.set("view engine", "jade");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {
 
  //Render the view called "index"
  response.render("index");

});

//POST method to create a chat message
app.post("/message", function(request, response) {

  //The request body expects a param named "message"
  var message = request.body.message;

  //If the message is empty or wasn't sent it's a bad request
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
