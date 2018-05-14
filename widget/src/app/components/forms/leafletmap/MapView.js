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

const precisezoom = 13;
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
    zoom: { max: precisezoom, min: 18 },
    layer: 'CADASTRALPARCELS.PARCELS&style=bdparcellaire&format=image/png',
  },
];
const attr =
  '&copy; <a href="https://www.geoportail.gouv.fr">IGN-F/Geoportail</a>';

const getzindex = index => 1000 + index;
// const getopacity = zoom => (zoom <= precisezoom && '0.4') || '0.1';

class MapViewComponent extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.state = { zoom: props.zoom, selected: null };
    this.onLayerSelect = this.onLayerSelect.bind(this);
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

  onLayerSelect (zoneid) {
    this.setState({ selected: zoneid });
  }

  render () {
    const {
      zones,
      center,
      usezoom,
      maxzoom,
      showsatellite,
      showzonelayer,
    } = this.props;
    const { selected, zoom } = this.state;
    const showtooltip = zoom < precisezoom;
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
          .filter((obj) => {
            const { max, min } = obj.zoom;
            return max <= this.state.zoom && min >= this.state.zoom;
          })
          .map(({ layer, name }) => {
            const uri = `${ignBase}?${ignOptions.join('&')}&layer=${layer}`;
            return <TileLayer key={name} url={uri} attribution={attr} />;
          })}
        {ordered &&
          ordered.map((obj, index) => {
            const zIndex = getzindex(index);
            const opacity = showzonelayer ? 0.4 : 0;
            const props = {
              obj,
              zIndex,
              opacity,
              selected,
              showtooltip,
              onSelect: this.onLayerSelect,
            };
            return (
              <Field key={`mapzone_${obj.zoneid}`}
                name="choice"
                props={props}
                component={GeoJSONLayer}
                style={{ zIndex, opacity }} />
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
  showzonelayer: false,
  showsatellite: false,
};

MapViewComponent.propTypes = {
  zoom: PropTypes.number,
  usezoom: PropTypes.bool,
  maxzoom: PropTypes.number,
  showsatellite: PropTypes.bool,
  showzonelayer: PropTypes.bool,
  zones: PropTypes.array.isRequired,
  // FIXME -> use shapeof
  center: PropTypes.object.isRequired,
};

export const MapView = connect()(MapViewComponent);

export default MapView;
