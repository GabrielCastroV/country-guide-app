const input = document.querySelector('#input');
const countryContainer = document.querySelector('#country-container');
let countriesInfo = [];

const getCountry = async ()=>{ //obtengo la info de todos los paises una sola vez
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countriesInfo = [...data]; // guardo los datos en un array para manipularlos luego
    } catch (error) {
        alert('country api error');
    }
};
getCountry(); // obtengo la info del clima una sola vez
const getWeather = async(lat,lon) =>{ // recibe dos parametros diferentes, en este caso la latitud y longitud del pais seleccionado
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74c2a8f9872ea2e46f48453a09a41371&units=metric`);
        const weatherAPI = await weatherResponse.json();
        return weatherAPI;
    } catch (error) {
        alert('weather api error');
    }
} 
input.addEventListener('input', async e =>{
    e.preventDefault();
    const countriesInfoFiltered = countriesInfo.filter(info => info.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
    countryContainer.innerHTML = '';
    countryContainer.style.flexDirection = 'row';
    countryContainer.style.alignItems = 'center';

    if (countriesInfoFiltered.length > 10 && countriesInfoFiltered.length < 200) {
        countryContainer.innerHTML= `<h2>Your search must be more specific.</h2>`;
    }
    if (countriesInfoFiltered.length > 0 && countriesInfoFiltered.length <= 10) {
        countryContainer.style.alignItems = 'start';
        for (let index = 0; index < countriesInfoFiltered.length; index++) {
            countryContainer.innerHTML +=`
            <div class ="country-card">
                <img src="${countriesInfoFiltered[index].flags.svg}" class = "flag">
                <p class = "country-name">${countriesInfoFiltered[index].name.common}</p>
            </div>
            ` ;
        }
    }    
    if (countriesInfoFiltered.length === 1) {
        document.body.focus(); // cierro el teclado del usuario desviando el focus a algo diferente del input. (exp de usuario)
        const lat = countriesInfoFiltered[0].latlng[0]; //extraigo los datos del pais seleccionado para luego usarlos en la llamada de la funcion del clima.
        const lon = countriesInfoFiltered[0].latlng[1];
        weatherInfo = await getWeather(lat,lon);
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
        ` ;
        countryContainer.style.flexDirection = 'column';
        countryContainer.style.alignItems = 'center'
        countryContainer.style.justifyContent = 'center'
    }
    if (countriesInfoFiltered.length === 0) {
        document.body.focus();
        countryContainer.innerHTML= `<h2>Country does not exist. Try again</h2>`;
    }
});


