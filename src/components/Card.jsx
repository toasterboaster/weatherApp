import React from 'react'

export default function Card(props) {
  return (
      <div className='menu--card'>
        <h3>{props.cityName}</h3>
        <h4>{props.cityTemp}</h4>
        <h4>{props.cityCondition}</h4>
        <button onClick={props.city}>More...</button>
      </div>
  )
}