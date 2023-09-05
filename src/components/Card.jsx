import React from 'react'
import { TrashFill } from 'react-bootstrap-icons';


export default function Card(props) {
  return (
      <div className='menu--card'>
        <TrashFill 
          className="trashButton" 
          width="24" 
          height="24" 
          color="red"
          onClick={props.delete}/>
        <h3>{props.cityName}</h3>
        <h4>{props.cityTemp}</h4>
        <h4>{props.cityCondition}</h4>
        <h4>{props.localTime}</h4>
        <h4>{props.id}</h4>
        <h4>{props.inputValue}</h4>
        <button onClick={props.city}>More...</button>
      </div>
  )
}