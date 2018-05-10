/* eslint
  no-underscore-dangle: 0
*/
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
  {
    zoom: { max: 0, min: 18 },
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGN&style=normal&format=image/jpeg',
  },
  {
    zoom: { max: 12, min: 18 },
    layer: 'CADASTRALPARCELS.PARCELS&style=bdparcellaire&Format=image/png',
  },
];
const attr =
  '&copy; <a href="https://www.geoportail.gouv.fr">IGN-F/Geoportail</a>';

const getzindex = index => 1000 + index;
const getkey = index => `ignlayer_${index}`;
const getopacity = zoom => (zoom <= 11 && '0.4') || '0.1';

class LeafletMap extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.state = { zoom: props.zoom };
    this.onZoomEnd = this.onZoomEnd.bind(this);
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

  onZoomEnd ({ target }) {
    this.setState({ zoom: target._zoom });
  }

  render () {
    // 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    // https://geoservices.ign.fr/documentation/donnees-ressources-wmts.html
    const { zones, selected } = this.props;
    const center = [this.props.lat, this.props.lng];
    const ordered = orderby(zones, ['order'], ['asc']);
    return (
      <Map center={center}
        zoom={this.props.zoom}
        onZoomEnd={this.onZoomEnd}
        ref={(ref) => {
          this.map = ref;
        }}>
        {ignLayers
          .filter(({ zoom }) => {
            const { max, min } = zoom;
            return max < this.state.zoom && min > this.state.zoom;
          })
          .map(({ layer }, index) => {
            const uri = `${ignBase}?${ignOptions.join('&')}&layer=${layer}`;
            return (
              <TileLayer key={getkey(index)} url={uri} attribution={attr} />
            );
          })}
        {ordered &&
          ordered.map((obj, index) => {
            const zIndex = getzindex(index);
            const opacity = getopacity(this.state.zoom);
            return (
              <Field key={`mapzone_${obj.id}`}
                name="choice"
                selected={selected}
                component={GeoJSONLayer}
                style={{ zIndex, opacity }}
                props={{ obj, zIndex, opacity }} />
            );
          })}
      </Map>
    );
  }
}

LeafletMap.defaultProps = {
  zoom: 9,
  selected: null,
  lng: 6.244354248046875,
  lat: 43.22319117678928,
};

LeafletMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
  selected: PropTypes.string,
  zones: PropTypes.array.isRequired,
};

export default connect(({ selected }) => ({ selected }))(LeafletMap);
