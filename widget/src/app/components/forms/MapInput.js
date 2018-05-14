/* eslint
  no-underscore-dangle: 0
  */
import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, Field } from 'redux-form';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

// application
import { MapControls, GeoJSONLayer } from './leafletmap';

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

class MapInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onToggleView = this.onToggleView.bind(this);
    this.onGeolocation = this.onGeolocation.bind(this);
    this.onLayerSelect = this.onLayerSelect.bind(this);
    this.setMapReference = this.setMapReference.bind(this);
    this.state = {
      selected: null,
      // geocenter: null,
      zoom: props.zoom,
      showsatellite: false,
      showzonelayer: false,
    };
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

  onGeolocation (point) {
    const { center, zone } = this.props;
    const inside = booleanPointInPolygon(point, zone);
    console.log('your are geolocated in current zone', inside);
    this.setState({ geocenter: inside ? point : center });
  }

  onToggleView (state) {
    this.setState(state);
  }

  onZoomEnd ({ target }) {
    this.setState({ zoom: target._zoom });
  }

  onLayerSelect (zoneid) {
    this.setState({ selected: zoneid });
  }

  setMapReference (ref) {
    this.map = ref;
  }

  renderMapLayers () {
    const { zoom, showsatellite } = this.state;
    return ignLayers
      .filter(({ name }) =>
        name !== 'satlayer' || (name === 'satlayer' && showsatellite))
      .filter((obj) => {
        const { max, min } = obj.zoom;
        return max <= zoom && min >= zoom;
      })
      .map(({ layer, name }) => {
        const uri = `${ignBase}?${ignOptions.join('&')}&layer=${layer}`;
        return <TileLayer key={name} url={uri} attribution={attr} />;
      });
  }

  render () {
    const {
      type,
      zone,
      zones,
      center,
      minzoom,
      maxzoom,
      usezoom,
      maxbounds,
    } = this.props;
    const {
      zoom, selected, geocenter, showzonelayer,
    } = this.state;
    return (
      <FormSection name={type} component="fieldset">
        <div className="input-type-map">
          <div id="leaflet-map" className="leaflet-map flex2">
            <MapControls onToggleView={this.onToggleView}
              onGeolocation={this.onGeolocation} />
            <Map center={geocenter || center}
              maxZoom={maxzoom}
              minZoom={minzoom}
              maxBounds={maxbounds}
              zoomControl={usezoom}
              zoom={this.props.zoom}
              ref={this.setMapReference}
              onZoomEnd={this.onZoomEnd}>
              {this.renderMapLayers()}
              {zone && (
                <GeoJSON data={zone} className="geojson-layer department" />
              )}
              {/* -------

                render des zones du department comme inputs de form

              ------- */}
              {zones &&
                zones.map((obj, index) => {
                  const zIndex = getzindex(index);
                  const opacity = showzonelayer ? 0.4 : 0;
                  const showtooltip = zoom < precisezoom;
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
          </div>
        </div>
      </FormSection>
    );
  }
}
MapInput.defaultProps = {
  zoom: 8,
  minzoom: 8,
  maxzoom: 18,
  usezoom: false,
};

MapInput.propTypes = {
  // FIXME -> use shapeof
  zoom: PropTypes.number,
  usezoom: PropTypes.bool,
  minzoom: PropTypes.number,
  maxzoom: PropTypes.number,
  zone: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  zones: PropTypes.array.isRequired,
  center: PropTypes.array.isRequired,
  maxbounds: PropTypes.array.isRequired,
};

export default MapInput;
