import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';

// eslint
const LayerInput = ({ id, geojson, input }) => (
  <GeoJSON key={`mapzone_${id}`}
    data={geojson}
    onClick={() => input.onChange(id)} />
);

LayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  geojson: PropTypes.object.isRequired,
};

export default LayerInput;
