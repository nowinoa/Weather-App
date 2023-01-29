var apiKey = "fadb52158e68d557c1650cb082bd3f44";
var citySubmit = $("#city-submit");
citySubmit.click(function () {
  var city = $("#city").val();
  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    console.log(res)
    currentDayDataIn(res);
    checkCurrentStacs(res);
  });
});

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
  var temperatures = $(".main-cd-temperatures");
  var count = 00;
  for (i = 0; i < 8; i++) {
      var temp = res.list[i].main.temp;
      temp -= 273.15;
      if(count < 10) {
        var tempE = $(`<div class='temperature'><p class='count' >0${count}:00</p><p>${Math.round(temp)}</p></div>`);
      } else {
        var tempE = $(`<div class='temperature'><p class='count'>${count}:00</p><p>${Math.round(temp)}</p></div>`);
      }
      
      temperatures.append(tempE);
      count +=3;
  }
}
//ciudad registrada
//se crea un boton

//se llama a la api
 //- city name and country
  //comprueba que hora es, dependiendo de la hora trae:
  /* -temperatura 
     - humedad
     - wind speed
     - sctual time and day*/




//main section ->
//header
  //icon -> the icon needs to be related with the hourly check. Then checks the temperature and if is bigger/smaller than, then display corresponding icon.
  //temp --> actual temp depending in hour interval
  //C or F - swiper --> switcher btn that changes de values to Farengeit

  //Precipitations, humidity wind //Passing actual values depending on de hour 

  //City and Country
  //Date and real hour

//Temperatures table
  //Hour and temperature --> hours 3 by 3 with respective temp

//Following days table
  //Icon of weather --> sacar temperatura promedio y display icon
  //Date --> for each day of the 4 days
  //Max and Min Temp
  //Wind 
  //Humidity



