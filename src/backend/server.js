const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/getExcelFile', async function(request, response, next){
    const filePath = '../../Cleaned Data/Job data.xlsx';

    let workbook = await XLSX.readFile(filePath);
    
    // console.log(workbook);

    // convert workbook to array of JSON objects
    let JSONarray = await XLSX.utils.sheet_to_json(workbook.SheetNames['Sheet1']);

    console.log(JSONarray);

    response.header("Access-Control-Allow-Origin", "*");
    response.send(JSON.stringify(JSONarray));
});

app.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`);
});
