import React from 'react'
import { TrashFill, ArrowRepeat } from 'react-bootstrap-icons';

export default function Card(props) {
  return (
      <div style={props.style} className='menu--card'>
        <TrashFill 
          className="trashButton" 
          width="24" 
          height="24" 
          color="red"
          onClick={props.delete}/>
        <button onClick={props.reload}>
          <ArrowRepeat />
        </button>
        <h3>{props.cityName}</h3>
        <h4>{props.cityTemp}</h4>
        <h4>{props.cityCondition}</h4>
        <h4>{props.localTime}</h4>
        <button onClick={props.city}>More...</button>
      </div>
  )
}