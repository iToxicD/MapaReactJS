import './App.css';
import ReactDOM from "react-dom";
import React, {useState} from 'react';

import {ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";
import 'react-tooltip/dist/react-tooltip.css'


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
function App() {
  return (
    <div className="App">
      <h1>Mapa del mundo</h1>
      <a className="my-anchor-element">◕‿‿◕</a>
      <div style={{width: "1000px", border: "solid black", borderRadius: "3px"}}>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
        </Geographies>
      </ComposableMap>
      </div>
    </div>
  );
}

export default App;
