import React from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react';
function Inputs({ setquery, units, setunits }) {
  const [city, setcity] = useState("");
  const handlesearchclick = () => {
    if(city!=='')setquery({q:city})
  }
  const handleunitschange = (e) => {
    const selectedunit = e.currentTarget.name
    if (units !== selectedunit) setunits(selectedunit);
  }
  const handlelocationclick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setquery({
          lat, lon
        });
      });
    }
  };
  return(
  <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e)=>setcity(e.currentTarget.value)}
          type="text"
          placeholder="search for city...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handlesearchclick}
        />
        <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125"
        onClick={handlelocationclick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" className="text-xl text-white font-light transition ease-out hover:scale-125"
        onClick={handleunitschange}
        >°C</button>
          <p className="text-xl text-white mx-1">|</p>
        <button name="imperial" className="text-xl text-white font-light transition ease-out hover:scale-125"
        onClick={handleunitschange}
        >°F</button>
      </div>
  </div>);
}

export default Inputs
/* 
°
*/