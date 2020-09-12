const button = document.getElementById('submit');
const output = document.querySelector(".result > p");
const graphSpace = document.querySelector(".graphs > p");
const coll = document.getElementsByClassName("collapsible");

main();

function main() {

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
    }

    window.addEventListener('load', async (event) => {
      let riskPer = Math.random() * 100;
      output.innerHTML = `Based on the data given, you are at a ${riskPer.toFixed(2)}% increased risk of COVID19.`;

      const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
      let myImage = new Image(file.width, file.height);
      myImage.src = file;
      document.body.appendChild(myImage);
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
