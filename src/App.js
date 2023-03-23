import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
//primeFlex
import "/node_modules/primeflex/primeflex.css"

import './App.css';

import secret from './secret';

import sun from './icons/sun.png';
import cloud from './icons/cloud.png';
import rain from './icons/rain.png';
import niente from './icons/niente.png';




function App() {

  const [meteo, setMeteo] = useState();
  const [city, setCity] = useState("Rome");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://api.weatherapi.com/v1/current.json?key="+secret+"&q="+city+"&aqi=no")
      .then((response) => {
        setMeteo(response.data)
        setIsLoaded(true)
      }
      )
      .catch((error) => {
        console.log(error);
      }
      )
  }, [city]);

  return (
    <div className="centro">
      <h1>Meteo</h1>

      <h2>{isLoaded && meteo.location.name}</h2>

      <Image src={isLoaded ? (meteo.current.condition.text==='Sunny' ? sun:cloud) : niente} alt="Image" width="50" />
      <p>{isLoaded && meteo.current.condition.text}</p>

      <Button label="Milano" icon="pi pi-refresh" onClick={() => setCity("Milan")} />
      <Button label="Roma" icon="pi pi-refresh" onClick={() => setCity("Rome")} />
      <Button label="Napoli" icon="pi pi-refresh" onClick={() => setCity("Naples")} />

      <p>{isLoaded && meteo.current.temp_c}</p>
      
    </div>
  );
}

export default App;
