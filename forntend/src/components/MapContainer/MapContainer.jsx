import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState({ lat: 28.555670, lng: 77.175209 });
  const [customerLocation, setCustomerLocation] = useState({ lat: 28.7041, lng: 77.1025 });
  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 28.555670,
    lng: 77.175209
  };

  const directionsCallback = async (response) => {
    if (response !== null && response.status === 'OK') {
      await setDirections(response);
    }
  };

  useEffect(() => {
    const calculateDirections = async () => {
      const directionsService = new window.google.maps.DirectionsService();
      await directionsService.route({
        origin: deliveryPersonLocation,
        destination: customerLocation,
        travelMode: 'DRIVING',
      }, directionsCallback);
    };

    calculateDirections();

    // Reverse geocode source address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: deliveryPersonLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSourceAddress(results[0].formatted_address);
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });

    // Reverse geocode destination address
    geocoder.geocode({ location: customerLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setDestinationAddress(results[0].formatted_address);
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }, [deliveryPersonLocation, customerLocation]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDHu_7oAf_pzcTqiEEehejsiCRu5HozB90"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {/* Delivery Person Marker */}
        <Marker
          position={deliveryPersonLocation}
          onClick={() => setSelectedMarker('delivery')}
        />

        {/* Customer Marker */}
        <Marker
          position={customerLocation}
          onClick={() => setSelectedMarker('customer')}
        />

        {/* Directions */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* Info Windows */}
        {selectedMarker === 'delivery' && (
          <InfoWindow
            position={deliveryPersonLocation}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h2>Delivery Person</h2>
              <p>Delivery Person's Information</p>
            </div>
          </InfoWindow>
        )}

        {selectedMarker === 'customer' && (
          <InfoWindow
            position={customerLocation}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h2>Customer</h2>
              <p>Customer's Information</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div>
        <h2>Order Details</h2>
        <p>Source Address: {sourceAddress}</p>
        <p>Destination Address: {destinationAddress}</p>
        <p>Stipulated Time of Delivery: "deliveryTime"</p>
        {/* Add more information as needed */}
      </div>
    </LoadScript>
  );
};

export default MapContainer;
