import React from 'react'

function Weather(props) {
    return (
      <div className="container text-light my-4">
        <div className="cards pt-4">
          <h1>
            {props.city}
          </h1>
          <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-1`}></i>
          </h5>
          {props.celsius ? <h1 className="p-2">{props.temp_celsius}&deg;</h1>: null}
          {minMaxTemp(props.temp_min, props.temp_max)}
          <h3 className="py-3">{props.description}</h3>
        </div>
      </div>
    );
}
function minMaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-5">min {min}&deg;</span>
        <span className="px-5">max {max}&deg;</span>
      </h3>
    );
  }
}
export default Weather
