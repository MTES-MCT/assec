import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

// application
import FormPopin from './../forms/FormPopin';
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
      marker: null,
      // mapzoom: null,
      // selected: null,
      showsatellite: false,
      showzonelayer: false,
      // marker: props.formValue,
    };
  }

  onUserPosition (input) {
    return (point) => {
      console.log('point', point);
      const { zone } = this.props.map;
      const coords = (point && [point.lng, point.lat]) || null;
      const inside = coords && booleanPointInPolygon(coords, zone);
      if (!point || !inside) {
        // -> FIXME indiquer une erreur a l'user lui indiquant
        // on ne fait pas de mise à jour
        // si le point n'est pas dans la zone du departement
        // affiche une erreur si l'user est en dehors
        // ou n'est pas geocalise dans la zone
      }
      this.setState({ marker: point }, () => {
        input.onChange(point);
      });
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
    console.log('marker', marker);
    const { map, type, zones } = this.props;
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
        {popin && (
          <FormPopin cancelHandler={() => {}} confirmHandler={() => {}} />
        )}
      </div>
    );
  }
}

MapInput.propTypes = {
  // formValue: PropTypes.array,
  // onForwardHandler: PropTypes.func.isRequired,
  // FIXME -> use shapeof
  map: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  zones: PropTypes.array.isRequired,
};

export default MapInput;
