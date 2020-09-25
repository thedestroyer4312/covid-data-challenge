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

/**
 * GET - Returns the json file
 *
 */
app.get('/getDataFile', function(request, response){
	const file = storage.bucket('processed_data-cv19dc').file('allDataJson.json');
    let buf = '';
    file.createReadStream()
        .on('data', (rawData) => {
            //read the file from the stream
            buf = buf + rawData;
        })
        .on('end', () => {
			// send the buffer, which is a JSON formatted string
			response.send(buf);
		})
		.on('error', () => {
			return console.error("ERROR");
		})
});

/**
 * POST - Receives user data and processes it, returning a json of risk factors.
 *
 */
app.post('/processData', function (request, response) {
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
            let riskyBehavior = false;
            let riskLvl = 0;
            //search through the JSON for each activity's risk level.
            for(let task of activityArr) {
                riskLvl = riskLvl + (riskDataFile["activityRisk"][task] * 20);
                if(riskDataFile["activityRisk"][task] == 5) riskyBehavior = true;
            }
            let avgRisk = 0;
            if(activityArr.length > 0) {
                avgRisk = (riskLvl/activityArr.length).toFixed(2);
                if(avgRisk >= 75) riskyBehavior = true;
            }

            //ageRisk
            let ageRange = "";
            let userAge = request.body.age;
			let ageRanges = [4, 17, 29, 39, 49, 64, 74, 84];
			let lowerAge = null, upperAge = null;

			/*
			 * Iterate through the array of age ranges until we find the minimal age greater than our user age
			 * i.e. the upper age boundary for our user. Then, set our upper age boundary variable to said boundary.
			 * For each iteration of the loop that this is not true, the lower age is set to the current.
			 * So, when the loop terminates, the lower age will be the previous, and the upper will be the next,
			 * creating the minimal interval for our age.
			 * Edge cases:
			 *		1. Age 0-4: The if statement will trigger on the first iteration,  and lowerAge will be left null
			 *		2. Age 85+: The if statement will never trigger, so upperAge will be left null
			 */
			for(let upperAgeBoundary of ageRanges){
				if(userAge <= upperAgeBoundary){
					upperAge = upperAgeBoundary;
					break;
			    }
				lowerAge = upperAgeBoundary;
			}

			// now, calculate our age based on our range
			if(!lowerAge){ 	// first, the edge case for the lowest age (0-lowest)
			    ageRange = `0-${ageRanges[0]}`;
			}else if(!upperAge) { // second edge case: maximum age
				ageRange = `${ageRanges[ageRanges.length - 1] + 1}+`;
			}else {
				ageRange = `${lowerAge + 1}-${upperAge}`;
			}

            let ageRisk = riskDataFile["ageRisk"][ageRange];

            let sexRisk = riskDataFile["sexRisk"][request.body.sex];

            let raceFormatted = "";
            let raceRisk = riskDataFile["raceRisk"][request.body.race];
            if(request.body.race == 'white_hisp') raceFormatted = "White: Hispanic or Latino";
            else if(request.body.race == 'white_nonHisp') raceFormatted = "White: Non-Hispanic";
            else if(request.body.race == 'black') raceFormatted = "Black/African American";
            else if(request.body.race == 'asian') raceFormatted = "Asian";
            else if(request.body.race == 'indian_alaskaNative') raceFormatted = "American Indian/Alaskan Native";
            else if(request.body.race == 'pacificIslander') raceFormatted = "Native Hawaiian/Other Pacific Islander";
            else raceFormatted = "Multiple Race";
            //if(location == MX) raceRisk = 0;

            let incomeStrings = ["less than $15,000", "$15,000-$25,000", "$25,000-$35,000", "$35,000-$50,000", "above $50,000"];
            let incomeID = parseInt(request.body.income.slice(-1), 10);
            let incomeFormatted = incomeStrings[incomeID];
            let incomeRisk = riskDataFile['incomeRisk'][request.body.income];

            let locationRisk = riskDataFile["locationRisk"][request.body.location];

            let jobRisk = riskDataFile['jobRisk'][request.body.job];

            let maskResponses = ["never wearing a mask", "wearing a mask"];
            let maskID = parseInt(request.body.mask.slice(-1), 10);
            let maskFormatted = maskResponses[maskID];
            let maskRisk = riskDataFile['maskRisk'][request.body.mask];

            let socDistStrings = ["less than 1 meter/3 feet", "1 meter/3 feet", "2 meters/6 feet", "more than 2 meters/6 feet"];
            let socDistID = parseInt(request.body.socDist.slice(-1), 10);
            let socDistFormatted = socDistStrings[socDistID];
            let socDistRisk = riskDataFile["socDistRisk"][request.body.socDist];

            //send back finished JSON.
            let respJSON = {
                age: request.body.age,
                ageRisk: ageRisk,
                sex: request.body.sex,
                sexRisk: sexRisk,
                race: raceFormatted,
                raceRisk: raceRisk,
                income: incomeFormatted,
                incomeRisk: incomeRisk,
                location: request.body.location,
                locationRisk: locationRisk,
                job: request.body.jobTitle,
                jobRisk: jobRisk,
                avgRisk: avgRisk,
                activityRisk: riskyBehavior,
                mask: maskFormatted,
                maskRisk: maskRisk,
                socDist: socDistFormatted,
                socDistRisk: socDistRisk,
            };
            response.header("Access-Control-Allow-Origin", "*");
            response.send(respJSON);
        })
        .on('error', () => {
            return console.error("ERROR");
        });
});

app.get('/', function (request, response) {
    response.send('Hello there!');
});

app.listen(port, () => {
  console.log(`Express server at http://localhost:${port}`);
});
