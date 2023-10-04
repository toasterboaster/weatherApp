import React from 'react'

export default function City(props) {
  return (
      <div style={props.style} className="city--card--container">
        <button className="backButton" onClick={props.goBack}>Back</button>
      <h3>{props.cityName}</h3>
      
      <div className="detail--container">
        <div className='detail--column--name'>
          <h4>Temperature</h4>
          <h4>Condition</h4>
          <h4>Humidity</h4>
          <h4>Feels Like</h4>
          <h4>Wind Speed</h4>
          <h4>Wind Direction</h4>
          <h4>Pressure</h4>
        </div>
        <div className="detail--column--data">
          <h4>{props.temperature}</h4>
          <h4>{props.condition}</h4>       
          <h4>{props.humidity}</h4>       
          <h4>{props.feelsLike}</h4>        
          <h4>{props.wind} mph</h4>      
          <h4>{props.windDirection}</h4>      
          <h4>{props.pressure} in</h4>
        </div>          
      </div>
      </div>
  )
}