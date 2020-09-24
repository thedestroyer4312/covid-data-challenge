const button = document.getElementById('submit');
const userForm = document.getElementById('userInput');

// google cloud URL
const baseURL = 'https://covid19-dc.wn.r.appspot.com';
//const baseURL = 'http://localhost:3000'; //for testing

/*
* Debugging function that takes the survey inputs and prints them at the bottom of the page at any given time
*/
async function printSurveyResponses() {
    let formData = new FormData(userForm);
    try {
        let jobTitle = document.getElementById(`${formData.get('job')}`).labels[0].textContent;
    } catch (error) {
        alert("Something in the form has not been filled out!");
        currentTab = 0;
        return;
    }
    let userData = {
        age: formData.get("age"),
        sex: formData.get("sex"),
        race: formData.get("race"),
        income: formData.get("income"),
        location: formData.get("location"),
        job: formData.get("job"),
        jobTitle: document.getElementById(`${formData.get('job')}`).labels[0].textContent,
        activities: formData.getAll("activities"),
        mask: formData.get("mask"),
        handwash: formData.get("handwash"), //only if theres data.
        socDist: formData.get("socDist"),
        lastCheckbox: formData.get("legalBox")
    };

    for(let factor of Object.keys(userData)) { //check if form is incomplete
        if(userData[factor] == null || !userData[factor])
        {
            alert("Something in the form has not been filled out!"); //spanish here!
            currentTab = 0;
            return;
        }
    }

    //debug console.log(userData);
    await fetch(`${baseURL}/testReadFile`, {
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
    .catch(error => console.log("API error: " + error));
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
