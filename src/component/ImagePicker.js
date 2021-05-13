import React, { useState } from "react";
import Clear1 from '../images/01.png';
import Cloud1 from '../images/02.jpg';
import Cloudss from '../images/03.jpg';
import Rain1 from '../images/04.jpg';

function ImagePicker(weather){
    var imageUrl = "";

    switch(weather)
    {
        case 'Clear':
            imageUrl = (Clear1)
            break;
        case 'Rain':
            imageUrl = (Rain1)
            break;
        case 'Clouds':
            imageUrl = (Cloud1)
            break;
        default:
            break;

    }
    console.log(imageUrl)
    return imageUrl;
   
}

export default ImagePicker