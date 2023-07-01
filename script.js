const input = document.querySelector('#input');
const countryContainer = document.querySelector('#country-container');
let countriesInfo = [];

const getCountry = async ()=>{
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countriesInfo = [...data];
    } catch (error) {
        alert('country api error');
    }
};
getCountry();
const getWeather = async(lat,lon) =>{
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74c2a8f9872ea2e46f48453a09a41371&units=metric`);
        const weatherAPI = await weatherResponse.json();
        return weatherAPI
    } catch (error) {
        alert('weather api error')
    }
} 
input.addEventListener('input', async e =>{
    e.preventDefault();
    const countriesInfoFiltered = countriesInfo.filter(info => info.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
    console.log(countriesInfoFiltered);///////////////////////////////////
    countryContainer.innerHTML = '';
    countryContainer.style.flexDirection = 'row';
    if (countriesInfoFiltered.length > 10 && countriesInfoFiltered.length < 200) {
        countryContainer.innerHTML= `<h2>Your search must be more specific.</h2>`
    }
    if (countriesInfoFiltered.length > 0 && countriesInfoFiltered.length <= 10) {
        for (let index = 0; index < countriesInfoFiltered.length; index++) {
            countryContainer.innerHTML +=`
            <div class ="country-card">
                <img src="${countriesInfoFiltered[index].flags.svg}" class = "flag">
                <p class = "country-name">${countriesInfoFiltered[index].name.common}</p>
            </div>
            ` 
        }
    }    
    if (countriesInfoFiltered.length === 1) {
        const lat = countriesInfoFiltered[0].latlng[0]
        const lon = countriesInfoFiltered[0].latlng[1]
        weatherInfo = await getWeather(lat,lon);
        console.log(weatherInfo);
        countryContainer.innerHTML =`
        <div class = "unique-card">
            <img src="${countriesInfoFiltered[0].flags.svg}" class = "unique-flag">
            <p class = "unique-text">Country: ${countriesInfoFiltered[0].name.common}</p>
            <p class = "unique-capital">Capital: ${countriesInfoFiltered[0].capital}</p>
            <p class = "unique-population">Population: ${countriesInfoFiltered[0].population}</p>
            <p class = "unique-region">Region: ${countriesInfoFiltered[0].region}</p>
            <p class = "unique-temperature">Temp: ${weatherInfo.main.temp} C° </p>
            <p class = "unique-temperature">Weather: ${weatherInfo.weather[0].description}</p>
        </div>
        <div class = "shadow">
        </div>
        ` 
        countryContainer.style.flexDirection = 'column';
    }
    if (countriesInfoFiltered.length === 0) {
        countryContainer.innerHTML= `<h2>Country does not exist. Try again</h2>`
    }

});


