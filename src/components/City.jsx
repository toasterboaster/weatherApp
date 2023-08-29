import React from 'react'

export default function City(props) {
  return (
    <div className="city--container">
      <div className="city--card--container">
        <button className="backButton" onClick={props.goBack}>Back</button>
      <h3>{props.cityName}</h3>
      <div className="detail--container">
          <span className="detail">detail</span>
          <span className="detail--data">detailData</span>
      </div>
      </div>
    </div>
  )
}