var main = $('main');
var currentDay = $('.current-day');
var cityButtons = $('.city-buttons');
var apiKey = "fadb52158e68d557c1650cb082bd3f44";
var citySubmit = $("#city-submit");
var error404 = document.querySelector('.error');
var forecast = $('.forecast');
var wraper = $('<div class="wraper">');
var buttons = 0;
var cities = [];

//On load - cleans the local storage
window.onload = function(){
    window.localStorage.clear();
}
//When a city button is clicked
citySubmit.click(function () {
    //$('#start').addClass('hidden');
    var city = $("#city").val();
    //checks if the city is a empty string
    if(city === '') {
      console.log('manito error');
      //error p visible 
      error404.classList.remove('hidden');
    } 
    else if(cities.includes(city)) {
      error404.textContent = 'Click the city button!';
      error404.classList.remove('hidden');
    }
    else {
     //Hidde error p
      error404.classList.add('hidden');
        emptyAllHtml();
        callCurrentDayApi(city);
        callForecastApi(city);
        console.log('yese')
    }
  });
//Calls the API for current day data
function callCurrentDayApi(city) {
    var urlCD = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    $.ajax({
    url: urlCD,
    method: 'GET',
    error: function(xhr) {
        if(xhr.status == 404){
            error404.classList.remove('hidden');
            error404.textContent = 'Not found';
        }
    }
    }).then((res) => {
    var resLocal = JSON.stringify(res);
    window.localStorage.setItem(`res-actual-${city}`, resLocal);
    addButton(city);
    limitCityButtons();
    currentDayInner(res);
    })
}
//Calls API for forecast
function callForecastApi(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
      error: function(xhr) {
        if(xhr.status == 404){
            error404.classList.remove('hidden');
        }
    }
    }).then(function (res) {
      error404.classList.add('hidden');
      var resLocal = JSON.stringify(res);
      window.localStorage.setItem(`res-${city}`, resLocal);
      innerForecast(res);
      //si los btn son mas de 8 entonces elimina el primero con child first remove
      //innerDataForecast(res)
    });
}
//Inners the current day data - header and features (temperatures, wind, humidity, city, country and real time);
function currentDayInner(res) {
    var header = $('<div class="header"></div>');
    var features = $('<div class="features"></div>');
    var left = $('<div class="left">');
    var right = $('<div class="right">');
    var iconScreen = $('<i>');
    var temp_number = $('<p>');
    var cityCountry = $('<h4>');
    var date = $('<h5>');
    var tempMax_txt = $('<div class="temp-max">');
    var tempMin_txt = $('<div class="temp-min">');
    var wind_txt = $('<div class="current-wind">');
    var hum_txt = $('<div class="current-hum">');
    //Pass info --> look for the way data is called for current day
    var iconcode = res.weather[0].icon;
    var temp = res.main.temp;
    var max_temp = res.main.temp_max - 273.15;
    var min_temp = res.main.temp_min - 273.15;
    var humidity= res.main.humidity;
    var wind = res.wind.speed;
    var actualTemp = temp - 273.15;
    var actualDate = moment().format('dddd DD, HH:MM');
    var city_txt = res.name;
    var country_txt = res.sys.country;
    //Adds the img icon weather
    var iconurl = "./img/icons/" + iconcode + ".png";
    iconScreen.append($(`<img src="${iconurl}">`));
    left.append(iconScreen);
    //Adds the temperature
    temp_number.text(actualTemp.toFixed(2) + 'Cº');
    left.append(temp_number);
    //Adds the city and country code
    cityCountry.text(city_txt + ',' + country_txt);
    right.append(cityCountry);
    //Adds the date and real time
    date.text(actualDate);
    right.append(date);
    
    //Adds the header
    header.append(left);
    header.append(right);
    //Adds the items for feature table
    //max temperature
    tempMax_txt.text(max_temp.toFixed() + ' Cº');
    //min temperature
    tempMin_txt.text(min_temp.toFixed() + ' Cº');
    //wind
    var newWind = wind * 3.6;
    wind_txt.text(newWind.toFixed() + ' km/h');
    //humidity
    hum_txt.text(humidity + ' %');
    //Add icons
    var tempMaxI = $('<i class="fa-solid icono fa-temperature-arrow-up"></i>');
    var tempMinI = $('<i class="fa-solid icono fa-temperature-arrow-down"></i>');
    var windI = $('<i class="fa-solid icono fa-wind"></i>');
    var humI = $('<i class="fa-solid icono fa-droplet"></i>');
    tempMax_txt.prepend(tempMaxI);
    tempMin_txt.prepend(tempMinI);
    wind_txt.prepend(windI);
    hum_txt.prepend(humI);
    //Inners feature table
    features.append(tempMax_txt);
    features.append(tempMin_txt);
    features.append(wind_txt);
    features.append(hum_txt);
     //Append heather div and features div to the main
    currentDay.append(header);
    currentDay.append(features);
}
//Cleans the html - is used before a new inner of data
function emptyAllHtml() {
    currentDay.empty();
    forecast.empty();
    wraper.empty();
}
//creates the city buttons
function addButton(city) {
    cities.push(city);
    console.log(cities);
    var button = $("<button class='city-button'>");
    button.text(city);
    cityButtons.append(button);
    buttons += 1;
    onClickCityButtons();
}
//limits city buttons to maximum 6
function limitCityButtons () {
      if(buttons > 6) {
        var city = cityButtons.find('button:first').text();
        window.localStorage.removeItem(`res-actual-${city}`);
        cityButtons.find('button:first').remove();
      }
}
//when the button is clicked retrieve the data from local storage and inner it
function onClickCityButtons() {
    var cityButton = $('.city-button');
     cityButton.each(function() {
     $(this).click(() =>{ 
       emptyAllHtml();
       city = $(this).text();
       var rescd = window.localStorage.getItem(`res-actual-${city}`);
       var resfr = window.localStorage.getItem(`res-${city}`);
       var resCD = JSON.parse(rescd);
       var resFR = JSON.parse(resfr);
       currentDayInner(resCD);
       innerForecast(resFR);
     })
     })
}
//creates a card for each day (using the middle value - 12:00pm)
function innerForecast (res) {
    var middleValues = [7,15,23,31,39]
    for(var j = 0; j < middleValues.length ; j++) {
        var value = middleValues[j];
        addCards(res, value);
  }
}
//creates a card with each day value and features
function addCards (res, value) {
    //buscar la temperatura mas alta y mas baja ?? - por ahora pon solo una temperatura y pasa a las pantallas y el error
    var tempMax = res.list[value].main.temp;
    tempMax -= 273.15;
    tempMax = Math.round(tempMax);
    var todayDate = res.list[value].dt_txt;
    var td = moment(todayDate).format('dddd');
    var windSp = res.list[value].wind.speed;
    var humidity = res.list[value].main.humidity;
    var card = $('<div class="card"></div>');
    var h4_card = $('<h4>');
    h4_card.text(td);
    var icon = $('<div class="card-icon-wh">');
    var iconcode = res.list[value].weather[0].icon;
    var iconurl = "./img/icons/" + iconcode + ".png";
    icon.append($(`<img src="${iconurl}" class = "weather-icon-tb">`));
    var maxMinTempC = $(`<p>${tempMax} Cº </p>`);
    var windSpeedC = $(`<p>${windSp} m/s</p>`);
    var humidityC = $(`<p>${humidity} %</p>`);
    //Icons
    var tempIC = $('<i class="fa-solid card-icon fa-temperature-arrow-up"></i>');
    var windI = $('<i class="fa-solid card-icon fa-wind"></i>');
    var humI = $('<i class="fa-solid card-icon fa-droplet"></i>');
    card.append(h4_card);
    card.append(icon);
    maxMinTempC.prepend(tempIC);
    windSpeedC.prepend(windI);
    humidityC.prepend(humI);
    card.append(maxMinTempC);
    card.append(windSpeedC);
    card.append(humidityC);
    wraper.append(card)
    forecast.append(wraper);
  }

  //Adjust buttons from search section
  //movil responsive
  //time displays current time
  //box shadow, hover animation, animations