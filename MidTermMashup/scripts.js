//code by Kendra


//http://api.openweathermap.org/data/2.5/forecast?zip=57381&units=imperial&appid=2769ef347c8576fb6f5bc71f4e8a796a
//https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ec2cdf75faa383b51562e87bdf3a6a21&
// text=food&lat=44.4128&lon=-98.692&radius=20&radius_units=mi&format=json&nojsoncallback=1

//var appid= "2769ef347c8576fb6f5bc71f4e8a796a";//weather app
//var key= "ec2cdf75faa383b51562e87bdf3a6a21";//flicker key

var lon;
var lat;



async function update(){
    await getWeatherData();
    await getImages();

}




async function getWeatherData() {
    let zip= zipcode();

    const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?" +
        "zip=" + zip +
        "&units=imperial&appid=2769ef347c8576fb6f5bc71f4e8a796a");
    const data = await response.json();



    var city= data.city.name;
    lat= data.city.coord.lat;
    lon= data.city.coord.lon;
    console.log(lon);
    var country= data.city.country;

    let resultDiv= document.querySelector("#result");
    var resultCity=document.createElement("p");
    resultCity.classList.add("centering");
    resultCity.innerHTML= "" + city + ", " + country + "<br><span class='weatherONcity'>Weather</span>";
    resultDiv.appendChild(resultCity);
    var weatherHolder = document.createElement("div");
    var weather = document.createElement("div");
    resultDiv.appendChild(weather);
    weather.appendChild(weatherHolder);
    weather.classList.add("weather");
    weatherHolder.classList.add("weatherHolder");

    //this is the start to making the weather results
    var list_array= data.list;
    for(let i = 0; i < list_array.length; i++){
        let unix =list_array[i].dt;
        let timelog= await timeConverter(unix);
        let weather_holder_days = document.createElement("div");
        weather_holder_days.classList.add("weather_spots");
        let dateP = document.createElement("p");
        let timeP = document.createElement("p");
        dateP.innerHTML= timelog[0];
        timeP.innerHTML= timelog[1];
        dateP.classList.add("dateP");
        timeP.classList.add("timeP");
        weather_holder_days.appendChild(dateP);
        weather_holder_days.appendChild(timeP);


        //this is to find temp
        let temp_img= imageGrab("temp");
        let temp = document.createElement("p");
        temp.innerHTML=  "<span class='norm'>Temperature: </span>"+ list_array[i].main.temp + "°F <br>";
        temp.classList.add("type_words");
        weather_holder_days.appendChild(temp_img);
        weather_holder_days.appendChild(temp);

        //this is to find humidity
        let humidity_img= imageGrab("humidity");
        let humidity = document.createElement("p");
        humidity.innerHTML=  "<span class='norm'>Humidity:  </span>"+ list_array[i].main.humidity + "% <br>";
        humidity.classList.add("type_words");
        weather_holder_days.appendChild(humidity_img);
        weather_holder_days.appendChild(humidity);

        //this is to find wind speed
        let wind_img= imageGrab("wind");
        let wind = document.createElement("p");
        wind.innerHTML=  "<span class='norm'>Wind:  </span>"+ list_array[i].wind.speed + " miles/hour <br>";
        wind.classList.add("type_words");
        weather_holder_days.appendChild(wind_img);
        weather_holder_days.appendChild(wind);

        //this is to find the weather like rain snow clear or clouds; depending on weather will change other parameter
        let word= list_array[i].weather[0].main;
        let  cloud_precip_img= imageGrab(word);
        let  cloud_precip = document.createElement("p");
        cloud_precip.innerHTML= weatherinfo(word, list_array[i]);
        cloud_precip.classList.add("type_words2");
        weather_holder_days.appendChild(cloud_precip_img);
        weather_holder_days.appendChild(cloud_precip);

        //this is start to extra design elements
        var line1 = document.createElement("div");
        weather_holder_days.appendChild(line1);
        line1.classList.add("line1");
        var line2 = document.createElement("div");
        weather_holder_days.appendChild(line2);
        line2.classList.add("line2");



        weatherHolder.appendChild(weather_holder_days);
    }

    //this is the start of making a buttons to scroll
    let arrow1 = document.createElement("div");
    arrow1.innerHTML= "<img src='img/arrow1.png' width='70px' height='100px' >";
    arrow1.setAttribute("onclick", "scrollWinNeg()");
    let arrow2 = document.createElement("div");
    arrow2.innerHTML= "<img src='img/arrow2.png' width='70px' height='100px'>";
    arrow2.setAttribute("onclick", "scrollWinPos()");
    arrow1.classList.add("arrow1");
    arrow2.classList.add("arrow2");
    weather.appendChild(arrow1);
    weather.appendChild(arrow2);

}

function scrollWinNeg() {
    let weatherHolder= document.querySelector(".weatherHolder");
    weatherHolder.scrollBy(-800, 0);
}
function scrollWinPos() {
    let weatherHolder= document.querySelector(".weatherHolder");
    weatherHolder.scrollBy(800, 0);
}



function zipcode(){
    var zip= document.querySelector("#Destination").value;
    if (zip<10001 || zip.length!==5){
        alert("not a real zip code");
    }
    return zip;
}

function imageGrab(x){
    var img = document.createElement("img");
    let keyWord = x;
    var num= 1;
    switch (keyWord) {
        case "temp":
            img.setAttribute("src", "img/temp.png");
            img.classList.add("tempicon");
            break;
        case "Clear":
            img.setAttribute("src", "img/clear.png");
            img.classList.add("icon");
            break;
        case "Clouds":
            img.setAttribute("src", "img/clouds.png");
            img.classList.add("icon");
            break;
        case "Rain":
            img.setAttribute("src", "img/rain.png");
            img.classList.add("icon");
            break;
        case "Snow":
            img.setAttribute("src", "img/snow.png");
            img.classList.add("icon");
            break;
        case "humidity":
            img.setAttribute("src", "img/humidity.png");
            img.classList.add("icon");
            break;
        case "wind":
            img.setAttribute("src", "img/wind.png");
            img.classList.add("icon");
            break;
    }
    return img;
}

function weatherinfo(x, t){
    let keyWord = x;
    let list_array= t;
    var string_word;
    switch (keyWord) {
        case "Clear":
            string_word= "<span class='norm'>Clear:  </span> ("+ list_array.weather[0].description + ") <br>" +
                "<span class='new_norm'>Clouds Coverage:  </span> 0% <br>";
            break;
        case "Clouds":
            string_word= "<span class='norm'>Clouds:  </span> ("+ list_array.weather[0].description + ") <br>"+
                "<span class='new_norm'>Clouds Coverage:  </span>" + list_array.clouds.all
                + "% <br>" ;
            break;
        case "Rain":
            let rain= list_array.rain;
            for (let j in rain){
                string_word= "<span class='norm'>Rain:  </span> ("+ list_array.weather[0].description + ") <br>"+
                    "<span class='new_norm'>Rain Total: </span>  " + rain[j] + "mm <br>" ;
            }
            break;
        case "Snow":
            let snow= list_array.snow;
            for (let j in snow){
                string_word= "<span class='norm'>Snow:  </span> ("+ list_array.weather[0].description + ") <br>"+
                    "<span class='new_norm'>Snow Total: </span> " + snow[j] + " mm <br>" ;
            }
            break;
    }
    return string_word;
}



async function getImages() {
    console.log(lon);
    let search= document.querySelector("#SearchWord").value;
    let radius= document.querySelector("#Radius").value;
    const response = await fetch("https://www.flickr.com/services/rest/?method=flickr.photos.search&" +
        "api_key=ec2cdf75faa383b51562e87bdf3a6a21&" +
        "text=" + search +
        "&lat=" + lat+
        "&lon=" + lon +
        "&radius=" + radius +
        "&radius_units=mi&format=json&nojsoncallback=1");
    const data2 = await response.json();
    var total= data2.photos.total;

    let resultDiv= document.querySelector("#result");

    var resultPhoto=document.createElement("p");
    resultPhoto.classList.add("weatherONcity");
    resultPhoto.innerHTML= "Photos on " + search ;
    resultDiv.appendChild(resultPhoto);


    var gallery = document.createElement("div");
    resultDiv.appendChild(gallery);
    gallery.classList.add("gallery");

    //this is a function call to making the photo gallery for word searched
    var data_short= data2.photos.photo;
    makingGallery(data_short, total, gallery);


    let makeBreak = document.createElement("div");
    makeBreak.classList.add("makeBreak");
    resultDiv.appendChild(makeBreak);

}

async function makingGallery(data, total, gallery){
    let g= gallery;
    let photograbbing= 18;
    if (total<= 18){
        photograbbing= total;
    }
    let data_short= data;
    for(let i = 0; i < photograbbing; i++){
        let farm= data_short[i].farm;
        let server= data_short[i].server;
        let id= data_short[i].id;
        let secret= data_short[i].secret;
        let title= data_short[i].title;
        let url= "https://farm" + farm +
            ".staticflickr.com/" + server +
            "/" + id +"_" + secret +".jpg";

        let imageHolder = document.createElement("div");
        imageHolder.innerHTML= "<img  class='imagebackground' src='" + url +"'>";
        let imageinfo = document.createElement("div");
        imageinfo.innerHTML= "<p class=typeimage>" + title + "</p>";
        imageinfo.classList.add("imageinfo");
        imageHolder.appendChild(imageinfo);
        g.appendChild(imageHolder);
        imageHolder.classList.add("imageHolder");
    }
}





//code based off https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
async function timeConverter(UNIXtimestamp){
    var date = new Date(UNIXtimestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var hour = date.getHours();
    var dateTimeList;
    if (hour===12){
        let date= '' +month + ' ' + day + ', ' + year;
        let time= '('+ hour + ':00 PM)' ;
        dateTimeList = [date, time];
        return dateTimeList;}
    else if (hour===24 || hour===0){
        let date= '' +month + ' ' + day + ', ' + year;
        let time= '('+ hour + ':00 AM)' ;
        dateTimeList = [date, time];
        return dateTimeList;}
    else if (hour >0 && hour <=11) {
        let date= '' +month + ' ' + day + ', ' + year;
        let time= '('+ hour + ':00 AM)';
        dateTimeList = [date, time];
        return dateTimeList;
    }
    else{
        hour=hour-12;
        let date= '' +month + ' ' + day + ', ' + year;
        let time= '('+ hour + ':00 PM)' ;
        dateTimeList = [date, time];
        return dateTimeList;
    }
}


