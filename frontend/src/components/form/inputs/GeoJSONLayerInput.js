import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';

const defaultStyle = {};
const activeStyle = {
  width: 1,
  color: '#61AFEF',
  fillColor: '#61AFEF',
};

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  render () {
    const {
      id, geojson, input, selected, dispatch,
    } = this.props;
    const isselected = id === selected;
    return (
      <GeoJSON key={`mapzone_${id}`}
        data={geojson}
        className="geojson-layer"
        style={() => (!isselected ? defaultStyle : activeStyle)}
        onClick={() => {
          input.onChange(id);
          dispatch({
            type: 'onAreaSelected',
            id: isselected ? null : id,
          });
        }} />
    );
  }
}

GeoJSONLayerInput.defaultProps = {
  selected: null,
};

GeoJSONLayerInput.propTypes = {
  selected: PropTypes.string,
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  geojson: PropTypes.object.isRequired,
};

export default connect()(GeoJSONLayerInput);
