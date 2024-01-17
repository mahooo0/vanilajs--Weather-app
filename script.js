const location1=document.querySelector("#location1")
const location2=document.querySelector("#location2")
const city=document.querySelector("#city")
const today_weather=document.querySelector("#today_weather")
const day_list_dom=document.querySelector("#day_list_dom")
const weather__message=document.querySelector("#weather__message")
const search_btn=document.querySelector("#search_btn")
console.log(search_btn);

const heder_inp=document.querySelector("#heder_inp")




location1.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(position=>{
        weather__message.style.display="none"
        //get lat and lon
        let lat=position.coords.latitude
        let lon=position.coords.longitude
        getWetherByLocation(lat,lon)     //main function

        
    })
})
location2.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(position=>{
        weather__message.style.display="none"
        let lat=position.coords.latitude
        let lon=position.coords.longitude
        getWetherByLocation(lat,lon)
    })
})
search_btn.addEventListener("click",()=>{
    weather__message.style.display="none"
    let value =heder_inp.value
    getWeatherByCityName(value)
    heder_inp.value=""
})


function get_week_Days(day){

    day+=1
    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ]
    return daysOfWeek[day]
}
async function getWetherByLocation(lat,lon){
    try{
        //weather
        const wethe_info= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`)
        const wethe_info_json=await wethe_info.json()
        //weather

        //forecast
        const forecast_info= await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`)
        const forecast_info_json=await forecast_info.json()
        //forecast
        

        //bootstrap icons function
        function get_icon(par){
            //bootstrap icons
            let icon=""
            switch(par){
                case `01d`:icon=`wi-day-sunny`
                break
                case `02d`:icon= 'wi-day-cloudy'
                break
                case `03d`:icon= 'wi-cloud'
                break
                case `04d`:icon= 'wi-cloudy'
                break
                case `09d`:icon= 'wi-showers'
                break
                case `10d`:icon= 'wi-rain'
                break
                case `11d`:icon= 'wi-thunderstorm'
                break
                case `13d`:icon= 'wi-snow'
                break
                case `50d`:icon= 'wi-fog'
                break
                case `01n`:icon= 'wi-night-clear'
                break
                case `02n`:icon= 'wi-night-alt-cloudy'
                break
                case `03n`:icon= 'wi-cloud'
                break
                case `04n`:icon= 'wi-night-cloudy'
                break
                case `09n`:icon= 'wi-night-showers'
                break
                case `10n`:icon= 'wi-night-rain'
                break
                case `11n`:icon='wi-night-thunderstorm'
                break
                case `13n`:icon='wi-night-alt-snow'
                break
                case `50n`:icon='wi-night-fog'
                break
            } 
            return icon

        }
        //bootstrap icons function
        
        //upper section
       let  upper_icon=get_icon(wethe_info_json.weather[0].icon)
       
        city.innerHTML=`${wethe_info_json.name} ,${wethe_info_json.sys.country}`
        today_weather.innerHTML=`
        <p><i class="wi ${upper_icon} weather_icon"></i> <span class="weather__celsius-value">${Math.ceil(wethe_info_json.main.temp)}°C</span></p>
        <p>${wethe_info_json.weather[0].main}</p>
        <ul class="weather__miscellaneous">
        <li><i class="wi wi-humidity"></i> Humidity  <span>${wethe_info_json.main.humidity}%</span></li>
        <li><i class="wi wi-small-craft-advisory"></i> Wind Speed <span>${wethe_info_json.wind.speed} m/s</span></li>
        `

        //upper section


        //create next 5 days
        let day =new Date().getDay()//return 0-->6
        let five_days_info=[]
        for(let i=day+1;i<day+6;i++){
            el=forecast_info_json.list[i]
            five_days_info.push(el)
        }
        //create next 5 days
        

        //create html day list
        let day_list =five_days_info.map((item)=>{
        let week_day = get_week_Days(day)
           let buttom_icon= get_icon(item.weather[0].icon)
          return `
        <div class="forecast__day">
      <h3 class="forecast__date">${week_day}</h3>
      <i class="wi ${buttom_icon} forecast__icon"></i>
      <p class="forecast__temp">${Math.ceil(item.main.temp)}°C</p>
      <p class="forecast__desc">${item.weather[0].main}</p>
    </div>
        `})


        //create html day list
        let result=day_list.join("")
        day_list_dom.innerHTML=result

    }catch(error){
        console.log(error);
    }
}

async function getWeatherByCityName(City_name) {


try{
    //weather
    const wethe_info= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City_name}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`)
    const wethe_info_json=await wethe_info.json()
    //weather

    //forecast
    const forecast_info= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${City_name}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`)
    const forecast_info_json=await forecast_info.json()
    //forecast
    

    //bootstrap icons function
    function get_icon(par){
        //bootstrap icons
        let icon=""
        switch(par){
            case `01d`:icon=`wi-day-sunny`
            break
            case `02d`:icon= 'wi-day-cloudy'
            break
            case `03d`:icon= 'wi-cloud'
            break
            case `04d`:icon= 'wi-cloudy'
            break
            case `09d`:icon= 'wi-showers'
            break
            case `10d`:icon= 'wi-rain'
            break
            case `11d`:icon= 'wi-thunderstorm'
            break
            case `13d`:icon= 'wi-snow'
            break
            case `50d`:icon= 'wi-fog'
            break
            case `01n`:icon= 'wi-night-clear'
            break
            case `02n`:icon= 'wi-night-alt-cloudy'
            break
            case `03n`:icon= 'wi-cloud'
            break
            case `04n`:icon= 'wi-night-cloudy'
            break
            case `09n`:icon= 'wi-night-showers'
            break
            case `10n`:icon= 'wi-night-rain'
            break
            case `11n`:icon='wi-night-thunderstorm'
            break
            case `13n`:icon='wi-night-alt-snow'
            break
            case `50n`:icon='wi-night-fog'
            break
        } 
        return icon

    }
    //bootstrap icons function
    
    //upper section
   let  upper_icon=get_icon(wethe_info_json.weather[0].icon)
   
    city.innerHTML=`${wethe_info_json.name} ,${wethe_info_json.sys.country}`
    today_weather.innerHTML=`
    <p><i class="wi ${upper_icon} weather_icon"></i> <span class="weather__celsius-value">${Math.ceil(wethe_info_json.main.temp)}°C</span></p>
    <p>${wethe_info_json.weather[0].main}</p>
    <ul class="weather__miscellaneous">
    <li><i class="wi wi-humidity"></i> Humidity  <span>${wethe_info_json.main.humidity}%</span></li>
    <li><i class="wi wi-small-craft-advisory"></i> Wind Speed <span>${wethe_info_json.wind.speed} m/s</span></li>
    `

    //upper section


    //create next 5 days
    let day =new Date().getDay()//return 0-->6
    let five_days_info=[]
    for(let i=day+1;i<day+6;i++){
        el=forecast_info_json.list[i]
        five_days_info.push(el)
    }
    //create next 5 days
    

    //create html day list
    let day_list =five_days_info.map((item)=>{
    let week_day = get_week_Days(day)
       let buttom_icon= get_icon(item.weather[0].icon)
      return `
    <div class="forecast__day">
  <h3 class="forecast__date">${week_day}</h3>
  <i class="wi ${buttom_icon} forecast__icon"></i>
  <p class="forecast__temp">${Math.ceil(item.main.temp)}°C</p>
  <p class="forecast__desc">${item.weather[0].main}</p>
</div>
    `})


    //create html day list
    let result=day_list.join("")
    day_list_dom.innerHTML=result

}catch(error){
    console.log(error);
}
}
