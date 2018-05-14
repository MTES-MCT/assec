import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

// application
import { MapControls, MapView } from './leafletmap';

class MapInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onToggleView = this.onToggleView.bind(this);
    this.onGeolocation = this.onGeolocation.bind(this);
    this.state = {
      geocenter: null,
      showsatellite: false,
      showzonelayer: false,
    };
  }

  onToggleView (state) {
    this.setState(state);
  }

  onGeolocation (center) {
    this.setState({ geocenter: center });
  }

  render () {
    const { name, values, center } = this.props;
    const { showsatellite, showzonelayer, geocenter } = this.state;
    return (
      <FormSection name={name} component="fieldset">
        <div className="input-type-map">
          <div id="leaflet-map" className="leaflet-map flex2">
            <MapControls onToggleView={this.onToggleView}
              onGeolocation={this.onGeolocation} />
            <MapView zones={values}
              center={geocenter || center}
              showzonelayer={showzonelayer}
              showsatellite={showsatellite} />
          </div>
        </div>
      </FormSection>
    );
  }
}
MapInput.defaultProps = {
  center: {
    lat: 43.22319117678928,
    lng: 6.244354248046875,
  },
};

MapInput.propTypes = {
  // FIXME -> use shapeof
  center: PropTypes.object,
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default MapInput;
