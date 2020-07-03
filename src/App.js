import React from 'react';
import './App.css';
import Weather from './components/weather';
import Form from './components/form'
import axios from 'axios'


const API_KEY = "d563cd356bbb8a3bcd452eb7d81c0ec9";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      humidity: null,
      country: null,
      city: null,
      icon: null,
      main: null,
      celsius: null,
      temp_max: null,
      temp_min: null,
      description: null,
      error: false,
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
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    if (city && country) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
          this.setState({
            city: `${response.name},${response.sys.country}`,
            celsius: this.calCelsius(response.main.temp),
            temp_max: this.calCelsius(response.main.temp_max),
            temp_min: this.calCelsius(response.main.temp_min),
            humidity: response.main.humidity,
            description: response.weather[0].description,
            error: false
          });
          this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
        });
        
    } else {
      this.setState({
        error: true,
      });
    }
  };
  
  calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          humidity={this.state.humidity}
        />
      </div>
    );
  }
}

export default App;
