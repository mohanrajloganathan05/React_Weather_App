import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from './assets/search-icon.png'
import clearIcon from './assets/clear-icon.png'
import cloudIcon from './assets/cloud-icon.png'
import drizzleIcon from './assets/drizzle-icon.png'
import rainIcon from './assets/rain-icon.png'
import windIcon from './assets/wind-icon.png'
import snowIcon from './assets/snow-icon.png'
import humidityIcon from './assets/humidity-icon.png'

const Weather = ({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(
     <>
        <div className='weather-container'>
              <div className='weather-icon-div'>
               <img className="weather-icon" src={icon} alt="image" />
               </div>
              <div className="temp">{temp}°C</div>
              <div className="location">{city}</div>
              <div className="country">{country}</div>
              <div className="co-ord">
                  <div>
                    <span className='latitude'>lattitude : {lat}</span><br />
                    <span className='longitude'>longitude : {long}</span>
                  </div>
              </div>
              <div className="data-container">
                      <div className="element">
                          <img src={humidityIcon} alt="" className='icon' />
                      </div>
                      <div className="data"></div>
                      <div className="humidity">{humidity}%</div><br/>
                      <div className='text'>Humidity</div>

                      <div className="element">
                         <img src={windIcon} alt="wind-img" className='icon'/>
                      </div>
                      <div className="data"></div>
                      <div className="humidity">{wind} km/h</div><br />
                      <div className='wind'>wind</div>
                      
              </div>
            

        </div>
      
     </>
  );
}



function App() {
  const [icon,setIcon] = useState(cloudIcon)
  const [temp,setTemp] = useState(0)
  const [city,setCity] = useState('Salem')
  const [country,setCountry] = useState('')
  const [latitude,setLatitude] = useState(0)
  const [longitude,setLongitude] = useState(0)
  const [humidity,setHumidity] = useState(0)
  const [wind,setWind] = useState(0)
  const [value,setValue] = useState("Salem")
  const [loading,setLoading] = useState(false)
  const [notFound,setNotFound] = useState(false)
  const [error,setError]  = useState('')

  useEffect(()=>{
    search();
  },[]);
  
  const weatherIcon = {
    "01d" : clearIcon,
    "01n" : clearIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : drizzleIcon,
    "03n" : drizzleIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "09n" : rainIcon,
    "10d" : rainIcon,
    "10n" : rainIcon,
    "13d" : snowIcon,
    "13n" : snowIcon,
  };


  
  const search = async ()=>{

     
    setLoading(true) 

    const API=`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=949d67ad85c68ebbada012f6e4ebdcc6&units=Metric`
    try{
      const response= await fetch(API)
      const data = await response.json()
      
      if(data.cod==404)
      {
        console.log("city not found")
        setNotFound(true)
        setLoading(false)
        return
      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(data.main.temp)
      setCity(data.name)
      setCountry(data.sys.country)
      setLatitude(data.coord.lat)
      setLongitude(data.coord.lon)
      const weatherIconCode=data.weather[0].icon
      setIcon(weatherIcon[weatherIconCode]||clearIcon)
      setNotFound(false)

    }
    catch(err){
       console.log("Error:",err.message)
       setError("Error while fetching data!")


    }
    finally{
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

   
  }

const handlekeydown = (e)=>{
  if(e.key=='Enter')
     search()

}
const handleClick =()=>{
   search();
}
 
  return (
    <>
   
      <div className='container'>
                <div className='input-container'> 
                  <input type="text"
                    className='city-input'
                    placeholder='search city'
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    onKeyDown={handlekeydown}
                  />
                    <img className='search-icon' src={searchIcon} alt="Search" 
                    onClick={handleClick}/>
                </div >

               { !loading && !notFound && < Weather icon={icon} temp={temp} city={city} country={country} lat={latitude}
                 long={longitude} wind={wind} humidity={humidity}/>}

            
               {loading && <div className='loading'>Loading...</div> }
               {error && <div className="error">{error}</div>}
               {notFound && <div className="notfound">City Not Found !</div>}

                <div className='c'><a href="https://www.linkedin.com/in/mohanraj-l-65695b2a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">&copy; by Mohanraj L</a></div>

       
      </div>
    </>
  )
}

export default App
