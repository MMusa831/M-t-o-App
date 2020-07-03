import React from 'react'

function Weather(props) {
    return (
      <div className="container text-light my-4">
        <div className="cards pt-4">
          <h1>{props.city}</h1>
          <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-1`}></i>
          </h5>
          {props.temp_celsius ? (
            <h1 className="p-2">{props.temp_celsius}&deg;</h1>
          ) : null}
          {minMaxTemp(props.temp_min, props.temp_max)}
          {props.humidity ? <h4>Humidity {props.humidity}%</h4> : null}          
          <h3 className="py-3">{props.description}</h3>
        </div>
      </div>
    );
}
function minMaxTemp(min, max) {
  if (min && max) {
    return (
      <h6>
        <span className="px-1">{min}&deg;</span>
        <span>/</span>
        <span className="px-1">{max}&deg;</span>
      </h6>
    );
  }
}
export default Weather
