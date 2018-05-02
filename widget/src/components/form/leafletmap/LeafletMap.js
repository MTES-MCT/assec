import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import orderby from 'lodash.orderby';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

// application
import GeoJSONLayer from './GeoJSONLayer';
import { TILES_LAYER, TILES_COPYRIGHT } from './../../../constants';

class LeafletMap extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    // FIXME -> pass coordinates from departement
    this.state = {
      zoom: 9,
      lng: 6.244354248046875,
      lat: 43.22319117678928,
    };
  }

  componentDidUpdate () {
    if (!this.map) return;
    // eslint-disable-next-line no-underscore-dangle
    const layers = this.map.leafletElement._layers;
    Object.values(layers)
      .filter(layer =>
        layer.options.order && typeof layer.options.order !== 'undefined')
      .sort((a, b) => a.options.order - b.options.order)
      .forEach((layer) => {
        layer.bringToFront();
      });
  }

  render () {
    const { zones, selected } = this.props;
    const position = [this.state.lat, this.state.lng];
    const ordered = orderby(zones, ['order'], ['asc']);
    const getzindex = index => 1000 + index;
    return (
      <Map center={position}
        zoom={this.state.zoom}
        ref={(ref) => {
          this.map = ref;
        }}>
        <TileLayer attribution={TILES_COPYRIGHT} url={TILES_LAYER} />
        {ordered &&
          ordered.map((obj, index) => {
            const zIndex = getzindex(index);
            return (
              <Field key={`mapzone_${obj.id}`}
                name="choice"
                style={{ zIndex }}
                selected={selected}
                props={{ obj, zIndex }}
                component={GeoJSONLayer} />
            );
          })}
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
