import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

// application
import FormPopin from './../popins/FormPopin';
import MapView from './mapinput/MapView';
import MapControls from './mapinput/MapControls';

class MapInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.map = null;
    this.onToggleView = this.onToggleView.bind(this);
    this.onTogglePopin = this.onTogglePopin.bind(this);
    this.onUserPosition = this.onUserPosition.bind(this);
    this.state = {
      popin: false,
      showsatellite: false,
      showzonelayer: false,
      marker: props.formValue,
    };
  }

  onUserPosition (input) {
    return (point) => {
      const { marker } = this.state;
      const { zone } = this.props.map;
      const coords = (point && [point.lng, point.lat]) || null;
      const inside = coords && booleanPointInPolygon(coords, zone);
      if (marker && !point) {
        this.setState({ marker: null }, () => {
          input.onChange(null);
        });
      } else if (!inside) {
        // FIXME -> warn outside the zone
      } else {
        this.setState({ marker: point }, () => {
          input.onChange(point);
          this.onTogglePopin();
        });
      }
      // const zoomto = (inside && maxZoom - 2) || minZoom;
      // const mapzoom = this.map.leafletElement.getZoom();
      // const mapbounds = this.map.leafletElement.getBounds();
      // const shouldfly = mapbounds.contains(point) && mapzoom !== zoomto;
      // if (!shouldfly) return;
      // this.map.leafletElement.flyTo(moveto, zoomto, { duration: 1.5 });
      // });
    };
  }

  onToggleView ({ satellized, layered }) {
    this.setState({
      showzonelayer: layered,
      showsatellite: satellized,
    });
  }

  onTogglePopin () {
    this.setState(prev => ({ popin: !prev.popin }));
  }

  render () {
    const {
      popin, marker, showzonelayer, showsatellite,
    } = this.state;
    const {
      map, type, islast, zones,
    } = this.props;
    return (
      <div className="input-type-map relative">
        <div className="leaflet-map">
          <Field name={type}
            render={({ input }) => (
              <React.Fragment>
                <MapControls marker={marker}
                  onToggleView={this.onToggleView}
                  onGeolocation={this.onUserPosition(input)} />
                <MapView map={map}
                  layers={zones}
                  marker={marker}
                  showZone={showzonelayer}
                  showSatellite={showsatellite}
                  onClick={this.onUserPosition(input)} />
              </React.Fragment>
            )} />
        </div>
        {popin && <FormPopin islast={islast} />}
      </div>
    );
  }
}

MapInput.defaultProps = {
  formValue: null,
};

MapInput.propTypes = {
  // FIXME -> use shapeof
  formValue: PropTypes.object,
  map: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  zones: PropTypes.array.isRequired,
  islast: PropTypes.bool.isRequired,
};

export default MapInput;
