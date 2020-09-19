
function jobLookup(){
  const jobarray = xlsxToObjArr();

  // get the search bar element and then its value (the user text)
  let input = document.getElementById('searchInput');
  let text = input.value.toLowerCase();
  
  // construct the inner HTML string
  let str = constructString(text, jobArray);

  // now manipulate the inner HTML
  let searchBarElement = document.getElementById('jobsGoHere');
  searchBarElement.innerHTML = str;
  return;
}

function constructString(text, jobArray){
  // criteria for match: indexOf(text) != -1 for each phrase
  let str = "";
  const openTag = '<option value=';
  const closeTag = '</option>';
  // format:
  // <option value="VALUE_GOES_HERE">TEXT_GOES_HERE</option>
  for(let JSONobj of jobArray){
  }
  return str;
}

/* reads xlsx file and returns an array of json objects where each json object is one row of the sheet
 * from https://stackoverflow.com/questions/8238407/how-to-parse-excel-xls-file-in-javascript-html5
 */
function xlsxToObjArr(){
  // make request to the server, which will handle this
  const url = 'http://localhost:3000/getExcelFile';

  return response;
}
