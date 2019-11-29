import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {

  const [ weather, setWeather ] = useState( { main:{temp:'err' }, wind:{speed:2} ,
      weather:[ { description:'none'}] })

  useEffect( () => {
    axios
      .get( `https://api.openweathermap.org/data/2.5/weather?q=${props.city},${props.country}&APPID=XX API CODE HERE XXXXXXXXXXXXXXX&units=metric` )
      .then( response => {
        console.log( response.data )
        setWeather( response.data )
      })
  }, [props.city, props.country] )

  return (
    <div>
      <h2>Weather in {props.city}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <p>Wind : {weather.wind.speed} km/h</p>
    </div>
  )

}


export default Weather
