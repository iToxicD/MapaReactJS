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
//const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
function App() {
  const [contenido, setcontenido] = useState("");
  return (
    <div className="App">
      <h1>Mapa del mundo</h1>
      <Tooltip id='country-tooltip'/>
      <a className="my-anchor-element">◕‿‿◕</a>
      <div style={{width: "1400px", border: " 1px solid black", borderRadius: "3px"}}>
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
                  }}onMouseLeave={() => {setcontenido("");

                  }}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    }
                  }}
                  />
                ))
              }
          </Geographies>
                        
          {marcadores.map(({ name, coordinates, markerOffset}) => (
                  <Marker key ={name} coordinates={coordinates} >
                    <circle r={5} fill='#F00' stroke='#fff' strokeWidth={2}/>
                    <text textAnchor='middle' y={markerOffset} style={{fontFamily: "system-ui", fill: "#06a7fe"}}>
                      {name}
                    </text>
                  </Marker>
                ))}
        </ZoomableGroup>
      </ComposableMap>
      </div> 
    </div>
  );
}

export default App;
