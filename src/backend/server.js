const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getReq', function (request, response) {
  response.send('Hello there!');
});

app.get('/getRandomNumber', function (request, response, next) {

    let randomNum = {
        "number" : Math.floor(Math.random() * 100),
    }
    response.header("Access-Control-Allow-Origin", "*");
    response.send(randomNum);
});

app.post('/processData', function (request, response, next) {
    let age = request.body.age;
    let sex = request.body.sex;
    let race = request.body.race;
    let income = request.body.income;

    let respJSON = {
        "age:": age,
        "ageRisk": Math.floor(Math.random() * 100),
        "sex": sex,
        "sexRisk": Math.floor(Math.random() * 100),
        "race": race,
        "raceRisk": Math.floor(Math.random() * 100),
        "income": income,
        "incomeRisk": Math.floor(Math.random() * 100)
    };
    response.header("Access-Control-Allow-Origin", "*");
    response.send(respJSON);
});

app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`);
});
