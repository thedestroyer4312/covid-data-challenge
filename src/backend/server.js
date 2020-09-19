const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = new Storage({
    keyFilename: process.env.PATHTOFILE
});

app.post('/testReadFile', function (request, response) {
    const file = storage.bucket('activity-risk').file('activityRiskJson.json');
    let buf = '';
    file.createReadStream()
        .on('data', (rawData) => {
            //read the file from the stream
            buf = buf + rawData;
        })
        .on('end', () => {
            //read the finished JSON file and calculate
            let activityRiskFile = JSON.parse(buf);
            let activityArr = request.body.activities;
            let riskLvl = 0;
            for(let task of activityArr) {
                riskLvl = riskLvl + activityRiskFile["activityRisk"][task];
            }
            response.header("Access-Control-Allow-Origin", "*");
            if(activityArr.length == 0) {
                response.send({
                    avgRisk: 0
                });
                return;
            }
            else {
                response.send({
                    avgRisk: riskLvl/(activityArr.length),
                });
            }
        })
        .on('error', () => {
            return console.log("ERROR");
        });

});

app.get('/', function (request, response) {
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
        "age": age,
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
  console.log(`Express server at http://localhost:${port}`);
});
