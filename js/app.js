var apiKey = "fadb52158e68d557c1650cb082bd3f44";
var citySubmit = $("#city-submit");
var currentDay = $('.current-day');
var tableBody = $("#weather-data-body");
var cityButtons = $('.city-buttons');
var forecast = $('.forecast');
var error404 = document.querySelector('.error');
var buttons = 0;

window.onload = function(){
  window.localStorage.clear();
}
citySubmit.click(function () {
  $('#start').addClass('hidden');
  var city = $("#city").val();
  if(city === '') {
    console.log('manito error');
    error404.classList.add('no-hidden');
  } else {
    error404.classList.remove('no-hidden');
    callApi(city);
  }
});
function onClickCityButtons() {
  var cityButton = $('.city-button');
   cityButton.each(function() {
   $(this).click(() =>{ 
     console.log('yee');
     city = $(this).text();
     var res = window.localStorage.getItem(`res-${city}`);
     var resp = JSON.parse(res);
     innerData(resp);
   })
   })
}
function limitCityButtons () {
  console.log(buttons);
    if(buttons > 6) {
      var city = cityButtons.find('button:first').text();
      window.localStorage.removeItem(`res-${city}`);
      cityButtons.find('button:first').remove();
    }
}
function callApi(city) {
  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
    error: function(xhr, status, error) {
      if(xhr.status == 404){
          error404.classList.add('no-hidden');
      }
  }
  }).then(function (res) {
    buttons++;
    var resLocal = JSON.stringify(res);
    window.localStorage.setItem(`res-${city}`, resLocal);
    error404.classList.remove('no-hidden');
    var button = $("<button class='city-button'>");
    button.text(city);
    cityButtons.append(button);
    //si los btn son mas de 8 entonces elimina el primero con child first remove
    onClickCityButtons();
    limitCityButtons();
    innerData(res)
  });
}
function innerData(res) {
  forecast.empty();
  tableBody.empty();
  tableCurrentTemp(res);
  checkCurrentStacs(res);
  currentDay.addClass('active');
  var middleValues = [12,20,28,36]
  for(var j = 0; j < middleValues.length ; j++) {
    var value = middleValues[j];
    addCards(res, value);
  }
}
//checks the current time to actualize the current day screen
function checkCurrentStacs(res) {
   var currentTime = moment().format('H');
   var hour = parseInt(currentTime);
   var tempNumeric = $('.temp-numeric');
   var humidity = $('.humidity');
   var windSpeed = $('.wind-speed');
   var city = $('.city');
   var date = $('.date');
   console.log(hour);
   if(hour < 3 || hour == 0) {
      var temp_txt = res.list[0].main.temp;
      var humidity_txt= res.list[0].main.humidity;
      var wind_txt = res.list[0].wind.speed;
   } else if (hour > 3 && hour < 6 || hour == 3) {
    var temp_txt = res.list[1].main.temp;
    var humidity_txt= res.list[1].main.humidity;
    var wind_txt = res.list[1].wind.speed;
   } else if (hour > 6 && hour < 9 || hour == 6) {
    var temp_txt = res.list[2].main.temp;
    var humidity_txt= res.list[2].main.humidity;
    var wind_txt = res.list[2].wind.speed;
   } else if (hour > 9 && hour < 12 || hour == 9) {
    var temp_txt = res.list[3].main.temp;
    var humidity_txt= res.list[3].main.humidity;
    var wind_txt = res.list[3].wind.speed;
   } else if (hour > 12 && hour < 15 || hour == 12) {
    var temp_txt = res.list[4].main.temp;
    var humidity_txt= res.list[4].main.humidity;
    var wind_txt = res.list[4].wind.speed;
   } else if (hour > 15 && hour < 18 || hour == 15) {
    var temp_txt = res.list[5].main.temp;
    var humidity_txt= res.list[5].main.humidity;
    var wind_txt = res.list[5].wind.speed;
    console.log('yeep')
   } else if (hour > 18 && hour < 21 || hour == 18) {
    var temp_txt = res.list[6].main.temp;
    var humidity_txt= res.list[6].main.humidity;
    var wind_txt = res.list[6].wind.speed;
   } else if (hour > 21 && hour < 24 || hour == 21) {
    var temp_txt = res.list[7].main.temp;
    var humidity_txt= res.list[7].main.humidity;
    var wind_txt = res.list[7].wind.speed;
   }
   var actualTemp = temp_txt - 273.15;
   var actualDate = moment().format('dddd, HH:MM');
   var city_txt = res.city.name;
   var country_txt = res.city.country;
   //Inners temperature
   tempNumeric.text('Temp: ' + actualTemp.toFixed(2));
   //Inners humidity
   humidity.text('Humidity: ' + humidity_txt + '%');
   //Inners speed wind
   windSpeed.text('Wind Speed: ' + wind_txt + ' m/s');
   //Inners city and country code
   city.text(city_txt + ', ' + country_txt);
   //Inners the current day and time
   date.text(actualDate);
}
function tableCurrentTemp(res) {
  var count = 00;
  var row = $('<tr>'); 
  var timeCell = $("<td>");
  var temperatureCell = $("<td>");
  var windSpeedCell = $("<td>");
  var humidityCell = $("<td>");
  for (i = 0; i < 8; i++) {
      var temp = res.list[i].main.temp;
      temp -= 273.15;
       if(count < 10) {
        var time = '0' + count + ':00'
        var tempt = Math.round(temp) + 'Cº';
        var wind = res.list[i].main.humidity + 'm/s';
        var humidity = res.list[i].wind.speed + '%';
        timeCell.append($('<p>').text(time));
        temperatureCell.append($('<p>').text(tempt));
        windSpeedCell.append($('<p>').text(wind));
        humidityCell.append($('<p>').text(humidity));
       } else {
        var time = count + ':00'
        var tempt = Math.round(temp) + 'Cº';
        var wind = res.list[i].main.humidity + 'm/s';
        var humidity = res.list[i].wind.speed + '%';
        timeCell.append($('<p>').text(time));
        temperatureCell.append($('<p>').text(tempt));
        windSpeedCell.append($('<p>').text(wind));
        humidityCell.append($('<p>').text(humidity));
       }
       row.append(timeCell);
       row.append(temperatureCell);
       row.append(windSpeedCell);
       row.append(humidityCell);
       tableBody.append(row);
      // temperatures.append(tempE);
      count +=3;
  }
}
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
  var icon = $('<i>');
  var maxMinTempC = $(`<p>${tempMax} Cº </p>`);
  var windSpeedC = $(`<p>${windSp} m/s</p>`);
  var humidityC = $(`<p>${humidity} %</p>`);
  card.append(h4_card);
  card.append(icon);
  card.append(maxMinTempC);
  card.append(windSpeedC);
  card.append(humidityC);
  forecast.append(card);
}

//set res to local storage
//on btn click retrieve res from local storage
//limit the quantity for btns - removes the oldest value and its response from localStorage.

//crear un sistema de iconos para segun el tipo de tiepo y hacer su inner.
//crear el modal de entrada
//limitar el numero de botones posibles y valores repetidos
//Ir a los pequeños detalles
  //la tabla ponerla en flex
  //las stacts en bold y los numeros en normal
  //font size, colors ...


//ciudad registrada
//se crea un boton
//**se almacenan en local storage keys para los botones como ciudad nombre */

//Controlamos el error --> un parrafo en rojo debajo del input que diga no se encuentra esa ciudad y bloqueas el display;

//main section ->
//header
  //**icon -> the icon needs to be related with the hourly check. Then checks the temperature and if is bigger/smaller than, then display corresponding icon.
  //temp --> actual temp depending in hour interval
  //**C or F - swiper --> switcher btn that changes de values to Farengeit

  //Precipitations, humidity wind //Passing actual values depending on de hour

  //City and Country
  //Date and real hour

//Temperatures table
  //Hour and temperature --> hours 3 by 3 with respective temp

//Following days table
  //**Icon of weather --> sacar temperatura promedio y display icon
  //Date --> for each day of the 4 days
  //Temp
  //Wind
  //Humidity


//Tasks: limitar los botones, iconos para el weather y ya estilizar.
