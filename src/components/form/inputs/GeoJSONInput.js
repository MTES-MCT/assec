import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';

const hoverStyle = {
  weight: 1,
  opacity: 1.0,
  color: '#FF0066',
  fillOpacity: 0.2,
  fillColor: '#ACE539',
};

const defaultStyle = {
  weight: 1,
  opacity: 1.0,
  color: '#ACE539',
  fillOpacity: 0.2,
  fillColor: '#FF0066',
};

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  render () {
    const {
      id, geojson, input, selected,
    } = this.props;
    const isselected = id === selected;
    return (
      <GeoJSON key={`mapzone_${id}`}
        data={geojson}
        onClick={() => input.onChange(id)}
        style={() => (isselected ? hoverStyle : defaultStyle)} />
    );
  }
}

GeoJSONLayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  geojson: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
};

export default GeoJSONLayerInput;
