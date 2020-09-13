const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.get('/getReq', function (request, response) {
  response.send('Hello there!');
});

app.get('/getRandomNumber', function (request, response, next) {

    let randomNum = {
        "number" : Math.floor(Math.random() * 1234),
    }
    response.header("Access-Control-Allow-Origin", "*");
    response.send(randomNum);
});

app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`);
});

app.use(cors());
