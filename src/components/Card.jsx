import React from 'react'
import { TrashFill } from 'react-bootstrap-icons';


export default function Card(props) {
  return (
      <div className='menu--card'>
        <TrashFill className="trashButton" width="24" height="24" color="red"/>
        <h3>{props.cityName}</h3>
        <h4>{props.cityTemp}</h4>
        <h4>{props.cityCondition}</h4>
        <button onClick={props.city}>More...</button>
      </div>
  )
}