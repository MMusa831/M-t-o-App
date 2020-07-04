import React from 'react';
import './App.css';
import Weather from './components/weather';
import Form from './components/form';
import axios from 'axios';

const API_KEY = "d563cd356bbb8a3bcd452eb7d81c0ec9";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        humidity: null,
        country: null,
        city: null,
        icon: null,
        main: null,
        celsius: null,
        temp_max: null,
        temp_min: null,
        description: null,        
      }, 
      inputData: {
        city: '',
        country: ''
      },     
      coord: {
        lat: 45,
        lon: 60
      }
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-night-rain",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-cloudy",
    };
  }
  componentDidMount(){   
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=> {
        let newCoords =  {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        this.setState({coord: newCoords})        
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/find?lat=${this.state.coord.lat}&lon=${this.state.coord.lon}&cnt=10&appid=${API_KEY}`
            ).then(res => {              
              let weatherdata = {
                city: res.data.list[0].name,              
                celsius: this.calCelsius(res.data.list[0].main.temp),
                temp_max: this.calCelsius(res.data.list[0].main.temp_max),
                temp_min: this.calCelsius(res.data.list[0].main.temp_min),
                humidity: res.data.list[0].main.humidity,
                description: res.data.list[0].weather[0].description
              }
              this.setState({
                data: weatherdata
              })
             this.get_weatherIcon(this.weatherIcon, res.data.list[0].weather[0].id);             
            })
        })
    } else {
      console.log('Not Supported!!')
    }   
  }
  get_weatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({
          icon: this.weatherIcon.Thunderstorm,
        });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle,
        });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({
          icon: this.weatherIcon.Rain,
        });
        break;
      case rangeId >= 600 && rangeId <= 522:
        this.setState({
          icon: this.weatherIcon.Snow,
        });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({
          icon: this.weatherIcon.Atmosphere,
        });
        break;
      case rangeId === 800:
        this.setState({
          icon: this.weatherIcon.Clear,
        });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds,
        });
        break;
      default:
        this.setState({
          icon: this.weatherIcon.Clouds,
        });
    }
  }
  getWeather = (event) => {
    event.preventDefault();
   
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&appid=${API_KEY}`
        )
        .then((res) => {
          const response = res.data;          
           const weatherdata =   {
            city: response.name,
            celsius: this.calCelsius(response.main.temp),
            temp_max: this.calCelsius(response.main.temp_max),
            temp_min: this.calCelsius(response.main.temp_min),
            humidity: response.main.humidity,
            description: response.weather[0].description,
            error: false
          }
          this.setState({
            data: weatherdata
          })
          this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
        });    
     };  
  calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };
  handleChange= value => {
    this.setState({
      inputData:  value            
    })
  }
  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} changeValue={this.handleChange}/>
        <Weather
          city={this.state.data.city}
          country={this.state.data.country}
          temp_celsius={this.state.data.celsius}
          temp_max={this.state.data.temp_max}
          temp_min={this.state.data.temp_min}
          description={this.state.data.description}
          weatherIcon={this.state.icon}
          humidity={this.state.data.humidity}          
        />
      </div>
    );
  }
}
export default App;
