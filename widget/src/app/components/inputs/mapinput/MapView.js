import React from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';

// application
import MapZone from './MapZone';
import MapMarker from './MapMarker';

const precisezoom = 13;
const IGN_KEY = process.env.REACT_APP_IGN_KEY;
const IGN_BASE_URI = `https://wxs.ign.fr/${IGN_KEY}/geoportail/wmts`;
const IGN_OPTIONS = [
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
    order: 0,
    name: 'baselayer',
    zoom: { min: 0, max: 18 },
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGN&style=normal&format=image/jpeg',
    attr:
      '&copy; <a href="https://www.geoportail.gouv.fr">IGN-F/Geoportail</a>',
  },
  {
    order: 1,
    attr: null,
    name: 'satlayer',
    zoom: { min: 0, max: 18 },
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS&style=normal&format=image/jpeg',
  },
  {
    order: 2,
    attr: null,
    name: 'zonelayer',
    zoom: { min: precisezoom, max: 18 },
    layer: 'CADASTRALPARCELS.PARCELS&style=bdparcellaire&format=image/png',
  },
];

const getzindex = index => 1000 + index;

class MapView extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.state = { mapzoom: props.defaultZoom };
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.renderMapLayers = this.renderMapLayers.bind(this);
    this.renderRegionLayer = this.renderRegionLayer.bind(this);
  }

  componentDidUpdate () {
    if (!this.map) return;
    // eslint-disable-next-line no-underscore-dangle
    const layers = this.map.leafletElement._layers;
    // re-ordonne les layers des zones grâce à la propriete "order"
    Object.values(layers)
      .filter(layer =>
        layer.options.order && typeof layer.options.order !== 'undefined')
      .sort((a, b) => a.options.order - b.options.order)
      .forEach((layer) => {
        layer.bringToFront();
      });
  }

  onZoomEnd () {
    const { defaultZoom } = this.props;
    const zoom = (this.map && this.map.leafletElement.getZoom()) || defaultZoom;
    this.setState({ mapzoom: zoom });
  }

  renderRegionLayer () {
    const { zone } = this.props.map;
    if (!zone) return null;
    return <GeoJSON data={zone} className="geojson-layer department" />;
  }

  renderMapLayers () {
    const { showSatellite } = this.props;
    return ignLayers
      .filter(({ name }) =>
        name !== 'satlayer' || (name === 'satlayer' && showSatellite))
      .map(({
        layer, name, attr, order, zoom: { max, min },
      }) => {
        const uri = `${IGN_BASE_URI}?${IGN_OPTIONS.join('&')}&layer=${layer}`;
        return (
          <TileLayer url={uri}
            key={name}
            minZoom={min}
            maxZoom={max}
            zIndex={order}
            attribution={attr} />
        );
      });
  }

  render () {
    const {
      marker,
      layers,
      maxZoom,
      minZoom,
      useZoom,
      showZone,
      map: { maxbounds, center },
    } = this.props;
    const { mapzoom } = this.state;
    return (
      <Map animate={false}
        zoom={mapzoom}
        center={center}
        maxZoom={maxZoom}
        minZoom={minZoom}
        maxBounds={maxbounds}
        zoomControl={useZoom}
        onZoomEnd={this.onZoomEnd}
        onClick={({ latlng }) => this.props.onClick(latlng)}
        ref={(ref) => {
          this.map = ref;
        }}>
        {this.renderMapLayers()}
        {layers &&
          layers.map((obj, index) => {
            const zIndex = getzindex(index);
            const opacity = showZone ? 0.4 : 0;
            const showtooltip = mapzoom < precisezoom;
            return (
              <MapZone obj={obj}
                zIndex={zIndex}
                key={obj.zoneid}
                opacity={opacity}
                showtooltip={showtooltip}
                style={{ zIndex, opacity }} />
            );
          })}
        {this.renderRegionLayer()}
        {marker && (
          <MapMarker position={marker} onChange={this.props.onClick} />
        )}
      </Map>
    );
  }
}

MapView.defaultProps = {
  map: null,
  layers: [],
  minZoom: 8,
  maxZoom: 18,
  marker: null,
  useZoom: false,
  defaultZoom: 8,
};

MapView.propTypes = {
  map: PropTypes.object,
  marker: PropTypes.object,
  layers: PropTypes.array,
  useZoom: PropTypes.bool,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  defaultZoom: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  showZone: PropTypes.bool.isRequired,
  showSatellite: PropTypes.bool.isRequired,
};

export default MapView;
