import React, { useState, useEffect } from 'react';

function App() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [alt, setAlt] = useState(0);
  const [units, setUnits] = useState("miles");
  const [url, setUrl] = useState("https://maps.google.com/maps?hl=en-us;z=14&amp;output=embed")
  function refresh() {
    fetch("https://api.wheretheiss.at/v1/satellites/25544?units=miles").then(res => res.json()).then(
      (result) => {
        setLat(result.latitude);
        setLong(result.longitude);
        setAlt(result.altitude);
        setUrl(`https://maps.google.com/maps?q=${result.latitude},${result.longitude}&hl=en-us;z=14&output=embed`);
      }
    )
  }
  useEffect(() => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544?units=miles").then(res => res.json()).then(
      (result) => {
        setLat(result.latitude);
        setLong(result.longitude);
        setAlt(result.altitude);
        setUnits(result.units);
        setUrl(`https://maps.google.com/maps?q=${result.latitude},${result.longitude}&hl=en-us;z=14&output=embed`);
      }
    )
  }, []);
  return (
    <>
      <span>Latitiude: {lat}</span><br />
      <span>Longitude: {long}</span><br />
      <span>Altitude: {alt}</span><br />
      <span>Units: {units}</span><br />
      { /* eslint-disable-next-line */ }
      <iframe width="500" height="500" src={url}></iframe><br />
      <button onClick={refresh}>Reload results</button><br />
      <a href="../server">Having trouble? Use the server-side version!</a>
    </>
  );
}

export default App;
