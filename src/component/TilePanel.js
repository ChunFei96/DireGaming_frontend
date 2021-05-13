import React, { useEffect, useState } from "react";
import Select from 'react-select'
import WeatherGridLine from './WeatherGirdList'
import DataFetching from './DataFetching'
import Clear from '../images/01.png';
import ImagePicker from './ImagePicker'

export default function TilePanel() {
    const [cityName, setCityName] = useState("");
    const [interval, setInterval] = useState("");
    const [tileArray, setTileArray] = useState([]);

    var key = "";
    var weather = "";
    var temperature = "";
    var image = "";
    const styles={
        app:{
          justifyItems:'center',
          alignItems:'center',
          display:'grid',
          fontFamily:'Arial',
          color:'rgba(0,0,100,1)',
          gridTemplateColumns:'1fr',
          fontSize:25
        },
        select:{
          width:'100%',
          height:'50%',
          maxWidth:200,
          
        }
      }

    const intervalOptions = [
        { value: '10', label: '10s' },
        { value: '15', label: '15s' },
        { value: '25', label: '25s' },
        { value: '60', label: '60s' }
      ]

    const onChangeInput = e =>{
        setInterval(e.value);
    }

    /*
    tile.img
    tile.temperature
    title.weather
    title.cityName
    title.interval
    */



    function removeTile(tile)
    {
      console.log("remove ", tile.cityName)
      var array = tileArray.filter(function(s) { return s != tile });
      setTileArray(array);
    }

    function addTileArray() {
        DataFetching(cityName).then(result => {
          key = result.data.id
          weather = result.data.weather[0].main;
          temperature = (result.data.main.temp - 273.15).toFixed(0).toString() + "C";
          image = ImagePicker(result.data.weather[0].main)
          console.log("key:" + key)
          console.log("city: " + cityName)
          console.log("weather: " + weather);
          console.log("temperature: " + temperature);
          console.log("image: " + image)
          
          let newTile = {key: key, cityName: cityName, weather:weather,temperature:temperature , interval: interval, img:image};
          let arr = tileArray.concat(newTile);
          setTileArray(arr)
        });
    };

    return( 
        <>
        <WeatherGridLine getTileArr = { tileArray } removeTile={ (tile) => {removeTile(tile)} }/>
        <hr/>
        <div style={styles.app}>
            <input type="text" placeholder="City Name" onChange={e => setCityName(e.target.value)} />
            <div style={styles.select}>
                <Select options={intervalOptions} onChange={onChangeInput}   />
            </div>
        </div>
        <br></br>
        <button onClick={addTileArray}>Add Tile</button>

        </>
    )
  }