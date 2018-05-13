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
    const isselected = obj.zoneid === selected;
    console.log('obj', obj);
    input.onChange(obj.zoneid);
    dispatch({
      id: obj.id,
      type: 'onZoneSelected',
      zoneid: isselected ? null : obj.zoneid,
    });
  }

  render () {
    const {
      zIndex,
      opacity,
      selected,
      obj: { geojson, zoneid, shortname },
    } = this.props;
    const isselected = zoneid === selected;
    const geojsonprops = {
      data: JSON.parse(geojson),
      onClick: this.clickHandler,
    };
    return (
      <GeoJSON {...geojsonprops}
        order={zIndex}
        style={() => ({ fillOpacity: opacity })}
        key={`mapzone_${zoneid}${(isselected && '_active') || ''}`}
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
