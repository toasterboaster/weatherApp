import React from 'react'

export default function Menu(props) {
  return (
    <div className='menu--container'>
      <div className='menu--card'>
        <h3>{props.cityName}</h3>
        <h4>{props.cityTemp}</h4>
        <h4>{props.cityCondition}</h4>
        <button onClick={props.city}>More...</button>
      </div>
      <div className='menu--card'>
        <button className='add--card'>+</button>
      </div>
    </div>
  )
}