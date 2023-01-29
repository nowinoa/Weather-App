var apiKey = "fadb52158e68d557c1650cb082bd3f44";
var citySubmit = $("#city-submit");
var currentDay = $('.current-day');
var tableBody = $("#weather-data-body");
var cityButtons = $('.city-buttons');

citySubmit.click(function () {
  var city = $("#city").val();
  callApi(city);
  var button = $("<button class='city-button'>");
  button.text(city);
  cityButtons.append(button);
  addButtons();
});

function addButtons() {
  var cityButton = $('.city-button');
  console.log(cityButton);
  cityButton.each(function() {
  $(this).click(() =>{ 
    console.log('yee');
    city = $(this).text();
    callApi(city);
  })
   
  })
}
function callApi(city) {
  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
    error: function(xhr, status, error) {
      if(xhr.status == 404){
          $("body").append("<p>Sorry, the city you requested could not be found.</p>");
      }
  }
  }).then(function (res) {
    tableBody.empty();
    currentDayDataIn(res);
    checkCurrentStacs(res);
    currentDay.addClass('active');
  });
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
function currentDayDataIn(res) {
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

//crear las cards
//crear un sistema de iconos para segun el tipo de tiepo y hacer su inner.
//crear el modal de entrada
//controlar el error
//controlar el scroll en la seccion search para que esta no sea infinita
//Ir a los pequeños detalles
  //la tabla ponerla en flex
  //las stacts en bold y los numeros en normal
  //font size, colors ...


//ciudad registrada
//**se crea un boton
//*se almacenan en local storage keys para los botones como ciudad nombre */

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

//**Following days table
  //Icon of weather --> sacar temperatura promedio y display icon
  //Date --> for each day of the 4 days
  //Max and Min Temp
  //Wind
  //Humidity



