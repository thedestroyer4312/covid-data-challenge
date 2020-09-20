const button = document.getElementById('submit');
const coll = document.getElementsByClassName("collapsible");
const userForm = document.getElementById('userInput');

// google cloud URL
const baseURL = 'https://covid19-dc.wn.r.appspot.com';
//'http://localhost:3000';
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
    let formData = new FormData(userForm);

    let userData = {
        age: formData.get("age"),
        sex: formData.get("sex"),
        race: formData.get("race"),
        income: formData.get("income"),
		// location: formData.get("location"),
		familySize: formData.get("familySize"),
		activities: formData.getAll("activities"),
		mask: formData.get("mask"),
		handwash: formData.get("handwash"),
		socDist: formData.get("socDist"),
    };

    //debug //document.getElementById('responsesHERE').innerHTML = userData;
        await fetch(`${baseURL}/testReadFile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(data => {
              //print to website
              document.getElementById('userAge').innerHTML = data.age;
              document.getElementById('userAgeR').innerHTML = data.ageRisk;
              document.getElementById('userSex').innerHTML = data.sex;
              document.getElementById('userSexR').innerHTML = data.sexRisk;
              document.getElementById('userRace').innerHTML = data.race;
              document.getElementById('userRaceR').innerHTML = data.raceRisk;
              document.getElementById('userIncome').innerHTML = data.income;
              document.getElementById('userIncomeR').innerHTML = data.incomeRisk;

              document.getElementById('totRiskLevel').innerHTML = data.activityRisk;
              document.getElementById('avgRiskLevel').innerHTML = data.avgRisk;
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
