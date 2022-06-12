function sendData () {
    // GET FORM DATA
    let city = document.querySelector("#city").value;
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=20d8d13f0ee85a2f0a86c8e611bae675"
    
    // INIT FETCH POST
    fetch(url).then((response)=>{ return response.json();}).then(data=>{
        if (data.cod == 404) {
            document.querySelector("#city-name").innerHTML = "City not found";
            document.querySelector("#city-weather").innerHTML = "";
            document.querySelector("#city-degree").innerHTML = "";
            return false
        } else if (data.cod != 200) {
            document.querySelector("#city-name").innerHTML = "An unknown error occurred";
            document.querySelector("#city-weather").innerHTML = "";
            document.querySelector("#city-degree").innerHTML = "";
        }
        
        document.querySelector("#city-name").innerHTML = data.name;
        document.querySelector("#city-weather").innerHTML = data.weather[0].main;
        document.querySelector("#city-degree").innerHTML = (data.main.temp - 273.15).toFixed(1) + "°C";

    })
    
    // PREVENT FORM SUBMIT
    return false;
}