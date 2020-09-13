const button = document.getElementById('submit');
const output = document.querySelector(".result > p");
const graphSpace = document.querySelector(".graphsHere > p");
const coll = document.getElementsByClassName("collapsible");

main();

function main() {

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    window.addEventListener('load', async (event) => {

      fetch('http://localhost:3000/getRandomNumber')
        .then(response => response.json())
        .then(data => {
            //print to website
            output.innerHTML = `Based on the data given, you are at a ${data['number']}% increased risk of COVID19.`;
        })
        .catch(error => console.log("API error"));

      //this is where the graphs go
      const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
      let myImage = new Image(file.width, file.height);
      myImage.src = file;
      graphSpace.appendChild(myImage);
    });
}

function togglePanel() {
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
