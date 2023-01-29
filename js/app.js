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
  });
});
function currentDayDataIn(res) {
  var temperatures = $(".main-cd");
  var count = 00;
  for (i = 0; i < 8; i++) {
      var temp = res.list[i].main.temp;
      temp -= 273.15;
      console.log(temp)
      if(count < 10) {
        var tempE = $(`<div class='temperature'><p>0${count}</p><p>${Math.round(temp)}</p></div>`);
      } else {
        var tempE = $(`<div class='temperature'><p>${count}</p><p>${Math.round(temp)}</p></div>`);
      }
      
      temperatures.append(tempE);
      count +=3;
  }
}
//city name
//current date
//Icon of wether
//temperature
//humidity
//wind speed
//Si la fecha actual (del dia elegido)
