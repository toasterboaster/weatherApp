import React from 'react'

export default function Start(props){
//const [inputValue, setInputValue] = React.useState('Enter City or Zip Code')
/*
const handleInputChange = (e) => {
  setInputValue(e.target.value)
}*/
  
  return (
    <div className={props.className}>
      <h1>Title</h1>
      <form>
        <input placeholder="Enter city or zipcode" type="text" onChange={props.handleInputChange}></input>
        <button onClick={props.start}>Go</button>
      </form>
    </div>
  )
}