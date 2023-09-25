import React from 'react'
import './App.css'
import Start from './components/Start.jsx'
import Card from './components/Card.jsx'
import City from './components/City.jsx'
import { TrashFill } from 'react-bootstrap-icons';
import { nanoid } from "nanoid"



export default function App() {
  const [start, setStart] = React.useState(false)
  const [cityCard, setCityCard] = React.useState(false);
  const [data, setData] = React.useState(() => JSON.parse(localStorage.getItem('data')) || []);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState(0)
  const [showInput, setShowInput] = React.useState(false)

  React.useEffect(() => {
    if (data.length > 0) {
      setStart(true);
    } else {
      setStart(false)
    }
  }, [data]);
/*
  const fetchData = (zip) => {
    const id = nanoid();
    fetch(`https://api.weatherapi.com/v1/current.json?key=c50302f0df1c4366907192905232408&q=${zip}`)
      .then(response => response.json())
      .then((newData) => {
        newData.id = id;
        newData.inputValue = zip
        setData(prevData => [...prevData, newData])
      })
      .catch(error => console.error(error));
  };
*/
const fetchData = (zip) => {
    const id = nanoid();
    fetch(`https://api.weatherapi.com/v1/current.json?key=c50302f0df1c4366907192905232408&q=${zip}`)
      .then(response => response.json())
      .then((newData) => {
        if (newData.error){
          alert('no data found, try again')
          return
        }
        newData.id = id;
        newData.inputValue = zip
        setData(prevData => {
          const index = prevData.findIndex(item => item.inputValue === newData.inputValue);
        if (index !== -1) {
          // If they are equal, overwrite prevData with newData
          prevData[index] = newData;
        } else {
          // If they are not equal, add newData to prevData
          prevData.push(newData);
        }
        return [...prevData];
      });
      })
      .catch(error => console.error(error));
  };
  
  React.useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

   React.useEffect(() => {
    console.log('reloaded')
    data.forEach(city => fetchData(city.inputValue));
  }, [start, cityCard, selectedCity]);

  function startApp(event) {
    if (!inputValue) {
      alert('please enter a zipcode');
      event.preventDefault();
    } else {
      setStart(prev => !prev)
      fetchData(inputValue)
    }
    setInputValue('')
  }

  function selectCityCard(index) {
    setCityCard(prev => !prev)
    setSelectedCity(index)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)

  }

  function addAnotherCity(event) {
    if (!inputValue) {
      alert('please enter a zipcode');
      event.preventDefault();
    } else {
      setStart(prev => !prev)
      fetchData(inputValue)
    }
    setInputValue('')
    setShowInput(false)
  }

  function deleteCard(event, id) {
    event.stopPropagation();
    setData(oldData => oldData.filter(card => card.id !== id))
  }

  function toggleInput(){
    setShowInput(!showInput)
  }

//Styles
  let backgroundImage = {
    Overcast: 'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    Sunny: 'https://as1.ftcdn.net/v2/jpg/04/85/05/48/1000_F_485054834_qbckJ0zLAQ4yCH0YknVobBzZzbTQrGi2.jpg',
    Partly: 'https://as2.ftcdn.net/v2/jpg/05/03/95/29/1000_F_503952909_nhsGUEWQElxi6Qyp0jXDgdxJxr5epOmi.jpg',
    Light: 'https://as1.ftcdn.net/v2/jpg/05/47/85/28/1000_F_547852882_vonYN9J55L7oR5GXD5cLSk36EC0wmf9z.jpg',
    Moderate: 'https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_1280.jpg'
  }
  
  let cityCardArray = data.map((city, index) => {
    return (
      <Card
        cityName={city.location.name}
        cityTemp={city.current.temp_f}
        cityCondition={city.current.condition.text}
        key={index}
        id={city.id}
        inputValue={city.inputValue}
        localTime={city.location.localtime}
        city={() => selectCityCard(index)}
        delete={(event) => deleteCard(event, city.id)}
        reload={() => fetchData(city.inputValue)}
        style={{backgroundImage: `url('${backgroundImage[city.current.condition.text.split(' ')[0]]}')`,
               backgroundSize: 'cover'}}
      />
    )
  })

  return (
    <main>
      {!start && <div className='start--container'>
        <Start className="start" start={startApp} inputValue={inputValue} handleInputChange={handleInputChange} />
      </div>}
      {start && !cityCard && data &&
        <div className='menu--container'>
          {cityCardArray}
          <div className='add-city'>
            {showInput && <input placeholder="Enter city or zipcode" type="text" onChange={handleInputChange}></input>}
            {showInput && <button className='add--card' onClick={addAnotherCity}>go</button>}
            {!showInput && <button className='showInput add--card' onClick={toggleInput}>+</button>}
          </div>
        </div>
      }
      {cityCard &&
        <div className='city--detail--container'>
        <City
        goBack={selectCityCard}
        cityName={data[selectedCity].location.name}
        temperature={data[selectedCity].current.temp_f}
        condition={data[selectedCity].current.condition.text}
        wind={data[selectedCity].current.wind_mph}
        windDirection={data[selectedCity].current.wind_dir}
        pressure={data[selectedCity].current.pressure_in}
        humidity={data[selectedCity].current.humidity}
        feelsLike={data[selectedCity].current.feelslike_f}
      />
      </div>}
    </main>
  )
}
