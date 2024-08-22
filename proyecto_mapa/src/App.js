import { useState } from 'react';
import './App.css';
import { Tooltip } from 'react-tooltip'; 



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
  return (
    <div className="App">
      <div className="title">
        <h1>World Map</h1>
      </div>
      
      <div className="columna1">
          <p>lorem  </p>
      </div>
      
      <Tooltip id='country-tooltip'/>

      <div className="marco">
      <ComposableMap className="map" data-tip="">
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo}
                  data-tooltip-id="country-tooltip"
                  data-tooltip-content={geo.properties.name} 
                  onMouseEnter={() => {
                    const{NAME} = geo.properties;
                    setcontenido(`${NAME}`);
                  }}
                  onMouseLeave={() => {setcontenido("");}}
                  style={{
                    hover: {
                      fill: "#62e55f",
                      outline: "none",
                    }
                  }}
                  />
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
      <div className="texto">
          <p>Gracias por visitar este proyecto realizado con ReactJS, si quieres ver otros proyectos en los que he participado haz click en el botón de abajo.</p>
          <a href="https://github.com/iToxicD">Saber más</a>
      </div>
    </div>
  );
}

export default App;
