import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
// import Geolocation from 'react-geolocation';

export class MapControls extends React.PureComponent {
  constructor (props) {
    super(props);
    this.toggleSatellite = this.toggleSatellite.bind(this);
    this.toggleZoneLayer = this.toggleZoneLayer.bind(this);
    this.toggleGeoLocation = this.toggleGeoLocation.bind(this);
    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.state = {
      layered: false,
      hasmarker: false,
      geolocated: false,
      satellized: false,
    };
  }

  componentWillReceiveProps (next) {
    if (next.hasmarker !== this.props.hasmarker) {
      this.setState({ hasmarker: next.hasmarker });
    }
  }

  onGeolocationSuccess (position) {
    if (!position) return;
    const coords = (position && position.coords) || null;
    const lat = (coords && coords.latitude) || null;
    const lng = (coords && coords.longitude) || null;
    const center = (lat && lng && { lat, lng }) || null;
    this.setState({ geolocated: true, hasmarker: true }, () => {
      this.props.onGeolocation(center);
    });
  }

  toggleGeoLocation () {
    this.setState({ geolocated: false, hasmarker: true }, () => {
      this.props.onGeolocation(false);
    });
  }

  toggleSatellite () {
    const update = !this.state.satellized;
    this.setState({ satellized: update }, () => {
      this.props.onToggleView(this.state);
    });
  }

  toggleZoneLayer () {
    const update = !this.state.layered;
    this.setState({ layered: update }, () => {
      this.props.onToggleView(this.state);
    });
  }

  render () {
    const {
      satellized, layered, geolocated, hasmarker,
    } = this.state;
    const geoactive = geolocated || hasmarker;
    return (
      <div className="leaflet-map-controls flex-columns">
        <Tooltip arrow
          offset={-15}
          arrowSize="small"
          position="top-end"
          trigger="mouseenter"
          title={`${satellized ? 'Masquer' : 'Afficher'} la vue satellite`}>
          <button type="button"
            onClick={this.toggleSatellite}
            className={`${(satellized && 'active') || ''} mr7`}>
            <span>
              <i className="icon icon-camera" />
            </span>
          </button>
        </Tooltip>
        <Tooltip arrow
          offset={-15}
          arrowSize="small"
          position="top-end"
          trigger="mouseenter"
          title={`${layered ? 'Masquer' : 'Afficher'} les zones`}>
          <button type="button"
            onClick={this.toggleZoneLayer}
            className={`${(layered && 'active') || ''} mr7`}>
            <span>
              <i className="icon icon-marquee" />
            </span>
          </button>
        </Tooltip>
        {/* <Tooltip arrow
          offset={-15}
          arrowSize="small"
          position="top-end"
          trigger="mouseenter"
          title={geoactive ? 'Supprimer le marker' : 'Me géolocaliser'}>
          <Geolocation lazy
            enableHighAccuracy
            onSuccess={this.onGeolocationSuccess}
            render={({ error fetchingPosition, getCurrentPosition }) => (
              <button className={`${(geoactive && 'active') || ''}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  if (geoactive) this.toggleGeoLocation();
                  else getCurrentPosition();
                }}>
                <span>
                  {!fetchingPosition && <i className="icon icon-direction" />}
                  {fetchingPosition && (
                    <i className="icon icon-spin6 animate-spin" />
                  )}
                </span>
              </button>
            )} />
        </Tooltip> */}
      </div>
    );
  }
}

MapControls.propTypes = {
  hasmarker: PropTypes.bool.isRequired,
  onToggleView: PropTypes.func.isRequired,
  onGeolocation: PropTypes.func.isRequired,
};

export default MapControls;
