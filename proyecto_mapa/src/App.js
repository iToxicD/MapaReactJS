import React, { useState, useEffect } from 'react';
import './App.css';
import { Tooltip } from 'react-tooltip'; 

import {ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";
import axios from 'axios';
import 'react-tooltip/dist/react-tooltip.css'

const marcadores = [
  {
    markerOffset: -15,
    name: "Spain",
    coordinates: [ -3.74922, 40.463667],
  }
];

function App() {
  const [contenido, setcontenido] = useState("");
  const [paisSeleccionado, setPaisSeleccionado] = React.useState(null);
  const [datosPais, setDatosPais] = useState(null);


  /*const url = 'https://restcountries.com/v3.1/capital/{capital}';
  React.useEffect(() => {
    axios.get(url).then((response) => {
      paisSeleccionado(response.data);
    })
  });*/

  useEffect(() => {
    if (paisSeleccionado && paisSeleccionado.name) {
      const url = `https://restcountries.com/v3.1/name/${paisSeleccionado.name}`;
      
      axios.get(url)
        .then((response) => {
          const countryData = response.data[0]; 
          setDatosPais({
            name: countryData.name.common,
            capital: countryData.capital[0],
            population: countryData.population,
            region: countryData.region,
          });
        })
        .catch(error => {
          window.alert(`No se han encontrado datos del pais: ${paisSeleccionado.name}`);
        });
    }
  }, [paisSeleccionado]);
  
  const clickPais = (geo) => {
    const { name, CAPITAL } = geo.properties;
    setPaisSeleccionado({
      name: name,
      capital: CAPITAL || 'Sin datos',
    });
  };
  
  return (
    
    <div className="App">
        <header class="header">
          <h1>Mapa del mundo</h1>
        </header>
      <Tooltip id='country-tooltip'/>
      <div className="section">
        <div className="card">
          <h1>Información del pais</h1>
          
          <hr></hr>
          <div className="container">
            {datosPais ? (
              <div>
                <h2>{datosPais.name}</h2>
                <p>Capital: {datosPais.capital}</p>
                <p>Población: {datosPais.population}</p>
                <p>Región: {datosPais.region}</p>
              </div>
            ) : (
              <p>Haz clic en un país para ver más información.</p>
            )}
          </div>

        </div>
        <div className="marco">
        <ComposableMap className="map" data-tip="">
          <ZoomableGroup>
            <Geographies geography="/features.json">
              {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography className= "geography" key={geo.rsmKey} geography={geo}
                    data-tooltip-id="country-tooltip"
                    data-tooltip-content={geo.properties.name}
                    onClick={() => {
                      const { name, CAPITAL, POP_EST, REGION_UN } = geo.properties;
                      setPaisSeleccionado({
                        name: name,
                        capital: CAPITAL || 'Sin datos',
                        population: POP_EST,
                        region: REGION_UN,
                      });
                    }}
                     
                    onMouseEnter={() => {
                      const{name} = geo.properties;
                      setcontenido(`${name}`);
                    }}
                    onMouseLeave={() => {setcontenido("");}}
                    style={{
                      hover: {
                        fill: "#6363db",
                        outline: "none",
                      }
                    }}/>
                  ))
                }
            </Geographies>     
                  {marcadores.map(({ name, coordinates, markerOffset}) => (
                    <Marker key ={name} coordinates={coordinates} >
                      <circle r={3} fill='#F00' stroke='#fff' strokeWidth={1}/>
                      <text textAnchor='middle' y={markerOffset} style={{fontFamily: "system-ui", fill: "#06a7fe"}}>
                        
                      </text>
                    </Marker>
                  ))}
          </ZoomableGroup>
          
        </ComposableMap>

        </div> 
      </div>
      <div className="texto">
          <p>Gracias por visitar este proyecto realizado con ReactJS, si quieres ver otros proyectos en los que he participado haz click abajo.</p>
          <a href="https://github.com/iToxicD">Saber más</a>
      </div>
    </div>
  );
}

export default App;
