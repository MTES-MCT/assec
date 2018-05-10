import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GeoJSON, Tooltip } from 'react-leaflet';

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  render () {
    const {
      input,
      zIndex,
      opacity,
      selected,
      dispatch,
      obj: { geojson, id, shortname },
    } = this.props;
    const isselected = id === selected;
    const commons = {
      data: geojson,
      onClick: () => {
        input.onChange(id);
        dispatch({
          type: 'onAreaSelected',
          id: isselected ? null : id,
        });
      },
    };
    return (
      <GeoJSON {...commons}
        order={zIndex}
        style={() => ({ fillOpacity: opacity })}
        key={`mapzone_${id}${(isselected && '_active') || ''}`}
        className={`geojson-layer ${(isselected && 'active') || ''}`}>
        <Tooltip sticky direction="center" offset={[0, 0]}>
          <span>
            <span>{shortname}</span>
          </span>
        </Tooltip>
      </GeoJSON>
    );
  }
}

GeoJSONLayerInput.defaultProps = {
  selected: null,
};

GeoJSONLayerInput.propTypes = {
  selected: PropTypes.string,
  obj: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  zIndex: PropTypes.number.isRequired,
  opacity: PropTypes.string.isRequired,
};

export default connect()(GeoJSONLayerInput);
