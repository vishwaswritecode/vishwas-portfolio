import { LightningElement } from 'lwc';
const API_KEY = 'c903cb40560c2be41f9697118d347ab9';

export default class WeatherApp extends LightningElement {

    cityName = '';
    loadingText = '';
    isError = false;

    get loadingClasses(){
        return this.isError ? 'error-msg' : 'success-msg'
    }
    searchHandler(event){
        this.cityName = event.target.value;
    }
    submitHandler(event){
        event.preventDefault();
        this.fetchWeatherData()
    }
    fetchWeatherData(){
        this.isError = false;
        this.loadingText = 'Fetching weather details..'
        //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}`
        console.log('cityName',this.cityName);
        console.log('url->',url);
        fetch(url).then(res => res.json())
        .then((result) => {
            console.log('result',result)
            this.weatherDetails(result);
            this.loadingText = '';
        })
        .catch((error) =>{
            this.loadingText = 'something went wrong..'
            this.isError = true;
            console.error('error',error);
        })
        
    }

    weatherDetails(info){
        if(info.cod == '404'){
            this.loadingText = `${this.cityName} ${info.message}`
            console.log(this.loadingText);
            this.isError = true;
        }else{
            this.loadingText = '';
        }
    }
}