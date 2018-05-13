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
    name: 'baselayer',
    zoom: { max: 0, min: 18 },
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGN&style=normal&format=image/jpeg',
  },
  {
    name: 'satlayer',
    zoom: { max: 0, min: 18 },
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS&style=normal&format=image/jpeg',
  },
  {
    name: 'zonelayer',
    zoom: { max: 13, min: 18 },
    layer: 'CADASTRALPARCELS.PARCELS&style=bdparcellaire&format=image/png',
  },
];
const attr =
  '&copy; <a href="https://www.geoportail.gouv.fr">IGN-F/Geoportail</a>';

const getzindex = index => 1000 + index;
const getopacity = zoom => (zoom <= 11 && '0.4') || '0.1';

class MapViewComponent extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.state = { zoom: props.zoom };
    this.onZoomEnd = this.onZoomEnd.bind(this);
  }

  componentDidUpdate () {
    if (!this.map) return;
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
    const {
      zones,
      center,
      usezoom,
      maxzoom,
      selected,
      showsatellite,
    } = this.props;
    const ordered = orderby(zones, ['order'], ['asc']);
    return (
      <Map center={center}
        maxZoom={maxzoom}
        zoomControl={usezoom}
        zoom={this.props.zoom}
        onZoomEnd={this.onZoomEnd}
        ref={(ref) => {
          this.map = ref;
        }}>
        {ignLayers
          .filter(({ name }) =>
            name !== 'satlayer' || (name === 'satlayer' && showsatellite))
          .filter(({ zoom }) => {
            const { max, min } = zoom;
            return max <= this.state.zoom && min >= this.state.zoom;
          })
          .map(({ layer, name }) => {
            const uri = `${ignBase}?${ignOptions.join('&')}&layer=${layer}`;
            return <TileLayer key={name} url={uri} attribution={attr} />;
          })}
        {ordered &&
          ordered.map((obj, index) => {
            const zIndex = getzindex(index);
            const opacity = getopacity(this.state.zoom);
            return (
              <Field key={`mapzone_${obj.zoneid}`}
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

MapViewComponent.defaultProps = {
  zoom: 9,
  maxzoom: 18,
  usezoom: false,
  selected: null,
  showsatellite: false,
};

MapViewComponent.propTypes = {
  zoom: PropTypes.number,
  usezoom: PropTypes.bool,
  maxzoom: PropTypes.number,
  selected: PropTypes.string,
  showsatellite: PropTypes.bool,
  zones: PropTypes.array.isRequired,
  // FIXME -> use shapeof
  center: PropTypes.object.isRequired,
};

export const MapView = connect(state => ({
  selected: state.selected,
}))(MapViewComponent);

export default MapView;
