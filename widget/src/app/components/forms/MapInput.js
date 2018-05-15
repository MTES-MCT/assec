/* eslint
  no-underscore-dangle: 0
  */
import React from 'react';
import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import { FormSection, Field } from 'redux-form';
import { Map, GeoJSON, Marker, TileLayer } from 'react-leaflet';
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

const markerIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon',
  html: `
  <div class="leaflet-marker-divicon-container">
    <div class="leaflet-marker-divicon-inner">
      <div class="leaflet-marker-divicon-pin"></div>
      <div class="leaflet-marker-divicon-pulse"></div>
    </div>
  </div>
  `,
});

const getzindex = index => 1000 + index;
// const getopacity = zoom => (zoom <= precisezoom && '0.4') || '0.1';

class MapInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onToggleView = this.onToggleView.bind(this);
    this.onLayerClick = this.onLayerClick.bind(this);
    this.onGeolocation = this.onGeolocation.bind(this);
    this.renderMapLayers = this.renderMapLayers.bind(this);
    this.setMapReference = this.setMapReference.bind(this);
    this.state = {
      marker: null,
      mapzoom: null,
      selected: null,
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
    const { minzoom, maxzoom, zone } = this.props;
    const coords = [point.lng, point.lat];
    // const coords = [43.39528702235596, 6.294845731267186];
    const inside = booleanPointInPolygon(coords, zone);
    const marker = (inside && point) || null;
    if (!marker) return;
    this.setState({ marker }, () => {
      const zoom = (inside && maxzoom - 2) || minzoom;
      this.map.leafletElement.flyTo(marker, zoom);
    });
  }

  onToggleView ({ showzonelayer, showsatellite }) {
    this.setState({ showzonelayer, showsatellite });
  }

  onLayerClick (zoneid, point) {
    this.setState({
      marker: point,
      selected: zoneid,
    });
  }

  onZoomEnd ({ target }) {
    this.setState({ mapzoom: target._zoom });
  }

  setMapReference (ref) {
    this.map = ref;
  }

  renderMapLayers () {
    const { showsatellite } = this.state;
    const zoom = this.state.mapzoom || this.props.zoom;
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
      zoom,
      zones,
      center,
      minzoom,
      maxzoom,
      usezoom,
      maxbounds,
    } = this.props;
    const {
      selected, mapzoom, marker, showzonelayer,
    } = this.state;
    return (
      <FormSection name={type} component="fieldset">
        <div className="input-type-map">
          <div id="leaflet-map" className="leaflet-map flex2">
            <MapControls onToggleView={this.onToggleView}
              onGeolocation={this.onGeolocation} />
            <Map animate={false}
              center={center}
              maxZoom={maxzoom}
              minZoom={minzoom}
              maxBounds={maxbounds}
              zoomControl={usezoom}
              zoom={mapzoom || zoom}
              onZoomEnd={this.onZoomEnd}
              ref={this.setMapReference}>
              {/* -------

                couches IGN

              ------- */}
              {this.renderMapLayers()}
              {/* -------

                zone globale du department

              ------- */}
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
                    onClick: this.onLayerClick,
                  };
                  return (
                    <Field key={`mapzone_${obj.zoneid}`}
                      name="choice"
                      props={props}
                      component={GeoJSONLayer}
                      style={{ zIndex, opacity }} />
                  );
                })}
              {/* -------

                point marker

              ------- */}
              {marker && (
                <Marker draggable icon={markerIcon} position={marker} />
              )}
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
