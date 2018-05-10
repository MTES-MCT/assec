import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import orderby from 'lodash.orderby';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

// application
import GeoJSONLayer from './GeoJSONLayer';

const IGN_KEY = process.env.REACT_APP_IGN_KEY;
const ignBase = `https://wxs.ign.fr/${IGN_KEY}/geoportail/wmts`;
const ignOptions = [
  'TileCol={x}',
  'TileRow={y}',
  'Service=WMTS',
  'Version=1.0.0',
  'TileMatrix={z}',
  'Request=GetTile',
  'tilematrixset=PM',
];
const ignLayers = [
  'GEOGRAPHICALGRIDSYSTEMS.PLANIGN&style=normal&format=image/jpeg',
  'CADASTRALPARCELS.PARCELS&style=bdparcellaire&Format=image/png',
];
const attr =
  '&copy; <a href="https://www.geoportail.gouv.fr">IGN-F/Geoportail</a>';

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
    // 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    // https://geoservices.ign.fr/documentation/donnees-ressources-wmts.html
    const { zones, selected } = this.props;
    const getzindex = index => 1000 + index;
    const getkey = index => `ignlayer_${index}`;
    const position = [this.state.lat, this.state.lng];
    const ordered = orderby(zones, ['order'], ['asc']);
    return (
      <Map center={position}
        zoom={this.state.zoom}
        ref={(ref) => {
          this.map = ref;
        }}>
        {ignLayers.map((layer, index) => {
          const uri = `${ignBase}?${ignOptions.join('&')}&layer=${layer}`;
          return <TileLayer key={getkey(index)} url={uri} attribution={attr} />;
        })}
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
