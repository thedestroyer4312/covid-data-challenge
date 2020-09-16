const button = document.getElementById('submit');
const graphSpace = document.querySelector(".graphsHere > p");
const coll = document.getElementsByClassName("collapsible");

main();

function main() {

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    window.onload = async function () {
        let userData = {
            age: "99",
            sex: "male",
            race: "white",
            income: "30k"
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
              document.getElementById('userAge').innerHTML = data.age;
              document.getElementById('userAgeR').innerHTML = data.ageRisk;
              document.getElementById('userSex').innerHTML = data.sex;
              document.getElementById('userSexR').innerHTML = data.sexRisk;
              document.getElementById('userRace').innerHTML = data.race;
              document.getElementById('userRaceR').innerHTML = data.raceRisk;
              document.getElementById('userIncome').innerHTML = data.income;
              document.getElementById('userIncomeR').innerHTML = data.incomeRisk;
          })
          .catch(error => console.log("API error"));

        //this is where the graphs go
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        let myImage = new Image(file.width, file.height);
        myImage.src = file;
        graphSpace.appendChild(myImage);
    }
}

function togglePanel() {
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
