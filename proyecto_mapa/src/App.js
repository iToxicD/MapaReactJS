import React, { useState, useEffect } from 'react';
import './App.css';
import { Tooltip } from 'react-tooltip'; 

import {ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";
import axios from 'axios';
import 'react-tooltip/dist/react-tooltip.css'

//Marcador de España en el mapa
const marcadores = [
  {
    markerOffset: -15,
    name: "Spain",
    coordinates: [ -3.74922, 40.463667],
  }
];

function App() {
  // Almacena el contenido del tooltip
  const [contenido, setcontenido] = useState("");
  // Define el estado del pais seleccionado
  const [paisSeleccionado, setPaisSeleccionado] = React.useState(null);
  // Define el estado para guardar los datos del pais seleccionado
  const [datosPais, setDatosPais] = useState(null);

  useEffect(() => {
    // Comprueba si hay un pais seleccionado y que tenga nombre
    if (paisSeleccionado && paisSeleccionado.name) {
      // URL para la API
      const url = `https://restcountries.com/v3.1/name/${paisSeleccionado.name}`;
      
      // Hace la solicitud a la API para obtener la información del pais
      axios.get(url)
        .then((response) => {
          // Obtiene los datos
          const countryData = response.data[0];
          // Actualiza con los datos del pais 
          setDatosPais({
            name: countryData.name.common,
            capital: countryData.capital[0],
            population: countryData.population,
            region: countryData.region,
          });
        })
        .catch(error => {
          /* En caso de que no haya datos de un pais mostrara una alerta indicando que no hay datos.
          Por motivos desconocidos, en la API hay algunos paises que no tienen datos o son incorrectos.*/
          window.alert(`No se han encontrado datos del pais: ${paisSeleccionado.name}`);
        });
    }
  }, 
  // El useEffect se ejcutara cada vez que se cambie de pais
  [paisSeleccionado]);
  
  /*Con esta constante se maneja el click que se hace en cada pais,
  actualizando el nombre y capital del mismo.
  */
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
            /* Muestra información del pais o 
            si no hay ningun seleccionado muestra un mensaje por defecto*/
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
                      // Actualiza el estado con la información del pais clicado
                      setPaisSeleccionado({
                        name: name,
                        capital: CAPITAL || 'Sin datos',
                        population: POP_EST,
                        region: REGION_UN,
                      });
                    }}
                     
                    onMouseEnter={() => {
                      const{name} = geo.properties;
                      // Actualiza la información del pais 
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
                  // Muestra los marcadores en el mapa
                  {marcadores.map(({ name, coordinates, markerOffset}) => (
                    <Marker key ={name} coordinates={coordinates} >
                      <circle r={3} fill='#F00' stroke='#fff' strokeWidth={1}/>
                      <text textAnchor='middle' y={markerOffset} style={{fontFamily: "system-ui", fill: "#06a7fe"}}>
                        // Si se desea colocar el nombre encima del marcador solo se tendria que añadir "name" con dos llaves a cada lado
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
