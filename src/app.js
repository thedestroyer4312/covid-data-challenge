const button = document.getElementById('submit');
const output = document.querySelector(".result > p");
const coll = document.getElementsByClassName("collapsible");

main();

function main() {

    for (let i = 0; i < coll.length; i++)
    {
        coll[i].addEventListener('click', togglePanel);
        
        button.addEventListener('click', () => {
            let riskPer = Math.random() * 100;
            output.innerHTML = `Based on the data given, you are at a ${riskPer.toFixed(2)}% increased risk of COVID19.`;
        });
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
