let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "my-db";

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  const client = await MongoClient.connect(mongoUrlDocker);

  let db = client.db(databaseName);
  userObj['userid'] = 1;

  let myquery = { userid: 1 };
  let newvalues = { $set: userObj };

  await db.collection("users").updateOne(myquery, newvalues, {upsert: true}
    );

  await client.close();

  
  // Send response
  res.send(userObj);
});

app.get('/get-profile', async function (req, res) {
  // Connect to the db
    const client = await MongoClient.connect(mongoUrlDocker);

    let db = client.db(databaseName);

    let myquery = { userid: 1 };

    let result = await db.collection("users").findOne(myquery);

    await client.close();

    // db.collection("users").findOne(myquery, function (err, result) {
    //   if (err) throw err;
    //   response = result;
    //   client.close();

      // Send response
    res.send(result ? result : {});
    });
  


app.listen(3000, function () {
  console.log("app listening on port 3000!");
});