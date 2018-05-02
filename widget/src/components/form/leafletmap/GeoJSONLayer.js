import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GeoJSON, Tooltip, Point } from 'react-leaflet';

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  render () {
    const {
      input,
      zIndex,
      selected,
      dispatch,
      obj: {
        geojson, id, label, alerte,
      },
    } = this.props;
    console.log('alerte', alerte);
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
        key={`mapzone_${id}${(isselected && '_active') || ''}`}
        className={`geojson-layer ${(isselected && 'active') || ''}`}>
        <Tooltip sticky offset={[8, -12]}>
          <span>
            <span>{label}</span>
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
};

export default connect()(GeoJSONLayerInput);
