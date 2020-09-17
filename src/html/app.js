const button = document.getElementById('submit');
const output = document.querySelector(".result > p");
const graphSpace = document.querySelector(".graphsHere > p");
const coll = document.getElementsByClassName("collapsible");

main();

function main() {
    
    const dataProcessURL = 'http://localhost:3000/processData';

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    window.onload = async function () {
        let data = {
            age: "99",
            sex: "male",
            race: "white",
            income: "30k"
        };
        await fetch(dataProcessURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
              //print to website
              output.innerHTML = JSON.stringify(data);
              //output.innerHTML = `Based on the data given, you are at a ${data['number']}% increased risk of COVID19.`;
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

function submitForm(){
    console.log("submitForm has been called!");
}
