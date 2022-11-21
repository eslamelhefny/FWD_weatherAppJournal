/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate =d.getDate() + "//" + d.getMonth() + "//" + d.getFullYear();
let newDate = d.toLocaleDateString();

// my own api key
const preKey = ",&appid="
const apiKey = "919f9dd662462e9a5df64c14987ba2ae";
const postKey = "&units=metric";
// base url to get weather
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// variable to save full server URL
const server = "http://127.0.0.1:4000";
// div to tell user the error
const UImessage = document.getElementById("error");
//
const GenerateButton = document.getElementById("generate");

// asynchronous function to get wether value from api
const rerieveData = async (zip) => {
  const request = await fetch(url + zip + preKey + apiKey +postKey );
  try {
    const allData = await request.json();
    console.log(allData);
    return allData;
  } catch (error) {
    UImessage.innerHTML = error;
    document.getElementById("entryHolder").style.opacity = 0;
    console.log(error);
  }
};
// asynchronous function to post wether value to server
const postData = async (url = "", data = {}) => {
  console.log(data);

  const res = await fetch(url, {
    method: "POST", //GET,POST,PUT,DELETE
    credentials: "same-origin", //include , same-origin , omit
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const recvedData = await res.json();
    console.log("save new data", recvedData);
    return recvedData;
  } catch (error) {
    console.log(error); //print error into console
  }
};

// update data to UI
const updateData = async () => {
  const res = await fetch(server + "/all");
  try {
    const newData = await res.json();
    document.getElementById("temp").innerHTML = newData.temp + "&degc";
    document.getElementById("city").innerHTML = newData.city;
    document.getElementById("date").innerText = newData.newDate;
    document.getElementById("content").innerText = newData.description;
  } catch (error) {
    console.log(error);
  }
};

// handle click event on generate button
GenerateButton.addEventListener("click", performAction);

function performAction(w) {
  const ZipCode = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  rerieveData(ZipCode).then((data) => {
    if (data) {
      let info = {
        newDate,
        city:data.name,
        temp: Math.round(data.main.temp),
        description:data.weather[0].description ,
        feel,
      };
      postData(server + "\\add", info);

      updateData();

 
    }
  });
}
