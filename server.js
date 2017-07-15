const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let currRes = [];
let waitRes = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/tables', function (req, res){
    res.sendFile(path.join(__dirname, 'tables.html'));
})

app.get('/reserve', function(req, res){
    res.sendFile(path.join(__dirname, 'reservation.html'));
})

// Handle post request
app.post("/api/tables", function(req, res) {

    console.log(req.body);
    if (currRes.length < 5){
      currRes.push(req.body);
      console.log('Got a table!');
      res.status(200).send(true);
    }
    else {
      waitRes.push(req.body);
      console.log('On the waitlist :(');
      res.status(200).send(false);
    }
      
});
                 
app.get("/api/:viewjson", function(req, res) {
  var table = req.params.viewjson;

  if (table === 'tables'){
    res.json(currRes);
  } else if (table === 'waitlist'){
    res.json(waitRes);
  }
});


app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
})