const button = document.getElementById('submit');
const userForm = document.getElementById('userInput');

// google cloud URL
const baseURL = 'https://covid19-dc.wn.r.appspot.com';
//const baseURL = 'http://localhost:3000'; //for testing

populateLocations();
/*
* Debugging function that takes the survey inputs and prints them at the bottom of the page at any given time
*/
async function printSurveyResponses() {
    let formData = new FormData(userForm);
    try {
        let jobTitle = document.getElementById(`${formData.get('job')}`).labels[0].textContent;
    } catch (error) {
        alert("Something in the form has not been filled out!" +"\n¡Algo en el formulario no se ha completado!");
        currentTab = 0;
        return;
    }
    let userData = {
        age: formData.get("age"),
        sex: formData.get('sex') + formData.get("location").substring(0, 2),
        race: formData.get("race"),
        income: formData.get("income"),
        location: formData.get("location"),
        job: formData.get("job"),
        jobTitle: document.getElementById(`${formData.get('job')}`).labels[0].textContent,
        activities: formData.getAll("activities"),
        mask: formData.get("mask"),
        handwash: formData.get("handwash"),
        socDist: formData.get("socDist"),
        lastCheckbox: formData.get("legalBox")
    };

    for(let factor of Object.keys(userData)) { //check if form is incomplete
        if(!userData[factor] || userData[factor] == null)
        {
            alert("Something in the form has not been filled out!" +"\n¡Algo en el formulario no se ha completado!");
            currentTab = 0;
            return;
        }
    }

    //debug console.log(userData);
    await fetch(`${baseURL}/processData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => { //print to website
        //console.log(data); //debug

        for (let key of Object.keys(data)) { //dynamically display results.
            let id = key + "User";
            if(key == 'activityRisk') continue;
            document.getElementById(id).innerHTML = data[key];
            let sliderID = document.getElementById(key + "Slider");
            if(sliderID != null) sliderID.value = data[key];
        }

		// display region
		let regionImages = document.getElementsByClassName('region');
		for(let image of regionImages){
			image.style.display = 'none';
		}
		if(data.location.substring(0, 2) === "MX"){
			// show/hide based on usa/mexico
			document.getElementById('us_age').style.display = 'none';
			document.getElementById('usa_sex').style.display = 'none';
			document.getElementById('usa_race').style.display = 'none';
            document.getElementById('usa_income').style.display = 'none';
			document.getElementById('mexico_age').style.display = 'block';
			document.getElementById('mexico_sex').style.display = 'block';

			switch(data.location.substring(3)){
				case 'BC':
				case 'BS':
				case 'CH':
				case 'SI':
				case 'SO':
					document.getElementById('region_northwest_mexico').style.display = 'block';
					break;
				case 'CO':
				case 'DG':
				case 'NL':
				case 'SL':
				case 'TM':
					document.getElementById('region_northeast_mexico').style.display = 'block';
					break;
				case 'DF':
				case 'EM':
				case 'GR':
				case 'HG':
				case 'MO':
				case 'PU':
				case 'TL':
					document.getElementById('region_central_mexico').style.display = 'block';
					break;
				case 'CM':
				case 'CS':
				case 'OA':
				case 'QR':
				case 'TB':
				case 'VE':
				case 'YU':
					document.getElementById('region_southeast_mexico').style.display = 'block';
					break;
				default:
					document.getElementById('region_west_mexico').style.display = 'block';
			}
		}else{
			document.getElementById('us_age').style.display = 'block';
			document.getElementById('usa_sex').style.display = 'block';
			document.getElementById('usa_race').style.display = 'block';
			document.getElementById('mexico_age').style.display = 'none';
			document.getElementById('mexico_sex').style.display = 'none';
			switch(data.location.substring(3)){
				case 'DE':
				case 'DC':
				case 'ME':
				case 'NJ':
				case 'NY':
				case 'NC':
				case 'PA':
				case 'SC':
				case 'VA':
				case 'WV':
					document.getElementById('region_atlantic_seaboard').style.display = 'block';
					break;
				case 'AL':
				case 'FL':
				case 'GA':
				case 'LA':
				case 'MS':
				case 'NM':
				case 'OK':
				case 'TN':
				case 'TX':
					document.getElementById('region_sunbelt').style.display = 'block';
					break;
				case 'AR':
				case 'IL':
				case 'IN':
				case 'IA':
				case 'KY':
				case 'MI':
				case 'MN':
				case 'MO':
				case 'OH':
				case 'WI':
					document.getElementById('region_midwest').style.display = 'block';
					break;
				case 'CT':
				case 'ME':
				case 'MA':
				case 'NH':
				case 'RI':
				case 'VT':
					document.getElementById('region_new_england').style.display = 'block';
					break;
				case 'AK':
				case 'AZ':
				case 'CA':
				case 'HI':
				case 'NV':
				case 'OR':
				case 'WA':
					document.getElementById('region_western_usa').style.display = 'block';
					break;
				default:
					document.getElementById('region_mountain').style.display = 'block';
			}
		}

        //display tips depending on what choices the user made.
        let hra = document.getElementById('highRiskActivity');
        let lra = document.getElementById('lowRiskActivity');
        if(data["activityRisk"] == true) {
            lra.style.display = "none";
            hra.style.display = "block";
        }
        else {
            hra.style.display = "none";
            lra.style.display = "block";
        }

        let yesMask = document.getElementById('mask');
        let noMask = document.getElementById('noMask');
        if(data["mask"] == "never wearing a mask") {
            yesMask.style.display = "none";
            noMask.style.display = "block";
        }
        else {
            noMask.style.display = "none";
            yesMask.style.display = "block";
        }

        let noSD = document.getElementById('noSocialDist');
        let yesSD = document.getElementById('socialDist');
        if(formData.get('socDist') == 'socDist1' || formData.get('socDist') == 'socDist0') {
            yesSD.style.display = "none";
            noSD.style.display = "block";
        }
        else {
            noSD.style.display = "none";
            yesSD.style.display = "block";
        }
    })
    .catch(error => console.error("API error: " + error));
}

/**
 * Populates the locations datalist dropdown by retrieving the actual JSON file via a GET request to
 * getDataFile
 */
function populateLocations(){
	fetch(`${baseURL}/getDataFile`)
	.then(response => response.json())
	.then(riskDataObj => {
		// the object is a plain JS object now, already destructured from JSON
		let locationDataObj = riskDataObj.locationRisk;
		let datalist = document.getElementById('locationList');
		let str = '';
		for(let loc in locationDataObj){
			str += `<option value="${loc}">`;
		}
		datalist.innerHTML = str;
	})
	.catch(error => console.error("API error: " + error));
}

////////////////////////////////////////////////////
// Special Thanks to W3 Schools for this tutorial //
//  Modified slightly to include a retake button  //
////////////////////////////////////////////////////
let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
        document.getElementById("nextBtn").style.backgroundColor = "lightGreen";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
        document.getElementById("nextBtn").style.backgroundColor = "azure";
    }
    if (n == (x.length - 1)) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "Retake";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab == x.length - 1) {
        //display results here!
        printSurveyResponses();
    }
    if( currentTab >= x.length) {
        //reset
        document.getElementById("userInput").reset();
        currentTab = 0;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}
