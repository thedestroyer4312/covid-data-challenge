const button = document.getElementById('submit');
const graphSpace = document.querySelector(".graphsHere > p");
const coll = document.getElementsByClassName("collapsible");
const userForm = document.getElementById('userInput');

// google cloud URL
const baseURL = 'https://covid19-dc.wn.r.appspot.com';

main();

/**
 * Adds event listeners for the clicking action on the dropdown collapsibles and the submit button
 * For the dropdowns, calls togglePanel(), which hides or expands the tab on click
 * For the submit button, calls printSurveyResponses() when the button is clicked
 */
function main() {

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    button.addEventListener('click', printSurveyResponses);
		// also, add an event listener for collecting responses
	  button.addEventListener('click', getResponses);
}
/*
 * Debugging function that takes the survey inputs and prints them at the bottom of the page at any given time
 */
async function printSurveyResponses() {

    let str = "";
    let formData = new FormData(userForm);
    for(let pair of formData) { //stored as pairs, (name, value).
        str = str + "<br>" + pair[0] + ', '+ pair[1];
    }
    document.getElementById('responsesHERE').innerHTML = str;

//https://www.learnwithjason.dev/blog/get-form-values-as-json/
        let userData = {
            age: formData.get("age"),
            sex: formData.get("sex"),
            race: formData.getAll("race"),
            income: formData.get("income"),
						// location: formData.get("location"),
					  familySize: formData.get("familySize"),	
						activities: formData.getAll("activities"),
						mask: formData.get("mask"),
						handwash: formData.get("handwash"),
						socDist: formData.get("socDist"),
        };
				
        await fetch(`${baseURL}/processData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(data => {
              //print to website
              document.getElementById('userAge').innerHTML = data["age:"]; //serverjs typo whoops
              document.getElementById('userAgeR').innerHTML = data.ageRisk;
              document.getElementById('userSex').innerHTML = data.sex;
              document.getElementById('userSexR').innerHTML = data.sexRisk;
              document.getElementById('userRace').innerHTML = data.race;
              document.getElementById('userRaceR').innerHTML = data.raceRisk;
              document.getElementById('userIncome').innerHTML = data.income;
              document.getElementById('userIncomeR').innerHTML = data.incomeRisk;
          })
          .catch(error => console.log("API error"));
}

function togglePanel() {
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
/**
 * Collects the responses in the form and returns said data as a JSON object using JSON.stringify()
 */
function getResponses(){

}

/**
 * Takes an input JSON string representing an object and sends it to the backend
 * Throws an exception for an undefined/null/NaN input
 */
function processResponses(responses){
  // check input
  if(!responses || isNaN(responses)){
    throw 'Parameter is null, NaN, or undefined';
  } 
  
	// from here, send to the backend
	fetch(`${baseURL}/processData`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(responses),
	})
		.then(serverResponse => serverResponse.json());
}
