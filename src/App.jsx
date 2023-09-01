import React from 'react'
import './App.css'
import Start from './components/Start.jsx'
import Card from './components/Card.jsx'
import City from './components/City.jsx'
import { TrashFill } from 'react-bootstrap-icons';
import {nanoid} from "nanoid"



export default function App() {
  const [start, setStart] = React.useState(false)
  const [cityCard, setCityCard] = React.useState(false);
  const [data, setData] = React.useState(() => JSON.parse(localStorage.getItem('data')) || []);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState(0)

React.useEffect(() => {
    if (data.length > 0) {
      setStart(true);
    }else {
      setStart(false)
    }
  }, [data]);

  const fetchData = (zip) => {
    const id = nanoid();
    fetch(`https://api.weatherapi.com/v1/current.json?key=c50302f0df1c4366907192905232408&q=${zip}`)
      .then(response => response.json())
      .then((newData) => {
        newData.id = id;
        setData(prevData => [...prevData, newData])
      })
      .catch(error => console.error(error));
  };

  React.useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])


  function startApp() {
    setStart(prev => !prev)
    fetchData(inputValue)
  }

  function selectCityCard(index) {
    setCityCard(prev => !prev)
    setSelectedCity(index)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)

  }

  function addAnotherCity(){
    fetchData(inputValue)
  }
  
  function deleteCard(event, id){
    event.stopPropagation();
    setData(oldData => oldData.filter(card => card.id !== id))
  }

  
  

  let cityCardArray = data.map((city, index) => {
    return (
      <Card
            cityName={city.location.name}
            cityTemp={city.current.temp_f}
            cityCondition={city.current.condition.text}
            key={index}
            id={city.id}
            city={() => selectCityCard(index)}
            delete={(event) => deleteCard(event, city.id)}
            />
    )
  })
    
  return (
    <main>
      <div className='start--container'>
      {!start && <Start className="start" start={startApp} inputValue={inputValue} handleInputChange={handleInputChange} />}
        </div>
      {start && !cityCard && data &&
        <div className='menu--container'>
          {cityCardArray}
          <div className='menu--card'>
            <input placeholder="Enter city or zipcode" type="text" onChange={handleInputChange}></input>
            <button className='add--card' onClick={addAnotherCity}>+</button>
          </div>
        </div>
      }
      {cityCard && <City
        goBack={selectCityCard}
        cityName={data[selectedCity].location.name} 
                     />}
    </main>
  )
}
