const weather = document.querySelector(".js-weather");

const API_KEY = "d38f9b675379bcddc8dd93951f918c5e";
const COORDS = 'coords';

function getWeather(lat, lng){
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
   .then(function(response){//json데이터를 받을거니까 변수명을 json으로 지은것
    return response.json();
    //json이 준비되고 나면 이 아래를 실행하라는 의미
}).then(function(json){
    //console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
})
}

//then: 데이터가 우리한테 넘어왔을때 사용한다. 왜?데이터가 들어오는데 시간이 좀 걸리는 경우가 있기떄문이다.
//즉 then의 역할은 기본적으로 함수를 호출하는 것이지만 데이터가 완전히 들어온다음에 호출하는 것이다.


function saveCoords(coordsObject){
    localStorage.setItem(COORDS,JSON.stringify(coordsObject));
}

//좌표를 가져오는데 성공했을때 쓰는 함수
function handleGeoSuccess(position){
    // console.log(position.coords.latitude);
    // 위도
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude: latitude,//latitude:latitude와 같이 이름을 같게 할거면 latitude하나만 적어도됨
        longitude: longitude
    }
    saveCoords(coordsObject);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

//날씨를 가져오는 함수
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);//geolocation은 객체이다 그안에는 또 많은 키를 가지고 있다
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        //getWeatherDate
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();