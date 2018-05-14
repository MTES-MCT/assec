import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import Geolocation from 'react-geolocation';

export class MapControls extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onGeolocation = this.onGeolocation.bind(this);
    this.toggleSatellite = this.toggleSatellite.bind(this);
    this.toggleZoneLayer = this.toggleZoneLayer.bind(this);
    this.state = { showsatellite: false, showzonelayer: false };
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
    this.setState({ showsatellite: update }, () => {
      this.props.onToggleView(this.state);
    });
  }

  toggleZoneLayer () {
    const update = !this.state.showzonelayer;
    this.setState({ showzonelayer: update }, () => {
      this.props.onToggleView(this.state);
    });
  }

  render () {
    const { showsatellite, showzonelayer } = this.state;
    return (
      <div className="leaflet-map-controls flex-columns">
        <Tooltip arrow
          offset={-15}
          arrowSize="small"
          position="top-end"
          trigger="mouseenter"
          title="Afficher la vue satellite">
          <button type="button"
            onClick={this.toggleSatellite}
            className={`${(showsatellite && 'active') || ''} mr7`}>
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
          title="Afficher les zones">
          <button type="button"
            onClick={this.toggleZoneLayer}
            className={`${(showzonelayer && 'active') || ''} mr7`}>
            <span>
              <i className="icon icon-marquee" />
            </span>
          </button>
        </Tooltip>
        <Tooltip arrow
          offset={-15}
          arrowSize="small"
          position="top-end"
          trigger="mouseenter"
          title="Me géolocaliser">
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
        </Tooltip>
      </div>
    );
  }
}

MapControls.propTypes = {
  onToggleView: PropTypes.func.isRequired,
  onGeolocation: PropTypes.func.isRequired,
};

export default MapControls;
