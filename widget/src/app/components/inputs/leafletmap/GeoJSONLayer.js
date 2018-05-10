import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GeoJSON, Tooltip } from 'react-leaflet';

// eslint
class GeoJSONLayerInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler () {
    const {
      input, dispatch, selected, obj,
    } = this.props;
    const isselected = obj.id === selected;
    input.onChange(obj.id);
    dispatch({
      type: 'onAreaSelected',
      id: isselected ? null : obj.id,
    });
  }

  render () {
    const {
      zIndex,
      opacity,
      selected,
      obj: { geojson, id, shortname },
    } = this.props;
    const isselected = id === selected;
    const geojsonprops = {
      data: geojson,
      onClick: this.clickHandler,
    };
    return (
      <GeoJSON {...geojsonprops}
        order={zIndex}
        style={() => ({ fillOpacity: opacity })}
        key={`mapzone_${id}${(isselected && '_active') || ''}`}
        className={`geojson-layer ${(isselected && 'active') || ''}`}>
        <Tooltip sticky direction="right" offset={[7, 0]}>
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
