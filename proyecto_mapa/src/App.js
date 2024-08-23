import { useState } from 'react';
import './App.css';
import { Tooltip } from 'react-tooltip'; 
import axios from 'axios';

import {ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";
//import 'react-tooltip/dist/react-tooltip.css'

const marcadores = [
  {
    markerOffset: -15,
    name: "Spain",
    coordinates: [ -3.74922, 40.463667],
  }
];

function App() {
  const [contenido, setcontenido] = useState("");
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false); 
  const obtenerInformacionPais = async (nombrePais) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${nombrePais}`);
      const pais = response.data[0];
      setPaisSeleccionado({
        name: pais.name.common,
        capital: pais.capital ? pais.capital[0] : 'Desconocida',
        population: pais.population,
        region: pais.region,
      });
    } catch (error) {
      console.error("Error al obtener información del país:", error);
      setPaisSeleccionado(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
        <header class="header">
          <h1>World Map</h1>
        </header>
      <Tooltip id='country-tooltip'/>
      <div className="section">
        <div className="card">
          <h1>Información del pais</h1>
          <hr></hr>
          <div className="container">
          {paisSeleccionado ? (
              <div>
                <h2>{paisSeleccionado.name}</h2>
                <p>Capital: {paisSeleccionado.capital}</p>
                <p>Población: {paisSeleccionado.population}</p>
                <p>Región: {paisSeleccionado.region}</p>
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
                    <Geography key={geo.rsmKey} geography={geo}
                    data-tooltip-id="country-tooltip"
                    data-tooltip-content={geo.properties.name}
                    onClick={() => {
                      const { NAME, CAPITAL, POP_EST, REGION_UN } = geo.properties;
                      setPaisSeleccionado({
                        name: NAME,
                        capital: CAPITAL || 'Sin datos',
                        population: POP_EST,
                        region: REGION_UN,
                      });
                    }}
                     
                    onMouseEnter={() => {
                      const{NAME} = geo.properties;
                      setcontenido(`${NAME}`);
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
                        {name}
                      </text>
                    </Marker>
                  ))}
          </ZoomableGroup>
          
        </ComposableMap>

        </div> 
      </div>
      <div className="texto">
          <p>Gracias por visitar este proyecto realizado con ReactJS, si quieres ver otros proyectos en los que he participado haz click en el botón de abajo.</p>
          <a href="https://github.com/iToxicD">Saber más</a>
      </div>
    </div>
  );
}

export default App;
