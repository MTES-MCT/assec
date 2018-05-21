import React from 'react';
import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { Marker } from 'react-leaflet';

class MapMarker extends React.Component {
  shouldComponentUpdate (nextprops) {
    return !deepEqual(nextprops.position, this.props.position);
  }

  render () {
    const { position, onChange } = this.props;
    return (
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
  }
}

MapMarker.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

export default MapMarker;
