const input=document.getElementById('cityname'),
searchbtn=document.getElementById('searchbtn'),
cityNameElement=document.getElementById('city'),
temp=document.getElementById('temp'),
description=document.getElementById('description'),
humidity=document.getElementById('humidity'),
wind=document.getElementById('wind'),
weatherIcon=document.getElementById('weather-icon'),
apiinfo=[];
//create a asynchronous function for making a call to the api
const apicall=async(cityName)=>{
    let api= `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`
    
    try {
        //use the fetch to call the api
        const response = await fetch(api)
        //parse to get into json format
        const json=await response.json();
        //push it to json
        apiinfo.push(json);
        //check if the city was not found
        if(apiinfo[0].cod == 404){
            cityNameElement.textContent-'city not found';
            return;
        }
         
        cityNameElement.textContent = `Weather in ${cityName}`
        console.log(apiinfo);
        temp.textContent = `${apiinfo[0].main.temp}°C` 
        description.textContent =` ${apiinfo[0].weather[0].description};`
        humidity.textContent = `Humidity: ${apiinfo[0].main.humidity}`
        wind.textContent = `Wind Speed: ${apiinfo[0].wind.speed} km/h`

        const iconCode = json.weather[0].icon;
        const iconUrl = `http:openweathermap.org/img/w/${iconCode}.png;`
        weatherIcon.src = iconUrl;

   } catch (error) {
    console.log('Error fetching data', error);
   }
}


searchbtn.addEventListener('click', ()=>{
    let cityname = input.value.toLowerCase();
    apicall(cityname);
    input.value = '';
    input.focus();
})

