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
            let locationRisk = riskDataFile["locationRisk"][request.body.location];

            //send back finished JSON.
            //we send the user responses back because we want to format them.
            let respJSON = {
                age: request.body.age,
                ageRisk: ageRisk,
                sex: request.body.sex,
                sexRisk: -1,
                race: request.body.race, //format this
                raceRisk: -1,
                income: request.body.income, //format this
                incomeRisk: -1,
                location: request.body.location, //maybe???
                locationRisk: locationRisk,
                familySize: request.body.familySize,
                familySizeRisk: -1,
                job: request.body.job,
                jobRisk: -1,
                avgRisk: avgRisk,
                mask: request.body.mask, //format
                maskRisk: -1,
                socDist: request.body.socDist, //format
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
