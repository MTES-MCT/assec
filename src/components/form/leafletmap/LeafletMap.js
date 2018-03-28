import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import { Field, formValueSelector } from 'redux-form';

// application
import GeoJSONInput from './../inputs/GeoJSONInput';
import { FORM_NAME, TILES_LAYER, TILES_COPYRIGHT } from './../../../constants';

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
    const { zones } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer attribution={TILES_COPYRIGHT} url={TILES_LAYER} />
        {zones &&
          zones.map(obj => (
            <Field name="choice"
              component={GeoJSONInput}
              key={`mapzone_${obj.id}`}
              props={{
                id: obj.id,
                geojson: obj.geojson,
              }} />
          ))}
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  zones: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
};

const selector = formValueSelector(FORM_NAME);
export default connect(state => ({ selected: selector(state, FORM_NAME) }))(LeafletMap);
