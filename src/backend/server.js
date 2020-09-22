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

			// Trevor's alternative: iterate through an array of age upper boundaries to find the age range
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
			if(!lowerAge){ 	// first, the edge case for 0-4 years old
			    ageRange = "0-4";
			}else if(!upperAge) { // second edge case: over 85 years old
				ageRange = "85+";
			}else {
				ageRange = `${lowerAge + 1}-${upperAge}`;
			}

            let ageRisk = riskDataFile["ageRisk"][ageRange];

            let raceFormatted = "";
            if(request.body.race == 'white_hisp') raceFormatted = "White: Hispanic or Latino";
            else if(request.body.race == 'white_nonHisp') raceFormatted = "White: Non-Hispanic";
            else if(request.body.race == 'black') raceFormatted = "Black/African American";
            else if(request.body.race == 'asian') raceFormatted = "Asian";
            else if(request.body.race == 'indian_alaskaNative') raceFormatted = "American Indian/Alaskan Native";
            else if(request.body.race == 'pacificIslander') raceFormatted = "Native Hawaiian/Other Pacific Islander";
            else raceFormatted = "Multiple Race";

            let incomeStrings = ["Less than $15k", "$15k-$25k", "$25k-$35k", "$35k-$50k", "Above $50k"];
            let incomeID = parseInt(request.body.income.slice(-1), 10);
            let incomeFormatted = incomeStrings[incomeID];

            let locationRisk = riskDataFile["locationRisk"][request.body.location];

            let maskResponses = ["always wearing one outside", "wearing one around people and indoors, but not outside", "only wearing it sparingly", "never wearing a mask"];
            let maskID = parseInt(request.body.mask.slice(-1), 10);
            let maskFormatted = maskResponses[maskID];

            let socDistStrings = ["less than 1 meter/3 feet", "1 meter/3 feet", "2 meters/6 feet", "more than 2 meters/6 feet"];
            let socDistID = parseInt(request.body.socDist.slice(-1), 10);
            let socDistFormatted = socDistStrings[socDistID];

            //send back finished JSON.
            let respJSON = {
                age: request.body.age,
                ageRisk: ageRisk,
                sex: request.body.sex,
                sexRisk: -1,
                race: raceFormatted,
                raceRisk: -1,
                income: incomeFormatted,
                incomeRisk: -1,
                location: request.body.location, //maybe???
                locationRisk: locationRisk,
                familySize: request.body.familySize,
                familySizeRisk: -1,
                job: request.body.job, //format
                jobRisk: -1,
                avgRisk: avgRisk,
                mask: maskFormatted,
                maskRisk: -1,
                socDist: socDistFormatted,
                socDistRisk: -1,
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
