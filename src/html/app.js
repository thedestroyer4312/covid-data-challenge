const button = document.getElementById('submit');
const graphSpace = document.querySelector(".graphsHere > p");
const coll = document.getElementsByClassName("collapsible");
const userForm = document.getElementById('userInput');

main();

function main() {

    const dataProcessURL = 'http://localhost:3000/processData';

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    button.addEventListener('click', printSurveyResponses);
}

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
            race: formData.get("race"),
            income: formData.get("income")
        };

        await fetch('https://covid19-dc.wn.r.appspot.com/processData', {
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

function submitForm(){
    console.log("submitForm has been called!");
}
