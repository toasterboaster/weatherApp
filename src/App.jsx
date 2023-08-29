import React from 'react'
import './App.css'
import Start from './components/Start.jsx'
import Menu from './components/Menu.jsx'
import City from './components/City.jsx'


export default function App() {
  const [start, setStart] = React.useState(false)
  const [cityCard, setCityCard] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const fetchData = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=c50302f0df1c4366907192905232408&q=${inputValue}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        setData(data)})
      .catch(error => console.error(error));
  };


  function startApp() {
    setStart(prev => !prev)
    fetchData()
  }

  function selectCityCard() {
    setCityCard(prev => !prev)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)

  }

  return (
    <main>
      {!start && <Start start={startApp} inputValue={inputValue} handleInputChange={handleInputChange} />}
      {start && !cityCard && data && <Menu
        cityName={data.location.name}
        cityTemp={data.current.temp_f}
        cityCondition={data.current.condition.text}
        city={selectCityCard} />}
      {cityCard && <City 
                     goBack={selectCityCard}
                     cityName={data.location.name}/>}
    </main>
  )
}
