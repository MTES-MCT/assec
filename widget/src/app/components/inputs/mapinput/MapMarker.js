import React from 'react';
import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';

const MapMarker = ({ position, onChange }) => (
  <Marker draggable
    position={position}
    onClick={({ latlng }) => onChange(latlng)}
    onDragEnd={({ target }) => onChange(target.getLatLng())}
    icon={Leaflet.divIcon({
      className: 'leaflet-marker-divicon',
      html: `
        <div class="leaflet-marker-divicon-container">
          <div class="leaflet-marker-divicon-inner">
            <div class="leaflet-marker-divicon-pin"></div>
            <div class="leaflet-marker-divicon-pulse"></div>
          </div>
        </div>
        `,
    })} />
);

MapMarker.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

export default MapMarker;
