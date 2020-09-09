const button = document.getElementById('submit');
const output = document.querySelector(".result > p");

main();

function main() {
    button.addEventListener('click', () => {
        let riskPer = Math.random() * 100;
        output.innerHTML = `Based on the data given, you are at a ${riskPer}% increased risk of COVID19.`;
    });
}
