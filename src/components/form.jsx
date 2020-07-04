import React from 'react';
import './form.style.css'

function Form(props) {    
    return (
      <div className="container">        
        <form onSubmit={(e)=> props.loadWeather(e)}>
          <div className="row">
            <div className="col-md-3 offset-md-2">
              <input
                type="text"
                className="form-control"
                name="city"
                autoComplete="off"
                placeholder="City"
                onChange={(e) => props.changeValue(e.target.value)}
              />
            </div>           
            <div className="col-md-3 mt-md-0 py-2 text-md-left">
              <button className="btn btn-warning">Get Weather</button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default Form


 