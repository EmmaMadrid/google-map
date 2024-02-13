import { Fragment, useState} from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./App.css";
const markers = [
  {
    id: 1,
    name: "Mi cantona",
    position: { lat: 32.458170, lng: -114.731765 },
  },
  {
    id: 2,
    name: "La UT",
    position: { lat: 32.438225, lng: -114.716648 },
  },
  {
    id: 3,
    name: "Hacienda",
    position: { lat: 32.479473, lng: -114.780380 },
  }
];


function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className='text-center'> Google Map Markers Emmanuel</h1>
        <div style={{ width: "100%", height: "90vh" }}>
          {isLoaded ? (
            <GoogleMap
            center={{ lat: 32.438225, lng: -114.716648 }}
            zoom={10}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "90vh" }}
          >
            {markers.map(({ id, name, position }) => (
              <MarkerF
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <p>{name}</p>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default App
