import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetching(cityName){
    const city = cityName;
    const appid = "0390060ba8e42fcb040da09dacd90cb4";

    return axios.get('https://api.openweathermap.org/data/2.5/weather',{
            params:{
                q: city,
                appid: appid
            }
        });
    
}

export default DataFetching