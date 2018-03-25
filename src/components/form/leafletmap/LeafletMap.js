import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

// application
import { TILES_LAYER, TILES_COPYRIGHT } from './../../../constants';

class LeafletMap extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      zoom: 13,
      lng: -0.09,
      lat: 51.505,
    };
  }

  render () {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer attribution={TILES_COPYRIGHT} url={TILES_LAYER} />
      </Map>
    );
  }
}

export default LeafletMap;
