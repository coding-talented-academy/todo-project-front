const weather = document.querySelector("#weather")
const city = document.querySelector("#city")

const API_KEY = "c9a8ceddc977bc13f5f44521d56fe89c";
const COORDS = "coords" // Key - Value
let isTempData = true;

//api call 후 날씨 정보를 가져오는 함수
function getWeather(){

    const coords = localStorage.getItem(COORDS);
    
    const lat = JSON.parse(coords).latitude;
    const lon = JSON.parse(coords).longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
            const tempData = data.main.temp;
            const weatherData = data.weather[0].main;
            const cityData = data.name;

            if(isTempData === true){
                weather.innerText = `${tempData}°C`
                isTempData = false
            }else if(isTempData === false){
                weather.innerText = `${weatherData}`
                isTempData = true
            }

            city.innerText=`in ${cityData}`
        })
}

function onGeoPositionSuccess(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    localStorage.setItem(COORDS, JSON.stringify({
        latitude : lat,
        longitude : lon
    }))

    getWeather(); //날씨 정보 api 호출
}

function onGeoPositionError(){
    alert("위치 정보를 받아오지 못했습니다.")
}


if(localStorage.getItem(COORDS) !== null){
    setInterval(getWeather,2000)
} else {
    //최초 사용자 위치값 받아오기
    navigator.geolocation.getCurrentPosition(onGeoPositionSuccess, onGeoPositionError)
}