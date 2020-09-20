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
    const file = storage.bucket('processed_data-cv19dc').file('allDataJson.json');
    let buf = '';
    file.createReadStream()
        .on('data', (rawData) => {
            //read the file from the stream
            buf = buf + rawData;
        })
        .on('end', () => {
            let riskDataFile = JSON.parse(buf);
            let activityArr = request.body.activities;
            let riskLvl = 0;
            //search through the JSON for each activity's risk level.
            for(let task of activityArr) {
                riskLvl = riskLvl + (riskDataFile["activityRisk"][task] * 20);
            }
            let avgRisk = 0;
            if(activityArr.length > 0) avgRisk = (riskLvl/activityArr.length).toFixed(2);

            //ageRisk
            let ageRange = "";
            let userAge = request.body.age;
            if(userAge <= 4) ageRange = "0-4";
            else if(userAge <= 17) ageRange = "5-17";
            else if(userAge <= 29) ageRange = "18-29";
            else if(userAge <= 39) ageRange = "30-39";
            else if(userAge <= 49) ageRange = "40-49";
            else if(userAge <= 64) ageRange = "50-64";
            else if(userAge <= 74) ageRange = "65-74";
            else if(userAge <= 84) ageRange = "75-84";
            else ageRange = "85+"; //lmao find a better way to do this.
            let ageRisk = riskDataFile["ageRisk"][ageRange];

            ///////////TODO///////////
            //sexRisk
            //raceRisk
            //incomeRisk
            // locationRisk
    		//familySize
    		//activities
    		//mask
    		//handwash
    		//socDist

            //send back finished JSON.
            let respJSON = {
                age: request.body.age,
                ageRisk: ageRisk,
                sex: request.body.sex,
                sexRisk: 0,
                race: request.body.race,
                raceRisk: 0,
                income: request.body.income,
                incomeRisk: 0,
                activityRisk: riskLvl,
                avgRisk: avgRisk
            };
            
            response.header("Access-Control-Allow-Origin", "*");
            response.send(respJSON);
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

app.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`);
});
