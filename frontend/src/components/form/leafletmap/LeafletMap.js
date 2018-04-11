import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

// application
import GeoJSONLayerInput from './../inputs/GeoJSONLayerInput';
import { TILES_LAYER, TILES_COPYRIGHT } from './../../../constants';

class LeafletMap extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      zoom: 9,
      lng: 6.244354248046875,
      lat: 43.22319117678928,
    };
  }

  render () {
    const { zones, selected } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer attribution={TILES_COPYRIGHT} url={TILES_LAYER} />
        {zones &&
          zones.map(obj => (
            <Field key={`mapzone_${obj.id}`}
              name="choice"
              selected={selected}
              component={GeoJSONLayerInput}
              props={{
                id: obj.id,
                geojson: obj.geojson,
              }} />
          ))}
      </Map>
    );
  }
}

LeafletMap.defaultProps = {
  selected: null,
};

LeafletMap.propTypes = {
  selected: PropTypes.string,
  zones: PropTypes.array.isRequired,
};

export default connect(({ selected }) => ({ selected }))(LeafletMap);
