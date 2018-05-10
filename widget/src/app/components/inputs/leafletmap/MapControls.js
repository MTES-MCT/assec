import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Geolocation from 'react-geolocation';

class MapControlsComponent extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onGeolocation = this.onGeolocation.bind(this);
    this.state = { showsatellite: false };
    this.toggleSatellite = this.toggleSatellite.bind(this);
  }

  onGeolocation (position) {
    const coords = (position && position.coords) || null;
    const lat = (coords && coords.latitude) || null;
    const lng = (coords && coords.longitude) || null;
    const center = (lat && lng && { lat, lng }) || null;
    this.props.onGeolocation(center);
  }

  toggleSatellite () {
    const update = !this.state.showsatellite;
    this.setState({ showsatellite: update });
    this.props.onToggleView(update);
  }

  render () {
    const { showsatellite } = this.state;
    return (
      <div className="leaflet-map-controls flex-columns">
        <button type="button" onClick={this.toggleSatellite}>
          <span>
            {showsatellite && <i className="icon icon-map" />}
            {!showsatellite && <i className="icon icon-camera" />}
          </span>
        </button>
        <Geolocation lazy
          enableHighAccuracy
          onSuccess={this.onGeolocation}
          render={({ /* error, */ fetchingPosition, getCurrentPosition }) => (
            <div>
              <button onClick={getCurrentPosition}>
                <span>
                  {/* {error && <div>{error.message}</div>} */}
                  {!fetchingPosition && <i className="icon icon-direction" />}
                  {fetchingPosition && (
                    <i className="icon icon-spin6 animate-spin" />
                  )}
                </span>
              </button>
              {/* {error && <div>{error.message}</div>}
              <pre>
                latitude: {latitude}
                longitude: {longitude}
              </pre> */}
            </div>
          )} />
      </div>
    );
  }
}

MapControlsComponent.propTypes = {
  onToggleView: PropTypes.func.isRequired,
  onGeolocation: PropTypes.func.isRequired,
};

export const MapControls = connect()(MapControlsComponent);

export default MapControls;
